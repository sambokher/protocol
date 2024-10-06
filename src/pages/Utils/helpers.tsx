import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
    const options = {
        maxSizeMB: 1, // Target compression size in MB
        maxWidthOrHeight: 1024, // Max width or height of the image
        useWebWorker: true, // Use web worker for compression
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error('Error compressing image:', error);
    }
};

export function formatTimeAgo(date: string | number | Date): string {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (minutes < 1) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    } else {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

export const schools = [
    { label: "All Harvard", value: "all" },
    { label: "College", value: "college" },
    { label: "HBS", value: "hbs" },
    { label: "HLS", value: "hls" },
    { label: "HMS", value: "hms" },
    { label: "SEAS", value: "seas" }
]

export const categories = [
    { label: "For Sale", value: "for_sale" },
    { label: "Housing", value: "housing" },
    { label: "Jobs", value: "jobs" }
]


export function isValidHarvardEmail(email) {
    // Define the list of valid domain endings
    const validDomains = [
      'college.harvard.edu',
      'hbs.edu',
      'hks.harvard.edu',
      'gsd.harvard.edu',
      'law.harvard.edu',
      'seas.harvard.edu',
      'fas.harvard.edu',
      'g.harvard.edu',
      'junodesign.app'
    ];
  
    // Extract the domain part of the email
    const emailDomain = email.split('@').pop();
  
    // Check if the domain ends with any of the valid domains
    return validDomains.some(domain => emailDomain.endsWith(domain));
  }


  export function getStatus(listing) {
    let status = 'draft';

    if (listing?.published) {
        // Calculate the expiration date based on `published` date + `exp_days`
        const expirationDate = new Date(listing.published);
        expirationDate.setDate(expirationDate.getDate() + (listing?.exp_days + 1 || 1)); // Adding `exp_days` to `published`

        // Check if the listing is expired
        if (expirationDate < new Date()) {
            status = 'expired';
        }
        // Check if the listing is deactivated (delisted) but not expired
        else if (listing?.deactivated) {
            status = 'delisted';
        } 
        // If the listing is neither expired nor deactivated, it is active
        else {
            status = 'active';
        }
    }

    return status;
}