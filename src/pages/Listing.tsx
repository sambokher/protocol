import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, ButtonIcon, Icon, TextArea } from "../junokit";
import { categories, formatTimeAgo, getStatus } from "./Utils/helpers";
import Status from "../junokit/Status";
import { PBContext, usePocketBase } from "../contexts/PocketBase";
import { MapPin, MediaImage, Pin } from "iconoir-react";
import { schools } from "./Utils/helpers";
import Dot from "../junokit/Dot";
import Modal from "../junokit/Modal";
import ReactDOM from 'react-dom';

export default function Listing({editing=false}) {


    const navigate = useNavigate();
    const location = useLocation();
    const listingId = useParams().id;
    const [ listing, setListing ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(editing);
    const { pb } = usePocketBase() as PBContext;

    useEffect(() => {
        async function getDocument() {
            const result = await window.pb.collection('listings').getOne(listingId);
            setListing(result);
        }
        getDocument();
    }, [listingId]);

    useEffect(() => {
        // Change the URL without reloading the page
        if (isEditing) {
          if (!location.pathname.endsWith('/edit')) {
            navigate(`${location.pathname}/edit`, { replace: true });
          }
        } else {
          if (location.pathname.endsWith('/edit')) {
            navigate(location.pathname.replace('/edit', ''), { replace: true });
          }
        }
      }, [isEditing, navigate, location.pathname]);

    const images = listing?.images.map(im => `https://hupost.pockethost.io/api/files/listings/${listing?.id}/${im}`)

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

    const isMyListing = listing?.posted_by === userId
    const [loading, setLoading] = useState(false);
    async function toggleFavorites(listingId) {
        let updatedFavorites;
        setLoading(true);

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
            setLoading(false);
        } catch (error) {
            console.error('Error updating favorites:', error);
            setLoading(false);
        }
    }

    const isFavorite = favorites.includes(listingId);

    const [contactModal, setContactModal] = useState(false);
    const isDraft = !listing?.published
    const status = getStatus(listing)

    const isMobile = window.innerWidth < 768;
    const expirationDate = isDraft 
      ? '' 
      : new Date(new Date(listing?.published).setDate(new Date(listing?.published).getDate() + listing?.exp_days + 1))
          .toISOString()
          .split('T')[0];
        
    const isExpired = expirationDate && expirationDate < new Date().toISOString();

    if (listing) return (
        <>
         {contactModal && ReactDOM.createPortal(
            <ContactModal setContactModal={setContactModal} listingId={listingId} title={listing.title} price={listing.price} />,
                document.getElementById('portal-root') // Render inside the portal-root element
            )}
        <div className="flex flex-col w-full self-auto gap-5 items-stretch justify-start h-auto mx-auto">
            <div className="flex flex-col-reverse md:flex-row flex-nowrap w-full self-auto     gap-3   items-stretch justify-start h-auto    ">
                <div className="flex flex-col w-full flex-nowrap self-auto     gap-3   items-start justify-start h-auto    ">
                    {/*<div className='flex gap-2 text-xs items-center'>
                        <a className="hover:underline transition-all duration-75 cursor-pointer" onClick={() => navigate('/')}>Home </a>
                        <Icon icon="chevron-right" size="12px" />
                        <a className="hover:underline transition-all duration-75 cursor-pointer" onClick={() => navigate('/')}>{categories.find(cat => cat.value === listing?.category)?.label}</a>
                    </div>*/}
                    <div className="w-full mt-2 flex-grow">
                        <h1 className="inline text-2xl md:text-3xl font-semibold text-left" style={{ whiteSpace: 'pre-wrap' }}>
                            {listing?.title}{' '}
                            <span className="inline-block align-center" style={{ verticalAlign: 'top' }}>
                            <Status
                                size="small"
                                text={status}
                                color={status === 'active' ? 'success' : status === 'inactive' ? 'warning' : 'base-700'}
                                style="subtle"
                                isPill
                            />
                            </span>
                        </h1>
                        </div>
                </div>
                <div className='hidden md:flex'>
                <Controls 
                listing={listing}
                listingId={listingId}
                userId={userId}
                isDraft={isDraft}
                isExpired={isExpired}
                isFavorite={isFavorite}
                loading={loading}
                toggleFavorites={toggleFavorites}
                status={status}
                setContactModal={setContactModal}
                isMobile={isMobile}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                />
                </div>
            </div>


            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8  h-full items-stretch">



                {/* Details */}
                <div className="flex flex-col flex-grow flex-nowrap w-full md:w-2/5 self-auto text-base-content  gap-5  rounded-base items-start justify-start h-auto    ">
                    <div className="flex flex-row flex-nowrap w-full self-auto     gap-3   items-center justify-start h-auto    ">
                        <span className="inline-flex items-center gap-2 text-base-500 text-sm text-left font-medium " style={{ whiteSpace: 'nowrap' }}>
                        <MapPin width={16}/>
                        {schools.find(s => s.value === listing?.school)?.label || 'All Schools'}
                        </span>
                        {!isDraft &&
                        <>
                        <Dot size="6px" />
                        <span className="inline-flex  text-base-500 text-sm text-left  " style={{ whiteSpace: 'pre-wrap' }}>
                        posted {formatTimeAgo(listing?.published)}
                        </span></>}
                        
                        {isExpired &&
                        <>
                        <Dot size="6px" />
                        <span className="inline-flex  text-base-500 text-sm text-left  " style={{ whiteSpace: 'pre-wrap' }}>
                        expired {formatTimeAgo(expirationDate)}
                        </span>
                        </>
                        
                        }
                        </div>

                    <h1 className="text-ellipsis text-xl my-1 font-semibold text-left   " style={{ whiteSpace: 'pre-wrap' }}>
                        {listing?.price && listing?.price > 0 ? `$${listing?.price}` : 'Free'}
                    </h1>

                        <p className="whitespace-pre-wrap text-left min-h-40 flex-grow">
                        {listing?.description}
                        </p>


                    </div>

                {/* Images */}
                <ImageCarousel images={images} />

            </div>


            <div className="md:hidden fixed bottom-0 left-0 w-full flex flex-row bg-base-0 border-t border-base-200 flex-nowrap w-auto self-auto gap-3 items-end justify-end h-auto p-4">
            <Controls 
                listing={listing}
                listingId={listingId}
                userId={userId}
                isDraft={isDraft}
                isExpired={isExpired}
                isFavorite={isFavorite}
                loading={loading}
                toggleFavorites={toggleFavorites}
                status={status}
                setContactModal={setContactModal}
                isMobile={isMobile}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                />
            </div>
            </div>

        </>
    );
}


