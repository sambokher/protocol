import { Icon } from '../';
import { useMemo } from 'react';
import { allIconNames, IconType } from '../iconMap';

type MiniCardHorizontalProps = {
    description?: string,
    textSize?: 'small' | 'medium',
    imageSize?: '40px' | '80px' | '92px' | '120px',
    title: string,
    imageSrc?: string,
    secondaryText?: string,
    icon?: IconType,
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    __juno?: any
}

export default function MiniCardHorizontal({
        description,
        textSize = 'small',
        imageSize = '80px',
        title = "Card Title",
        imageSrc,
        secondaryText = "Jun 2, 2023",
        icon = 'calendar',
        corners = 'md',
        __juno = {}
    }: MiniCardHorizontalProps) {
    

    const sizeStyles = `w-full h-auto ${textSize == 'small' ? 'text-sm' : 'text-base'}`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    const classes = `flex flex-row items-stretch justify-start gap-3 ${sizeStyles}`

    const IconComponent = icon  ? <Icon icon={icon} className='flex-shrink-0' /> : null;

    const noImage = !imageSrc || imageSrc === '';
    const imageStyles = useMemo(() => ({
        background: !noImage && `linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.12)), url(${imageSrc}) no-repeat center center / cover`, 
        backgroundSize: 'cover', 
        minHeight: '100%', 
        minWidth: imageSize, 
        flexShrink: 0
    }), [imageSrc, noImage, imageSize]);

    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const titleFont = textSize == 'small' ? 'text-base' : 'text-lg';
    const smallerFont = textSize == 'small' ? 'text-xs' : 'text-sm';
    
    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
        {/* IMAGE */}
        {<div className={`relative flex flex-shrink-0 aspect-square h-full items-center justify-center bg-current-10 ${cornerStyles}`} style={imageStyles}>
            {noImage && <Icon icon={'image'}  className='flex-shrink-0' />}
        </div>}
        
        {/* CONTENT BLOCK */}
        <div style={truncateStyle} className={`flex flex-col flex-grow gap-1.5 overflow-hidden`}>
            
            {/* Title */}
            <div className={`flex flex-col justify-between gap-2 items-start`}>
                <h3 className={`font-semibold ${titleFont}`} style={truncateStyle}>
                    {title}
                </h3>
                {(secondaryText) && 
                <div className='flex-shrink-0 flex flex-row items-center gap-2 '>
                    {IconComponent}
                    {secondaryText}
                </div>}
            </div>

            {/* Description */}
            {description && <div className={`${smallerFont}`} style={truncateStyle}>
                {description}
            </div>}
        </div>
        </div>
    );
}



