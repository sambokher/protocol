import { useEffect, useState } from 'react';
import { PBContext, usePocketBase } from '../contexts/PocketBase';

import Search from '../junokit/Search';
import TabGroup from '../junokit/TabGroup';
import Select from '../junokit/Select';
import ProductCard from '../junokit/ProductCard';
import Pagination from '../junokit/Pagination';
import { Icon } from '../junokit';
import { ClientResponseError } from 'pocketbase';


export default function DiscoverPage() {
    const { pb } = usePocketBase() as PBContext;
    const [listings, setListings] = useState([]);
    const tabs = [
        { label: "For Sale", value: "for_sale" },
        { label: "Housing", value: "housing" },
        { label: "Jobs", value: "jobs" }
    ];
    const [selectedTab, setSelectedTab] = useState(tabs[0].value);

    const schools = [
        { label: "All Schools", value: "all_schools" },
        { label: "Harvard College", value: "harvard_college" },
        { label: "HBS", value: "harvard_business_school" },
        { label: "HLS", value: "harvard_law_school" },
        { label: "HMS", value: "harvard_medical_school" },
        { label: "SEAS", value: "harvard_engineering_school" }
    ];
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
            // Fetch all listings from the 'listings' collection
            const response = await pb.collection('listings').getList(1, 36, {
                sort: 'created',
            });
            setListings(response.items);
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

    
    const filteredListings = listings // .filter(listing => listing.category === selectedTab);
    console.log(filteredListings);

    return (
        <>
                <Search width="full" bgColor="base-0" hasOutline />
                <div className="flex flex-row flex-nowrap w-full max-w-full self-auto gap-3 items-end justify-start h-auto">
                    <TabGroup 
                        style='buttons'
                        tabs={tabs} 
                        value={selectedTab}
                        selectColor="accent" 
                        onChange={setSelectedTab}
                    />
                    {<Select 
                        width="auto" 
                        placeholder="All Schools" 
                        size="medium"
                        value={selectedSchool}
                        onChange={setSelectedSchool}
                        options={schools} 
                    />}
                </div>
                
                {filteredListings.length === 0 ? 
                <EmptyMessage currentTab={selectedTab} /> :
                <>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full'>
                    {filteredListings.map(listing => (
                        <ProductCard 
                            key={listing.id} 
                            title={listing.title} 
                            price={`$${listing.price}`} 
                            descriptionFirstLine={`Posted ${new Date(listing.created_at).toLocaleString()}`} 
                            imageSrc={listing.imageSrc} 
                            corners="sm" 
                        />
                    ))}
                </div>
                {filteredListings.length > 36 && <Pagination type="standard" />}
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
                Nothing posted in {currentTab}
            </h1>
            <p className="whitespace-pre-wrap false    false font-undefined text-left undefined undefined">
                Couldn't find anytning
            </p>
        </div>
    );
}