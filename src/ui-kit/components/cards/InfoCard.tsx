import { Icon, Button } from '../';
import { useMemo } from 'react';
import { IconType, allIconNames } from '../iconMap';

type InfoCardProps = {
    title?: string,
    width?: '100%' | '200px' | '320px',
    imageSrc?: string,
    imageAspectRatio?: '2 / 1' | '1 / 1' | '3 / 2' | '4 / 3',
    textSize?: 'small' | 'medium',
    icon?: IconType,
    secondaryText?: string,
    description?: string,
    primaryAction?: string,
    secondaryAction?: string,
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    __juno?: any
}

export default function InfoCard({
        title = "Card Title",
        width = '100%',
        imageSrc = null,
        imageAspectRatio = '2 / 1',
        textSize = 'small',
        icon = 'calendar',
        secondaryText = "Jun 2, 2023",
        description = "Short description that should be about 80-100 characters long.",
        primaryAction = null,
        secondaryAction = null,
        corners = 'md',
        __juno = {}
    } : InfoCardProps) {

    const sizeStyles = `w-full h-auto ${textSize == 'small' ? 'text-sm' : 'text-base'}`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    let classes = `flex flex-col items-stretch justify-start gap-3 ${sizeStyles}`

    const IconComponent = icon ? <Icon icon={icon}  className='flex-shrink-0' /> : null;

    const noImage = !imageSrc;
    const imageStyles = useMemo(() => ({
        background: !noImage && `linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.12)), url(${imageSrc}) no-repeat center center / cover`, 
        backgroundSize: 'cover', 
        aspectRatio: imageAspectRatio
    }), [imageSrc, noImage, imageAspectRatio]);

    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const titleFont = textSize == 'small' ? 'text-base' : 'text-lg';
    const smallerFont = textSize == 'small' ? 'text-xs' : 'text-sm';

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{maxWidth: width}}
        >
        {/* IMAGE / THUMBNAIL */}
        <div className={`relative w-full aspect-square flex items-center justify-center bg-current-10 ${cornerStyles}`} style={imageStyles}>
            {noImage && <Icon icon='image' />}
        </div>
        
        {/* Content Block */}
        <div style={truncateStyle} className={`flex flex-col flex-grow`}>
            
            {/* Title */}
            <div className={`mb-sm flex flex-col justify-between gap-2 items-start ${titleFont}`}>
                <h3 className={`font-semibold`} style={truncateStyle}>
                    {title}
                </h3>
                
                {(secondaryText || icon) && 
                <div className={`flex-shrink-0 flex flex-row items-center gap-1.5 ${smallerFont}`}>
                    {IconComponent}
                    {secondaryText}
                </div>}
            </div>

            {/* Card Description */}
            {description && 
            <div className={`${smallerFont} font-normal`} style={{minHeight: '2rem'}}>
                {description}
            </div>}
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && 
        <div className={`flex flex-row items-center flex-grow-0 flex-shrink-0 justify-start text-base gap-2 pointer-events-none`}>
            {primaryAction && <Button size='small' color='primary' text={primaryAction} onClick={()=>{}} marginTop={'6px'}/>} 
            {secondaryAction && <Button size='small' color='base-700' text={secondaryAction} onClick={()=>{}} marginTop={'6px'}/>} 
        </div>}
        </div>
    );
}

