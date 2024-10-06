import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonIcon, InputText, ToggleSwitch, Select, TextArea, SegmentedSwitch, Loader, Icon } from '../junokit';
import { useNavigate, useParams } from 'react-router-dom';
import { PBContext, usePocketBase } from '../contexts/PocketBase';
import { categories, compressImage, getStatus, schools } from './Utils/helpers';
import DatePicker from '../junokit/DatePicker';
import Checkbox from '../junokit/Checkbox';
import Status from '../junokit/Status';
import Popover from '../junokit/Popover';

type Listing = {
  id?: string;
  title: string;
  category: string;
  school: string;
  description: string;
  price: string;
  deactivated: string;
  exp_days: string;
  published: string;
  images: [];
};

export default function EditListing() {

  const { pb } = usePocketBase() as PBContext; 
  const userId = pb.authStore.model.id
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState<Listing>({} as Listing);
  const [errors, setErrors] = useState({
    title: null, 
    price: null
  });

  const [isFree, setIsFree] = useState(false);
  const descriptionPlaceholders = {
    for_sale: "Add item description, e.g. condition, size, include pickup/delivery details",
    housing: "Add description, e.g. number of bedrooms, bathrooms, location, rent, roomates",
    jobs: "Add job description, e.g. role, company, location, salary, requirements",
  }

  const [newFiles, setNewFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);

  async function handleSave(listing, redirect=true) {

    // Add validation for title
    if (!listing.title) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }

    try {
      
      // When editing we can only change title, description, price, and update images
      const formData = new FormData();
      formData.append('title', listing.title);
      formData.append('description', listing.description);
      formData.append('price', listing.price ? String(parseInt(listing.price)) : '0');
      newFiles?.forEach((file, index) => {if (file instanceof File) {formData.append('images', file);}});
      if (deletedFiles?.length > 0) {formData.append('images-', JSON.stringify(deletedFiles));}
      
      
      // or deactivate listing
      formData.append('deactivated', listing.deactivated)

      // or publish
      if (listing.published) {
        formData.append('published', new Date().toISOString());
      }


      const response = await pb.collection('listings').update(listing.id, formData);  // Update listing with file upload
      
      setListing(response as unknown as Listing);
      
      if (redirect) {
        navigate('/listing/' + listing.id);
      } else {
      setNewFiles([]);
      setDeletedFiles([])
    }

    } catch (error) {
        console.error("Error saving:", error);
      }
    }


  useEffect(() => {
    async function fetchListing() {
      const response = await pb.collection('listings').getOne(id);
      if (listing) {
        setListing(response as unknown as Listing);
        // setIsFree(listing.price === 0 || listing.price == '');
        setIsLoading(false);
      }
    }

    if (id) {
      fetchListing();
    }
  }
  , [id]);
  
  const handleDelete = () => {
    // Placeholder for delete functionality
    // confirm via window.confirm
    if (window.confirm("Are you sure you want to delete this listing?")) {
        pb.collection('listings').delete(listing.id);
        navigate('/my-listings');
    }
  };

  const isDraft = !listing?.published
  const isActive = getStatus(listing) == 'active'
  const isDelisted = getStatus(listing) == 'delisted'

  function handlePublish(listing, redirect=true) {
    if (listing.category == 'housing' || listing.category == 'jobs') {
      setPaymentPopup(true);
      return;
    }

    const updatedListing = {...listing, published: new Date().toISOString()}
    handleSave(updatedListing, redirect)
  }

  const status = getStatus(listing)
  const expirationDate = isDraft 
    ? '' 
    : new Date(new Date(listing?.published).setDate(new Date(listing?.published).getDate() + parseInt(listing?.exp_days) + 1))
        .toISOString()
        .split('T')[0];

  const isExpired = expirationDate && expirationDate < new Date().toISOString();
  const expOptions = [
    { label: "1 day", value: "1" }, 
    { label: "3 days", value: "3" }, 
    { label: "7 days", value: "7" }, 
    { label: "14 days", value: "14" },
    { label: "30 days", value: "30" }];
  
  const isMobile = window.innerWidth < 768;
  function deactivateListing() {
    const updatedListing = {...listing, deactivated: new Date().toISOString()}
    handleSave(updatedListing, true)
  }

  const [paymentPopup, setPaymentPopup] = useState(false);
  if (isLoading) return <div className='w-full h-full flex items-center justify-center'><Loader size='28px'/></div>;

  if (listing) return (
    <>
    {paymentPopup &&
        <Popover
          title='Payment Required'
          text='Posts in Housing or Jobs are $5'
          primaryButton={
          <Button 
            size={'medium'} 
            text={'Checkout with Stripe'} style='filled'
            onClick={() => {window.location.assign(`https://buy.stripe.com/test_9AQ3cW79Q2Wr2t23ce?client_reference_id=${listing.id}` )}}
            extraClasses='plausible-event-name=Click+to+Checkout'  
          />}
          secondaryButton={<Button text={'Cancel'} size={'medium'} style='ghost'   onClick={() => setPaymentPopup(false)}/>}
          onClose={() => setPaymentPopup(false)}
        />
    }
    <div className="flex flex-col w-full self-auto gap-5 items-stretch justify-start h-auto mx-auto">
        <div className="flex flex-col md:flex-row flex-nowrap w-full self-auto gap-3 items-stretch justify-start h-auto mb-2">
          <div className="flex flex-col flex-nowrap w-full self-auto gap-3 items-start justify-start h-auto">
            <Status 
              text={status.charAt(0).toUpperCase() + status.slice(1)}
              isPill
              color={status == 'active' ? 'success' : status == 'delisted' ? 'warning' : 'base-700'}
              
              />
            <div className="flex flex-col flex-nowrap w-full self-auto gap-0 items-start justify-start h-auto">
              <input 
                className={`text-ellipsis text-3xl font-semibold text-left w-full
                    ${errors.title ? 'bg-warning-surface/25' : 'bg-transparent'}
                    `} style={{ whiteSpace: 'pre-wrap' }}
                placeholder="Title"
                value={listing?.title || ''}
                onChange={(e) => { setListing({ ...listing, title: e.target.value }); setErrors({ ...errors, title: null }) }}
              />
              
                
            </div>
            
          </div>
          <div className='hidden md:flex'>
          <Controls 
            listing={listing} 
            handleSave={handleSave} 
            handlePublish={handlePublish}
            handleDelete={handleDelete}
            isDraft={isDraft}
            isExpired={isExpired}
            isDelisted={isDelisted}
            isActive={isActive}
            deactivateListing={deactivateListing}
          />
          </div>

        </div>
        {errors.title && 
              <span className='text-warning text-xs -mt-3'>
                {errors.title}
              </span>}
        <div className="w-full gap-5 md:gap-8 h-auto flex flex-col-reverse md:flex-row" >
          <div className="flex flex-col flex-nowrap w-full pb-12 md:pb-0 self-auto text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-auto">
            <div className="flex flex-col flex-nowrap w-full self-auto gap-3 items-start justify-start h-auto">
              <InputText 
                placeholder="0.00" 
                width="full" 
                bgColor="base-0" 
                hasOutline 
                type='number'
                min={0}
                max={99999}
                step={1}
                value={listing?.price || ''}
                state={(isFree || isExpired || isDelisted) ? 'disabled' : 'default'}
                onChange={(e) => setListing({ ...listing, price: e.target.value })}
                prefix="$" 
                size="large" />
                {(isExpired || isDelisted) ? null :
              <ToggleSwitch 
                label="Make Free" 
                checked={isFree} 
                style='rectangle'
                onChange={() => {setIsFree(!isFree); !isFree && setListing({ ...listing, price: '' })}}
                />}
            </div>
            <div className="grid grid-cols-3 gap-4 h-auto w-full">
              <Select 
                placeholder="Category" 
                options={categories} 
                state='disabled'
                hasOutline bgColor="base-0" value={listing.category}
                onChange={() => {}}
                label='Category'
                width="full" size="large" />    
                {isDraft ? 
                <Select 
                placeholder="Expiration"
                label='Expires in' 
                options={expOptions} 
                value={listing.exp_days}
                bgColor="base-0" 
                hasOutline width="full" 
                size={isMobile ? 'medium' : 'large'}
                onChange={(value) => setListing({ ...listing, exp_days: value })}
                />
                :
                <DatePicker
                  value={expirationDate}
                  state='disabled'
                  bgColor="base-0"
                  label='Expires'
                  hasOutline
                  width="full"
                  size="large"
                  onChange={() => {}}
                />}
                <Select 
                width="full" 
                hasOutline 
                placeholder="–" size="large" 
                options={schools} bgColor="base-0" 
                value={listing.school}
                label='Location'
                state={(isExpired || isDelisted) ? 'disabled' : 'default'}
                onChange={(value) => setListing({ ...listing, school: value })}
                />
            </div>
            <TextArea 
                width="full" 
                placeholder={descriptionPlaceholders[listing.category]}
                bgColor="base-0" 
                rows={12}
                state={(isExpired || isDelisted) ? 'disabled' : 'default'}
                hasOutline size="large" value={listing.description} 
                onChange={(e) => setListing({ ...listing, description: e.target.value })} />
                <a className="hover:underline transition-all duration-75 opacity-50
                cursor-pointer text-xs" onClick={() => navigate('/listing/' + listing.id)}>
                    Listing ID: {listing.id}
                </a>
          </div>


          <ImagesBlock 
            images={listing?.images} 
            onChange={(images) => setListing({ ...listing, images: images })}
            imagesToDelete={deletedFiles}
            setImagesToDelete={setDeletedFiles}
            newFiles={newFiles}
            setNewFiles={setNewFiles}
            listingId={listing?.id}
            noEdit={isExpired || isDelisted}
          />

        </div>
        <div className="md:hidden fixed bottom-0 left-0 w-full flex flex-row bg-base-0 border-t border-base-200 flex-nowrap w-auto self-auto gap-3 items-end justify-end h-auto p-4">
          <Controls 
              listing={listing} 
              handleSave={handleSave} 
              handlePublish={handlePublish}
              handleDelete={handleDelete}
              isDraft={isDraft}
              isExpired={isExpired}
              isDelisted={isDelisted}
              isActive={isActive}
              deactivateListing={deactivateListing}
            />
          </div>
      </div>
      </>
  );
};



