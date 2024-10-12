import React from 'react';

type AvatarProps = {
    type?: 'image' | 'initials' | 'icon',
    bgColor?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-300' | 'base-700' | 'accent' | 'primary' | 'base-content' | 'success' | 'error' | 'warning' | 'info' | string,
    size?: '16px' | '20px' | '24px' | '28px' | '32px' | '40px' | '48px',
    indicatorType?: 'none' | 'notification' | 'status',
    indicatorColor?: 'success' | 'warning' | 'info' | 'error' | 'base-300',
    notificationCount?: number,
    initials?: string,
    outlineColor?: 'base-0' | 'base-100' | 'base-200' | 'base-300' | 'accent' | 'primary' | 'success' | 'error',
    hoverEffect?: boolean,
    imageSrc?: string,
    corners?: 'full' | 'sm' | 'md' | 'lg' | 'xl',
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    __juno?: any,
}

export default function Avatar({
        type = 'image',
        bgColor = 'accent',
        size = '28px',
        indicatorType = 'none',
        indicatorColor = 'success',
        initials = 'A',
        imageSrc,
        corners = 'full',
        notificationCount = 4,
        outlineColor,
        hoverEffect = true,
        onClick,
        __juno = {}
      }: AvatarProps) {

    const cornerStyles = "rounded-" + corners;
    const bgStyles = type == "image" ? "" : `bg-${bgColor}`;
    const fontColor = (bgColor?.startsWith('base') && !(bgColor == 'base-content' || bgColor == 'base-700')) ? 'text-base-content' : `text-base-0`

    const initialsFontSize =
    {
      "20px": "text-xs !font-normal hover:ring-1",
      "24px": "text-xs hover:ring-1",
      "28px": "text-sm hover:ring-[1.5px]",
      "32px": "text-md hover:ring-2",
      "40px": "text-lg hover:ring-2",
      "48px": "text-2xl hover:ring-3",
    }[size] || "text-base hover:ring-1";

    const ringStyles =
    type == "image"
      ? "!ring-0 !hover:ring-0"
      : outlineColor
        ? `hover:ring-${outlineColor}/50`
        : `hover:ring-${bgColor}/50`;
    const classes = `flex-shrink-0 flex flex-row items-center justify-center font-medium relative select-none transition-all duration-75 relative group hover:brightness-110 ${fontColor} ${cornerStyles} ${bgStyles} ${initialsFontSize} ${ringStyles} cursor-pointer`;
    
    const noImage = !imageSrc || imageSrc == "" || imageSrc == "null" || imageSrc == "undefined";
    const imageColor = bgColor == "auto" ? "currentColor" : `var(--${bgColor})`;
    // const ring = outlineColor && `0 0 0px 2px var(--${outlineColor}`
    
    const styles = {
        backgroundImage: type == "image" && !noImage ? `url(${imageSrc})` : "none",
        backgroundSize: "cover",
        width: size,
        height: size,
        borderRadius: corners == "full" ? 9999 : `var(--border-radius-${corners})`,
      };

    
      const statusSize =
      {
        "20px": "w-[10px] h-[10px] border shadow border-white",
        "24px": "w-3 h-3 border shadow border-white",
        "28px": "w-3 h-3 border shadow border-white",
        "32px": "w-4 h-4 border shadow border-white",
        "40px": "w-4 h-4 border-2 shadow-md border-white",
        "48px": "w-5 h-5 border-2 shadow-md border-white",
      }[size] || "w-3 h-3";
  
    const notificationSize =
      {
        "20px": "bg-transparent",
        "24px": "w-3 h-3 shadow border text-xs",
        "28px": "w-4 h-4 shadow border text-xs ",
        "32px": "w-4 h-4 shadow border text-xs ",
        "40px": "w-4 h-4 shadow-md border text-sm",
        "48px": "w-5 h-5 shadow-md border text-base",
      }[size] || "w-6 h-6";
    
    
    const indicatorBgStyles =
    indicatorType == "status"
      ? "bg-" + indicatorColor
      : `bg-${indicatorColor.substring(0, indicatorColor.length - 8)} border-${indicatorColor.substring(0, indicatorColor.length - 8)}-focus`;

    const indicatorTextStyles = indicatorColor == "base-300" ? "text-base-content" : `text-${indicatorColor}`;
    const indicatorStyles = `absolute ${indicatorBgStyles} ${indicatorType == "status" ? "bottom-0" : "top-0"} right-0
            ${indicatorType == "status" ? statusSize : notificationSize} rounded-full translate-x-1/4
            ${indicatorTextStyles} font-semibold flex items-center justify-center`;

    const formattedInitials = initials?.length > 1 ? initials?.slice(0, 1) : initials;

    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
         style={styles} 
onClick={onClick}
        >
        {noImage && type == 'image' &&
        <svg width={size} height={size} viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" rx="8" fill={imageColor} fillOpacity="0.2"/>
        <path d="M4.64805 6.64443C5.0374 6.64443 5.30586 6.37969 5.30586 5.98662V4.6706C5.30586 4.27451 5.0374 4.01279 4.64805 4.01279C4.26474 4.01279 4 4.28056 4 4.6706V5.98662C4 6.37969 4.26474 6.64443 4.64805 6.64443ZM7.49063 8.92494C7.51318 8.92494 7.54551 8.92494 7.57178 8.92494C8.47637 8.92494 8.95595 8.44834 8.95595 7.54072V4.49785C8.95595 4.18662 8.7626 4 8.45811 4C8.14014 4 7.94678 4.18662 7.94678 4.49785V7.62861C7.94678 7.79892 7.81855 7.89922 7.67617 7.89922H7.34043C7.0585 7.89922 6.84258 8.11514 6.84258 8.39404C6.84258 8.73224 7.06826 8.92494 7.49063 8.92494ZM11.8542 6.64443C12.2308 6.64443 12.4956 6.37969 12.4956 5.98662V4.6706C12.4956 4.28056 12.2308 4.01279 11.8542 4.01279C11.4612 4.01279 11.1964 4.27451 11.1964 4.6706V5.98662C11.1964 6.37969 11.4612 6.64443 11.8542 6.64443ZM8.21025 12.079C9.34645 12.079 10.4895 11.5954 11.3119 10.77C11.4018 10.6868 11.4603 10.5571 11.4603 10.389C11.4603 10.0936 11.2414 9.89054 10.9618 9.89054C10.8095 9.89054 10.694 9.94374 10.5327 10.1087C9.97445 10.6805 9.10055 11.0765 8.21025 11.0765C7.35059 11.0765 6.47002 10.694 5.8915 10.1087C5.75039 9.97444 5.6416 9.89054 5.45869 9.89054C5.17607 9.89054 4.95713 10.0936 4.95713 10.389C4.95713 10.5369 5.01875 10.6598 5.11543 10.7632C5.90039 11.6193 7.07402 12.079 8.21025 12.079Z" fill={imageColor} fillOpacity="0.85"/>
        </svg>}
         <span
            className={` ${hoverEffect ? 'group-hover:scale-125 transition-all duration-75' : ''}`}
         >{type == 'initials' && formattedInitials}</span>
         {indicatorType != 'none' && <div className={indicatorStyles}>{indicatorType == 'notification' && size != '20px' && notificationCount}</div> }
        </div>
    )
}


