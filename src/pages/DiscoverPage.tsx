import { useEffect, useState } from 'react';
import { PBContext, usePocketBase } from '../contexts/PocketBase';

import Search from '../junokit/Search';
import TabGroup from '../junokit/TabGroup';
import Select from '../junokit/Select';
import ProductCard from '../junokit/ProductCard';
import Pagination from '../junokit/Pagination';
import { Button, ButtonIcon, Icon, Loader } from '../junokit';
import { ClientResponseError } from 'pocketbase';
import PriceRange from '../junokit/PriceRange';
import { categories, formatTimeAgo, schools } from './Utils/helpers';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';


export default function DiscoverPage() {
    const { pb } = usePocketBase() as PBContext;
    const [listings, setListings] = useState([]);
    const tabs = categories
    const [selectedTab, setSelectedTab] = useState(tabs[0].value);

    const [selectedSchool, setSelectedSchool] = useState(schools[0].value);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRecentListings();
    }, []); 

    // Function to fetch recent listings
    async function getRecentListings() {
        setLoading(true);  // Show loading indicator
        setError(null);    // Reset errors before new fetch
        try {

            const activeFilter = `
                published != null && 
                deactivated = null
            `;
            // DATE(published) + INTERVAL exp_days DAY > "${currentDate}"

            // Fetch all listings from the 'listings' collection
            const response = await pb.collection('listings').getFullList({
                filter: activeFilter,
                sort: '-published',
            });
            

            const filterByExpireDate = response.filter(listing => {
                const exp_days = listing.exp_days || 0;
                const publishedDate = new Date(listing.published);
                const expirationDate = new Date(publishedDate.getTime() + (1 + exp_days) * 24 * 60 * 60 * 1000);
                return expirationDate > new Date();
            });

            setListings(filterByExpireDate);
        } catch (error) {
            if (error instanceof ClientResponseError) {
                console.error("Error fetching listings:", error);
                setError("Failed to fetch listings. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);  // Stop loading after request completes
        }
    }
    
    const userId = pb.authStore.model.id;
    const [favorites, setFavorites] = useState([]);
    async function fetchFavorites() {
        try {
            // Fetch the current user's favorite listings
            const user = await pb.collection('users').getOne(userId);
            setFavorites(user.favorite_listings);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    }

    useEffect(() => {
        fetchFavorites();
    }, []);

    async function toggleFavorites(listingId) {
        let updatedFavorites;

        if (favorites.includes(listingId)) {
            // If the listing is already in the favorites, remove it
            updatedFavorites = favorites.filter(id => id !== listingId);
        } else {
            // If the listing is not in the favorites, add it
            updatedFavorites = [...favorites, listingId];
        }
        
        try {
            // Update the favorite listings in the database
            console.log('updatedFavorites', updatedFavorites);
            await pb.collection('users').update(userId, { favorite_listings: updatedFavorites });

            // Manually update the local authStore.model to reflect the changes
            pb.authStore.model.favorite_listings = updatedFavorites;

            // Update the local state to trigger a re-render
            setFavorites(updatedFavorites);

        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    }

    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const fuseOptions = {
        keys: ['title', 'description'],
        includeScore: true,
        threshold: 0.2
    };
    
    useEffect(() => {
        if (searchQuery === '') {
            setSearchResults([]);  // Reset search results if query is empty
        } else if (listings.length > 0) { // Ensure listings is not empty
            // Clean listings data, only include listings with valid title
            const validListings = listings.filter(listing => listing.title && typeof listing.title === 'string');

            const fuse = new Fuse(validListings, fuseOptions);  // Use cleaned data
            const results = fuse.search(searchQuery).map(result => result.item);
            setSearchResults(results);  // Update search results with Fuse results
        }
    }, [searchQuery, listings]);

    let filteredListings = listings
        .filter(listing => listing.category === selectedTab)
        .filter(listing => selectedSchool === 'all' || listing.school === selectedSchool)
        .filter(listing => {
            const price = parseFloat(listing.price);
            const { min, max } = priceRange;

            // Return true if price falls within the range (if min and/or max are defined)
            return (!min || price >= parseFloat(min)) && (!max || price <= parseFloat(max));
        });

    // If search query exists, filter listings based on search results
    if (searchQuery) {
        filteredListings = filteredListings.filter(listing => searchResults.includes(listing));
    }

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 18;
    const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

    const showPages = filteredListings.slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage) || []
    
    const navigate = useNavigate();
    
    const isMobile = window.innerWidth < 768;



    const [showFilters, setShowFilters] = useState(false);

    if (loading) {
        return (
        <div className='w-full h-full flex items-center justify-center'>
        <Loader size='28px' 
        />
        </div>
        )
    }

    
    return (
        <>
                
                <h1 className='text-3xl font-semibold -mb-4'>
                    Active Posts
                </h1>
                <div className="flex flex-row flex-nowrap w-full max-w-full self-auto gap-3 items-end justify-start h-auto">
                    <TabGroup 
                        style='default'
                        tabs={tabs} 
                        size='large'
                        value={selectedTab}
                        selectColor="primary" 
                        onChange={setSelectedTab}
                    />
                    
                </div>
                <div className='flex flex-row w-full gap-2'>
                <Search 
                    width="full" 
                    bgColor="base-0" 
                    hasOutline 
                    value={searchQuery}
                    onChange={e=>setSearchQuery(e.target.value)}
                    
                />
                <div className='flex md:hidden'>
                <ButtonIcon 
                    icon='filter'
                    size='medium'
                    onClick={() => setShowFilters(!showFilters)}
                    />

                </div>
                </div>

                <div className={`flex flex-col-reverse md:flex-row w-full max-w-full self-auto gap-3 -mt-2 mb-2 
                
                md:items-end justify-between h-auto`}>
                <span className='text-sm text-base-500'>
                    {searchQuery ? `${filteredListings.length} results`
                    :
                    `${filteredListings.length} active listings`}
                </span>
                <div className={`flex-grow-0 flex flex-row items-end gap-3
                ${showFilters ? 'flex' : 'hidden md:flex'}
                `}>
                    <PriceRange 
                    priceRange={priceRange} setPriceRange={setPriceRange} />
                    {<Select 
                        width={isMobile ? 'full' : 'auto'}
                        placeholder="All Schools" 
                        size={isMobile ? 'medium' : 'small'}
                        value={selectedSchool}
                        onChange={setSelectedSchool}
                        options={schools} 
                    />}</div>
                    </div>
                {showPages.length === 0 ? 
                <EmptyMessage currentTab={selectedTab} /> :
                <>
                <div className='grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 h-full'>
                    {showPages.map(listing => {
                        const isMyListing = listing.posted_by === userId;
                        return (
                        <ProductCard 
                            key={listing.id} 
                            title={listing.title} 
                            price={`$${listing.price}`} 
                            isFavorite={favorites?.includes(listing.id)}
                            descriptionFirstLine={formatTimeAgo(listing.published)}
                            imageSrc={listing.images && listing.images.length > 0 
                                ? `https://hupost.pockethost.io/api/files/listings/${listing.id}/${listing.images[0]}` 
                                : null
                            }
                            corners="md" 
                            tag={isMyListing ? 'your listing' : null}
                            onFavorite={isMyListing ? null : () => toggleFavorites(listing.id)}
                            onClick={() => navigate(`/listing/${listing.id}`)}
                        />)}
                    )}
                </div>
                {totalPages > 1 && 
                <Pagination 
                    type="mini" 
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onChange={setCurrentPage}
                
                    
                />}
            </>
            }
        </>
    );
}


function EmptyMessage({ currentTab }) {
    
    return (
        <div className="flex flex-col flex-nowrap w-full self-auto text-base-content  bg-base-50  gap-3  px-6 py-12 rounded-xl items-center justify-start h-auto   undefined undefined">
            ¯\_(ツ)_/¯
            <h1 className="text-ellipsis text-2xl     font-semibold text-left  undefined undefined" style={{ whiteSpace: 'pre-wrap' }}>
                No results in {categories.find(cat => cat.value === currentTab)?.label}
            </h1>
            <p className="whitespace-pre-wrap false    false font-undefined text-left undefined undefined">
                Couldn't find anytning
            </p>
        </div>
    );
}

