import { Icon } from '../';
import { useMemo } from 'react';
import { IconType, allIconNames } from '../iconMap';

type FileCardProps = {
    description?: string,
    thumbnailAspectRatio?: '2 / 1' | '1 / 1' | '3 / 2' | '4 / 3',
    textSize?: 'small' | 'medium',
    thumbnailImageSrc?: string,
    title?: string,
    icon?: Extract<IconType, 'page' | 'star' | 'folder'>;
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    width?: '100%' | '200px' | '320px',
    __juno?: any
}

export default function FolderCard({
        description = "Folder • 4 files",
        thumbnailAspectRatio = '2 / 1',
        textSize = 'small',
        thumbnailImageSrc = null,
        title = "Folder Name",
        icon = 'folder',
        corners = "none",
        width = '100%',
        __juno = {}
    } : FileCardProps) {
      
    const sizeStyles = `w-full h-auto ${textSize == 'small' ? 'text-sm' : 'text-base'}`
    const classes = `flex flex-col items-stretch justify-start gap-3 ${sizeStyles}`
    

    const contentClasses = `flex flex-col flex-grow`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    const noImage = !thumbnailImageSrc;
    const imageStyles = useMemo(() => ({
        background: !noImage && `linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.12)), url(${thumbnailImageSrc}) no-repeat center center / cover`, 
        backgroundSize: 'cover', 
        aspectRatio: thumbnailAspectRatio
    }), [thumbnailImageSrc, noImage, thumbnailAspectRatio]);

    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const titleFont = textSize == 'small' ? 'text-base' : 'text-lg';
    const smallerFont = textSize == 'small' ? 'text-xs' : 'text-sm';

    const IconComponent = icon ? <Icon icon={icon} className='flex-shrink-0' /> : null;

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{maxWidth: width}}
        >
        
        {/* THUMBNAIL */}
        <div className={`relative group w-full aspect-square flex items-center justify-center bg-current-10 ${cornerStyles}`} style={imageStyles}>
            {noImage && <Icon icon={'folder'}  className='flex-shrink-0' />}
        </div>
        
        {/* CONTENT BLOCK */}
        <div className={contentClasses}>
            
            {/* Title */}
            <div className={`flex flex-row justify-between gap-2 items-start ${titleFont} group `}>
                {IconComponent}
                <div className='flex-grow flex flex-col gap-1' style={truncateStyle}>
                    <h3 className={`font-semibold`}>
                        {title}
                    </h3>
                    {description && <span className={`${smallerFont} opacity-70`} style={truncateStyle}>
                        {description}
                    </span>}
                </div>
                <Icon icon='star' className='flex-shrink-0 transition-all cursor-pointer opacity-0 group-hover:opacity-100 scale-75' />
            </div>
        </div>
        </div>
    );
}