function ImageCarousel({images}) {
    // need empty state

    const [ selectedImage, setSelectedImage ] = useState(images[0]);
    return (
        <div className="flex flex-col w-full md:w-3/5 self-auto text-base-content  bg-base-0  gap-4  rounded-base items-start justify-start h-auto    
        
        ">
                {images.length ?
                <>
                <div
                className="h-[200px] md:h-[360px] "
                    style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'var(--base-100)',
                        borderRadius: '0.5rem',
                        width: '100%',
                    }}

                />

                <div className="flex flex-row flex-nowrap w-full self-auto  gap-3   items-start justify-start h-auto   ">
                {images.length > 1 && images.map(
                    (im, i) =>
                    <div
                    key={i}
                    onClick={() => setSelectedImage(im)}
                    className={`${selectedImage === im ? 'ring-2  ring-primary' : 'ring-1 ring-base-200 hover:ring-primary hover:ring-2'} rounded-md
                    transition-all duration-75 cursor-pointer h-12 w-12 md:h-20 md:w-20 overflow-x-scroll rounded-md
                    `}
                    style={{
                        backgroundImage: `url(${im})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'var(--base-100)',
                        
                    }}
                    />

                )}
                </div>
                </>
                : <NoImages />
                }
        </div>

    )}


function ContactModal({setContactModal, title, price, listingId}) {
    const { pb } = usePocketBase() as PBContext;  
    const [message, setMessage] = useState('');

    const [messageSent, setMessageSent] = useState(false);
    async function sendMessage() {
        if (!message) {
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hupost/message/${listingId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": pb.authStore.token
          },
          body: JSON.stringify({ message }),
        });

        if (response.ok) {
          setMessageSent(true);
          return;
        }
        window.alert('Smth went wrong. Message not sent');
    }

    const isFree = price === 0 || price === 'Free' || price === ''
    const isMobile = window.innerWidth < 768;
    return (
        <Modal closeButton onClose={() => setContactModal(false)}
        paddingX="16px"
        paddingY="16px"
        gap="12px"
        corners="lg"
        modalBackground="base-0">
            <div className="flex flex-col flex-nowrap w-full self-auto gap-3 items-start justify-start min-h-[320px]">
             <h1 className="text-2xl font-semibold">
             {messageSent ? "Message Sent" : "Contact Seller"}
             </h1>

             {messageSent ?
             <>
             <div className="flex-grow w-full">
             <Alert text="Check your inbox or spam folder. There should be an email connecting you with the seller." 
             type="success" width="full" />
             </div>
             <Button text="Close" size="medium" style="filled" onClick={() => setContactModal(false)} />
             </>
                 :
                <>
                <div className="flex-grow w-full flex-col flex gap-3">
            <span className="text-base-500 text-lg md:text-sm font-normal">
            {title} - {isFree ? "Free" : `$${price}`}
             </span>
             <TextArea
                placeholder="Message to seller"
                value={message}
                width="full"
                size={isMobile ? 'large' : 'medium'}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}

             />   </div>
             <div className="flex flex-col-reverse md:flex-row gap-3 items-center w-full md:w-auto md:justify-end h-auto ">
                <Button text="Cancel" size="medium" style={isMobile ? 'light' : 'ghost'}
                width={isMobile ? 'full' : 'auto'}

                onClick={() => setContactModal(false)} />
                <Button 
                text="Send" 
                size="medium" 
                width={isMobile ? 'full' : 'auto'}
                style="filled" color="primary" onClick={message ? sendMessage : null} state={message ? 'default' : 'disabled' } />

             </div></>}
             </div>
        </Modal>
    )
}

function NoImages() {
    return (
        <div className="bg-base-100 w-full h-[240px] flex flex-col gap-2 items-center justify-center rounded-md text-sm text-base-700">
            <MediaImage width={40} height={40} strokeWidth={1.2}/>
            No Images
        </div>
    )
}


function Controls({
    listing,
    listingId,
    userId,
    isDraft,
    isExpired,
    isFavorite,
    loading,
    toggleFavorites,
    status,
    setContactModal,
    isMobile,
    setIsEditing,
    isEditing
}) {
    return (
        <div className="flex flex-row flex-nowrap  self-end gap-3 items-center md:justify-end h-auto ">

        {listing.posted_by !== userId ?
        <>
        {(!isDraft && !isExpired)?
        !isMobile ?                    
        <Button rightIcon={isFavorite ? 'heart' : null}
        text={isFavorite ? 'Favorite' : 'Add to Favorites'}
        color={'warning'}
        size="medium"
        style={isFavorite ? 'filled' : "outlined"}
        state={loading ? 'loading' : 'default'}
        width={isMobile ? 'full' : 'auto'}
        onClick={() => toggleFavorites(listingId)} /> 
        : <ButtonIcon 
        icon="heart" 
        style={isFavorite ? 'filled' : "outlined"}
        state={loading ? 'loading' : 'default'}
        color="warning" size="medium" onClick={() => toggleFavorites(listingId)} />
        : null}
        
        {status === 'active' &&
        <Button size="medium" style="filled"
        rightIcon="mail"
        color="primary"
        width={isMobile ? 'full' : 'auto'}
        onClick={() => setContactModal(true)}
        text="Contact Seller" />}</>
        :
        <>
        {isExpired ? null :
        <Button rightIcon='edit' text="Edit" size="medium" onClick={() => setIsEditing(!isEditing)} />}
        </>}
        </div>

    )
}