function ImagesBlock({ images, listingId, onChange, imagesToDelete, setImagesToDelete, newFiles, setNewFiles, noEdit }) {
    const inputFileRef = useRef(null);
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
            const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    
            if (!validImageTypes.includes(fileType)) {
                alert('Only JPG, PNG, and SVG files are allowed.');
                return;
            }
    
            if (fileSizeInMB > 5) {
                alert('File size exceeds 5 MB.');
                return;
            }
    
            // Compress the image (assuming compressImage is implemented)
            const compressedBlob = await compressImage(file);
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });
    
            // Track new files
            setNewFiles([...newFiles, compressedFile]);
            const updatedImages = [...images, compressedFile];
            onChange(updatedImages);
        }
    };

    const handleAddImage = () => {
        inputFileRef.current.click(); // Trigger the file input click to upload a new image
    };

    const handleDeleteImage = (index, img) => {
        const updatedImages = images.filter(i => i !== img); // Remove the image from the images array

        // If the image being deleted exists in the initial images (database-stored ones)
        if (!(img instanceof File)) {
            setImagesToDelete([...imagesToDelete, img]); // Track the image URL for deletion
        } else {
            setNewFiles(newFiles.filter((file) => file !== img));
        }
        onChange(updatedImages); // Update the images in the parent state
    };

    const isMobile = window.innerWidth < 768;
    if (images) return (
        <div className="flex flex-col flex-nowrap w-full self-auto text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-auto">
            {images?.length === 0 ? (
                <div className="flex flex-col flex-nowrap w-full self-auto text-base-content bg-base-50 rounded-md items-center justify-center h-auto min-h-[240px]">
                    <button className="btn btn-light" onClick={handleAddImage}>
                        {noEdit ? 'Cannot Edit Inactive' : 'Add Image'}
                    </button>
                    <span className='max-w-64 text-xs text-base-500 text-center mx-auto mt-5'>
                        Files should not exceed 5MB and must be in JPG, PNG, or SVG format.
                    </span>
                    <input
                        type="file"
                        accept=".svg,.png,.jpg,.jpeg"
                        style={{ display: 'none' }}
                        ref={inputFileRef}
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4 h-auto w-full">
                    {images?.map((image, index) => {
                        const imageUrl = image instanceof File ? URL.createObjectURL(image) : `https://hupost.pockethost.io/api/files/listings/${listingId}/${image}`;
                        
                        return (
                            <div
                                key={index}
                                className="flex relative flex-col flex-nowrap w-full self-auto text-base-content bg-base-0 rounded-base items-center justify-center h-auto ring-1 ring-current-20"
                            >
                                <img
                                    src={imageUrl}
                                    alt="Listing"
                                    className="object-cover w-full h-full rounded-base"
                                />
                                {noEdit ? null :
                                <div className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'>
                                <ButtonIcon 
                                    size='small'
                                    icon='xmark'
                                    style='light'
                                    isPill
                                    color='warning'
                                    onClick={() => handleDeleteImage(index, image)}
                                />
                                </div>}
                                
                            </div>
                        );
                    })}
                    {images?.length < 5 && !noEdit &&  (
                        <div className="flex flex-col flex-nowrap w-full self-auto text-base-content bg-base-50 rounded-md items-center justify-center h-auto min-h-32">
                        {isMobile ? 
                        <ButtonIcon
                            style="light"
                            icon='add'
                            onClick={handleAddImage}
                            /> :
                        <Button
                            style="light"
                            text="Add More"
                            leftIcon="add"
                            onClick={handleAddImage}
                        />}
                            <input
                                type="file"
                                accept=".svg,.png,.jpg,.jpeg"
                                style={{ display: 'none' }}
                                ref={inputFileRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Controls({ listing, handleSave, handlePublish, handleDelete, 
  isDraft, isExpired, isDelisted, isActive, deactivateListing
 }) {
  return (
    <div className="flex flex-row flex-nowrap w-auto self-auto gap-3 items-center justify-end h-auto">
            {isExpired ? <Button text='Delete' color='warning' size='medium' onClick={handleDelete} style='light' />
            : <ButtonIcon icon="trash" size="medium" color="warning" onClick={handleDelete} style='ghost' />}

            {!isDraft ?
            <>
            {isActive &&
            <Button 
              text='Deactivate' 
              color='warning'
              size='medium'
              leftIcon='xmark'
              onClick={deactivateListing}
              />
            }
            {isDelisted &&
            <Button
              text='Re-Activate To Edit'
              color='success'
              size='medium'
              style='filled'
              leftIcon='check'
              onClick={() => handleSave({ ...listing, deactivated: null }, true)}
              />  
            }
            {!isExpired && !isDelisted &&
            <Button text={'Save'} style="filled" size="medium" onClick={() => handleSave(listing, true)}/>}
            </>: 
            <>
            <Button text={'Save Draft'} style="light" size="medium" onClick={() => handleSave(listing, true)}/>
            <Button text={'Publish'} style="filled" size="medium" onClick={() => handlePublish(listing, true)}
              extraClasses={listing.category != 'for_sale' ? 'plausible-event-name=Click+to+Publish' : ''} // attach Plausible custom event
              />
            </>
            }
            

            
          </div>
  )
}