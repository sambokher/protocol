import { useRef, useState } from 'react';
import { Button, ButtonIcon, InputText, ToggleSwitch, Select, TextArea } from '../junokit';
import { useNavigate } from 'react-router-dom';
import { PBContext, usePocketBase } from '../contexts/PocketBase';
import { categories, compressImage, schools } from './Utils/helpers';
import Popover from '../junokit/Popover';
import ReactDOM from 'react-dom';

const listingTemplate = {
    id: null, 
    price: '',
    category: 'for_sale',
    school: 'all',
    exp_days: '14',
    description: '',
    status: 'draft',
    title: '',
    images: [],
};

export default function AddListing() {

  const { pb } = usePocketBase() as PBContext; 
  const userId = pb.authStore.model.id
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [newListing, setNewListing] = useState({
    ...listingTemplate, 
    posted_by: userId
    });
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
  const expOptions = [
      { label: "1 day", value: "1" }, 
      { label: "3 days", value: "3" }, 
      { label: "7 days", value: "7" }, 
      { label: "14 days", value: "14" },
      { label: "30 days", value: "30" }];

  async function handleSave(listing, useStripe=false) {
    const status = listing.status
    if (status === 'draft') {
      // setSavingDraft(true);
    } else {
      setPublishing(true);
    }

    // Add validation for title
    if (!listing.title) {
      setErrors({ ...errors, title: "Title is required" });
      if (status === 'draft') setSavingDraft(false);
      else setPublishing(false);
      return;
    }

    try {
      // Initialize FormData for file uploads
      const formData = new FormData();

      // Append non-file fields to FormData
      formData.append('title', listing.title);
      formData.append('category', listing.category);
      formData.append('school', listing.school);
      formData.append('description', listing.description);
      formData.append('posted_by', userId);
      formData.append('price', listing.price ? String(parseInt(listing.price)) : '0');
      formData.append('published', status !== 'draft' ? new Date().toISOString() : '');
      formData.append('exp_days', listing.exp_days);
      

      newListing.images.forEach((file, index) => {
        if (file instanceof File) {
          formData.append('images', file);  // Append each image file
        }
      });

        // Create new listing
        console.log('Creating new listing:', formData);
        const response = await pb.collection('listings').create(formData);  // Create listing with file upload
        const listingId = response.id;
        console.log('status:', status);
        if (listing.category == 'for_sale' || !useStripe) {
            
            navigate('/listing/' + response.id)
        } else {          
          if (useStripe) {
            window.location.assign(
              `https://buy.stripe.com/5kAdUD9Wa43xdUs5kk?client_reference_id=${listingId}`,
            );
          } else {
            const data = {
              published: new Date().toISOString(),
            }
            await pb.collection('listings').update(listingId, data);
            navigate('/listing/' + response.id);
            
          }
        }

    } catch (error) {
        console.error("Error saving:", error);
        window.alert(`Error saving ${status}`);
        if (status === 'draft') setSavingDraft(false);
        else setPublishing(false);
      }
    }

  const handleDelete = () => {
    // Placeholder for delete functionality
    // confirm via window.confirm
    if (window.confirm("Are you sure you want to delete this listing?")) {
        pb.collection('listings').delete(newListing.id);
        navigate('/my-listings');
    }
  };

  const [paymentPopup, setPaymentPopup] = useState(false);
  function handlePublish() {
    handleSave({ ...newListing, status: 'active'});
  }

  function handlePaidPublish() {
    if (!newListing.title) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }
    setPaymentPopup(true);
  }
  
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  function renderPopover() {
    return (
      <Popover 
        title='Payment Required'
        text='Posts in Housing or Jobs are $5'
        primaryButton={
        <Button size={'medium'} text={'Checkout with Stripe'} style='filled' width={isMobile ? 'full' : 'auto'}
          onClick={() => handleSave({ ...newListing, status: 'draft'}, true)} 
          extraClasses='plausible-event-name=Click+to+Checkout'  
        />}
        secondaryButton={<Button text={'Cancel'} size={'medium'} 
        style={isMobile ? 'light' : 'ghost'}
        width={isMobile ? 'full' : 'auto'}
        onClick={() => setPaymentPopup(false)}/>}
        onClose={() => setPaymentPopup(false)}
      />
    );
  }
  return (
    <>
    {paymentPopup ?
      document.getElementById('portal-root') ? 
      ReactDOM.createPortal(renderPopover(), document.getElementById('portal-root')) :
      renderPopover() : null}

    <div className="flex flex-col w-full self-auto gap-5 items-stretch justify-start h-auto mx-auto">
        <div className="flex flex-col md:flex-row flex-nowrap w-full self-auto gap-3 items-stretch justify-start h-auto mb-2">
          <div className="flex  flex-col flex-nowrap w-full self-auto gap-3 items-start justify-start h-auto">
            {/*<div className='md:-ml-2.5 hidden md:flex'>
              <Button text="Back" leftIcon="chevron-left" 
              size={'small'}
              style={isMobile ? 'light' : 'ghost'}
              onClick={() => navigate('/')}/>
            </div>*/}
            <div className="flex flex-col flex-nowrap w-full self-auto gap-0 items-start justify-start h-auto">
              
              <input 
                className={`text-ellipsis text-3xl font-semibold text-left w-full whitespace-wrap w-full max-w-full
                  focus:bg-primary/10
                    ${errors.title ? 'bg-warning-surface/25' : 'bg-transparent'}
                    `} style={{ whiteSpace: 'pre-wrap' }}
                placeholder="Listing Title"
                value={newListing.title}
                autoFocus={true}
                onChange={(e) => { setNewListing({ ...newListing, title: e.target.value }); setErrors({ ...errors, title: null }) }}
              />
              
                
            </div>
            
          </div>
          <div className="hidden md:flex flex-row  flex-nowrap w-auto self-auto gap-3 items-end justify-end h-auto">
            {newListing.id && <ButtonIcon icon="trash" size="medium" color="warning" onClick={handleDelete} />}
            <Button text="Save Draft" size="medium" onClick={() => handleSave(newListing)} state={savingDraft ? 'loading' : 'default'} />
            <Button 
              text={newListing.category != 'for_sale' ? 'Publish' : 'Publish'} 
              style="filled" size="medium" 
              onClick={() => newListing.category == 'for_sale' ? handlePublish() : handlePaidPublish()} 
              state={publishing ? 'loading' : 'default'} 
              extraClasses={newListing.category != 'for_sale' ? 'plausible-event-name=Click+to+Publish' : ''} // attach Plausible custom event
              />
          </div>

        </div>
        {errors.title && 
              <span className='text-warning text-xs -mt-3'>
                {errors.title}
              </span>}
        <div className="flex flex-col-reverse md:flex-row w-full gap-4 md:gap-8 h-auto" >
          <div className="flex flex-col  pb-16 md:pb-0  flex-nowrap w-full self-auto text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-auto">
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
                value={newListing.price}
                state={isFree ? 'disabled' : 'default'}
                onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                prefix="$" 
                size="large" />
              <ToggleSwitch 
                label="Make Free" 
                checked={isFree} 
                style='rectangle'
                
                onChange={() => {setIsFree(!isFree); !isFree && setNewListing({ ...newListing, price: '' })}}
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-auto w-full">
              <Select 
                placeholder="Category" 
                options={categories} 
                size={isMobile ? 'medium' : 'large'}
                hasOutline bgColor="base-0" value={newListing.category}
                onChange={(value) => setNewListing({ ...newListing, category: value })}
                width="full"  />    
              
              <Select 
                width="full" 
                hasOutline 
                placeholder="All Schools" size={isMobile ? 'medium' : 'large'}
                options={schools} bgColor="base-0" 
                value={newListing.school}
                onChange={(value) => setNewListing({ ...newListing, school: value })}
                />
                
                <div className="hidden md:flex">
                <Select 
                  placeholder="Expiration" 
                  options={expOptions} 
                  value={newListing.exp_days}
                  bgColor="base-0" 
                  hasOutline width="full" 
                  size={isMobile ? 'medium' : 'large'}
                  onChange={(value) => setNewListing({ ...newListing, exp_days: value })}
                  /></div>
                
            </div>
            <div className="md:hidden flex w-full">
              <Select 
                placeholder="Expiration" 
                options={expOptions} 
                value={newListing.exp_days}
                bgColor="base-0" 
                hasOutline width="full" 
                label='Expiration'
                size={isMobile ? 'medium' : 'large'}
                onChange={(value) => setNewListing({ ...newListing, exp_days: value })}
                /></div>
            <TextArea 
                width="full" 
                placeholder={descriptionPlaceholders[newListing.category]}
                bgColor="base-0" 
                rows={12}

                hasOutline size="large" value={newListing.description} 
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })} />
          </div>

          
          <ImagesBlock 
            images={newListing.images} 
            onChange={(images) => setNewListing({ ...newListing, images: images })}
          />

        </div>
        <div className="md:hidden fixed bottom-0 left-0 w-full flex flex-row bg-base-0 border-t border-base-200 flex-nowrap w-auto self-auto gap-3 items-end justify-end h-auto p-4">
            <Button text="Save Draft" size="medium" onClick={() => handleSave({...newListing, status: 'draft'})} state={savingDraft ? 'loading' : 'default'} width='full'/>
            <Button text={newListing.category != 'for_sale' ? 'Publish' : 'Publish'} style="filled" size="medium" onClick={() => newListing.category == 'for_sale' ? handlePublish() : handlePaidPublish()} state={publishing ? 'loading' : 'default'} width='full'/>
          </div>
      </div>
      </>
  );
};



