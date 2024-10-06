import { useEffect, useState } from 'react';
import { PBContext, usePocketBase } from '../contexts/PocketBase';

import TabGroup from '../junokit/TabGroup';
import ProductCard from '../junokit/ProductCard';
import Pagination from '../junokit/Pagination';
import { Loader } from '../junokit';
import { ClientResponseError } from 'pocketbase';
import { useNavigate } from 'react-router-dom';
import { formatTimeAgo, getStatus } from './Utils/helpers';

export default function MyListingsPage() {
    const { pb } = usePocketBase() as PBContext;
    const [listings, setListings] = useState([]); // Store all listings
    const tabs = [
        { label: "Active", value: "active" },
        { label: "Drafts", value: "draft" },
        { label: "Delisted", value: "delisted" },
        { label: "Expired", value: "expired" },
    ];
    const [selectedTab, setSelectedTab] = useState(tabs[0].value); // Default to active tab

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userId = pb.authStore.model.id; // Get the current user's ID

    // Fetch listings posted by the current user
    async function fetchListings() {
        setLoading(true);
        setError(null);

        try {
            // Fetch listings where `posted_by` equals `userId`
            const response = await pb.collection('listings').getFullList({
                filter: `posted_by="${userId}"`,
                sort: '-created',
            });

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

    
    // Filter listings based on the selected tab (active/draft/inactive)
    const filteredListings = listings.filter((listing) => {
        const status = getStatus(listing);
        return selectedTab === 'active' ? status === 'active' :
            selectedTab === 'draft' ? status === 'draft' :
            selectedTab === 'delisted' ? status === 'delisted' :
            selectedTab === 'expired' ? status === 'expired' : false;
    });
    const navigate = useNavigate();
    // Fetch listings when the component mounts
    useEffect(() => {
        fetchListings();
    }, []); // Empty dependency array, fetch only once when the component mounts

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
                My Posts
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
                        {filteredListings.map(listing => (
                            <ProductCard
                                key={listing.id}
                                title={listing.title}
                                price={`$${listing.price}`}
                                isFavorite={false} // No favorite toggle for MyListings
                                descriptionFirstLine={formatTimeAgo(listing.created)}
                                imageSrc={listing.images && listing.images.length > 0
                                    ? `https://hupost.pockethost.io/api/files/listings/${listing.id}/${listing.images[0]}`
                                    : null
                                }
                                corners="md"
                                onClick={() => navigate(`/listing/${listing.id}`)}
                                onFavorite={null} // No favorite handler for MyListings
                            />
                        ))}
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
        draft: "Draft",
        inactive: "Inactive",
    };
    return (
        <div className="flex flex-col w-full items-center justify-start h-auto py-12 gap-3 bg-base-50 rounded-xl">
            ¯\_(ツ)_/¯
            <h1 className="text-2xl font-semibold">
                Nothing here
            </h1>
            <p>No {tabMap[currentTab]?.toLowerCase()} listings found.</p>
        </div>
    );
}