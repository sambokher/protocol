import { useEffect, useState } from 'react';
import { PBContext, usePocketBase } from '../contexts/PocketBase';

import TabGroup from '../junokit/TabGroup';
import ProductCard from '../junokit/ProductCard';
import Pagination from '../junokit/Pagination';
import { Loader } from '../junokit';
import { ClientResponseError } from 'pocketbase';
import { formatTimeAgo, getStatus } from './Utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function FavoritesPage() {
    const { pb } = usePocketBase() as PBContext;
    const [listings, setListings] = useState([]); // Store all listings here
    const tabs = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0].value); // Default to active tab

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = pb.authStore.model.id;
    const [favorites, setFavorites] = useState([]);

    // Fetch user's favorite listings
    async function fetchFavorites() {
        setLoading(true);
        try {
            const user = await pb.collection('users').getOne(userId);
            setFavorites(user.favorite_listings || []);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
        setLoading(false);
    }

    // Fetch listings based on favorite listings only once
    async function fetchListings() {
        setLoading(true);
        setError(null);

        if (favorites.length === 0) {
            setListings([]); // No favorites, clear listings
            setLoading(false);
            return;
        }

        try {
            // Fetch listings that match the favorite IDs
            // console.log("Fetching listings with favorites:", favorites);
            const response = await pb.collection('listings').getFullList({
                filter: favorites.map((id) => `id="${id}"`).join("||"),
                sort: '-created',
            });
            console.log("Fetched listings:", response);
            // console.log("Fetched listings:", response);
            setListings(response || []); // Store all fetched listings
        } catch (error) {
            if (error instanceof ClientResponseError) {
                console.error("Error fetching listings:", error);
                setError("Failed to fetch listings. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    const filteredListings = listings.filter((listing) => {
        const status = getStatus(listing);
        return selectedTab === 'active' ? status === 'active' : status !== 'active';
    });

    // Fetch both favorites and listings when the component mounts
    useEffect(() => {
        fetchFavorites();
    }, []);

    // Re-fetch listings when favorites are loaded
    useEffect(() => {
        if (favorites.length > 0) {
            fetchListings();
        }
    }, [favorites]);

    const navigate = useNavigate();
    // Toggle favorite status
    async function toggleFavorites(listingId) {
        let updatedFavorites;

        if (favorites.includes(listingId)) {
            updatedFavorites = favorites.filter(id => id !== listingId);
        } else {
            updatedFavorites = [...favorites, listingId];
        }

        try {
            await pb.collection('users').update(userId, { favorite_listings: updatedFavorites });
            pb.authStore.model.favorite_listings = updatedFavorites;
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    }

    if (loading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <Loader size='28px' />
            </div>
        );
    }

    return (
        <>
                <h1 className='text-3xl font-semibold -mb-4'>
                    Favorites
                </h1>
            <div className="flex flex-row flex-nowrap w-full max-w-full self-auto gap-3 items-end justify-start h-auto">
                <TabGroup
                    
                    tabs={tabs}
                    size='large'
                    value={selectedTab}
                    selectColor="primary"
                    onChange={setSelectedTab}
                />
            </div>
            {filteredListings.length === 0 ? (
                <EmptyMessage currentTab={selectedTab} />
            ) : (
                <>
                    <div className='grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 h-full'>
                        {filteredListings.map(listing => {
                            const isMyListing = listing.posted_by === userId;
                            return (
                            <ProductCard
                                key={listing.id}
                                title={listing.title}
                                price={`$${listing.price}`}
                                isFavorite={favorites.includes(listing.id)}
                                tag={isMyListing ? "Your Listing" : null}
                                descriptionFirstLine={formatTimeAgo(listing.created)}
                                imageSrc={listing.images && listing.images.length > 0
                                    ? `https://hupost.pockethost.io/api/files/listings/${listing.id}/${listing.images[0]}`
                                    : null
                                }
                                corners="md"
                                onFavorite={isMyListing ? null : () => toggleFavorites(listing.id)}
                                onClick={() => navigate(`/listing/${listing.id}`)}
                            />
                            )
                        })}
                    </div>
                    {filteredListings.length > 24 && <Pagination type="standard" />}
                </>
            )}
        </>
    );
}

// Empty message component for when no listings are found
function EmptyMessage({ currentTab }) {
    const tabMap = {
        active: "Active",
        inactive: "Inactive",
    };
    return (
        <div className="flex flex-col w-full items-center justify-start h-auto py-12 gap-3 bg-base-50 rounded-xl">
            ¯\_(ツ)_/¯
            <h1 className="text-2xl font-semibold">
                Nothing here
            </h1>
            <p>No {tabMap[currentTab]?.toLowerCase()} favorite listings.</p>
        </div>
    );
}