function ImagesBlock({ images, onChange }) {
    const inputFileRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
            const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    
            if (!validImageTypes.includes(fileType)) {
                alert('Only JPG, JPEG, PNG, and SVG files are allowed.');
                return;
            }
    
            if (fileSizeInMB > 5) {
                alert('File size exceeds 5 MB.');
                return;
            }
    
            // Compress the image
            const compressedBlob = await compressImage(file); // Compress the image
    
            // Convert the compressed Blob back into a File object
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });
    
            // Add the compressed file (which is now a File object) to the state
            onChange([...images, compressedFile]);
        }
    };

    const handleAddImage = () => {
        inputFileRef.current.click(); // Trigger the file input click to upload a new image
    };

    const isMobile = window.innerWidth < 768;
    return (
        <div className="flex flex-col flex-nowrap w-full self-auto text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-auto">
            {images.length === 0 ? (
                <div className="flex flex-col flex-nowrap w-full self-auto text-base-content bg-base-50 rounded-md items-center justify-center 
                h-[180px]
                md:h-[240px]">
                    <Button
                        style="light"
                        text="Add Image"
                        leftIcon="add"
                        onClick={handleAddImage}
                    />
                    <span className='max-w-64 text-xs text-base-500 text-center mx-auto mt-5'>
                    Files should not exceed 5MB and must be in JPG, JPEG, PNG, or SVG format.
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
                    {images.map((image, index) => {
                        const imageUrl = URL.createObjectURL(image);
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
                            <div className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'>
                                <ButtonIcon 
                                    size='small'
                                    icon='xmark'
                                    style='light'
                                    isPill
                                    color='warning'
                                    onClick={() => onChange(images.filter((_, i) => i !== index))}  
                                />
                            </div>
                        </div>);
                    })}
                    {/* If the number of images is less than 5, show the add button */}
                    {images.length < 5 && (
                        <div className="flex flex-col flex-nowrap w-full self-auto text-base-content bg-base-50 rounded-md items-center justify-center h-auto min-h-24">
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
