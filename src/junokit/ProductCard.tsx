import Icon from './Icon';
import { Iconoir, MediaImage } from 'iconoir-react';
import { useMemo } from 'react';
import ButtonIcon from './ButtonIcon';

type  ProductCardProps = {
    title?: string,
    descriptionFirstLine?: string,
    descriptionSecondLine?: string,
    width?: '100%' | '200px' | '320px',
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    textSize?: 'small' | 'medium',
    price?: string,
    imageSrc?: string,
    rating?: string,
    tag?: string,
    isFavorite?: boolean,
    onClick?: () => void,
    onFavorite?: () => void,
    __juno?: any
}

export default function ProductCard({
        title = "Product Name",
        descriptionFirstLine = "Description line 1",
        width = '100%',
        corners = 'md',
        textSize = 'small',
        price = "$50",
        imageSrc = null,
        rating,
        tag,
        isFavorite, 
        onClick,
        onFavorite,
        __juno = {}
    }: ProductCardProps) {
    

    const sizeStyles = `w-full h-auto ${textSize == 'small' ? 'text-xs' : 'text-sm'}`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    const classes = `flex flex-col items-stretch justify-start gap-3 group ${sizeStyles}`
    
    const font = textSize == 'small' ? 'text-sm' : 'text-md';
    const contentClasses = `flex flex-col flex-grow relative ${font} gap-0.5`
    
    const noImage = !imageSrc;
    const imageStyles = useMemo(() => ({
        background: !noImage && `linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.12)), url(${imageSrc}) no-repeat center center / cover`, 
        backgroundSize: 'cover', 
    }), [imageSrc, noImage]);

    
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    


    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{maxWidth: width}}
        onClick={onClick}
        >
        {/* IMAGE */}
        <div className={`relative w-full aspect-square flex items-center justify-center bg-current-10 
             md:hover:scale-[1.02] transition-all duration-75 cursor-pointer
            ${cornerStyles}`} style={imageStyles}>
            
            {/* TAG */}
            {tag && 
                <div className='absolute top-1.5 left-2 rounded-full px-3 py-1.5 bg-base-0 shadow font-medium max-w-[160px] truncate overflow-ellipsis whitespace-nowrap'>
                {tag}
            </div>}
                
        {noImage && <MediaImage width={60} height={60} style={{opacity: '0.3'}} />}

        { onFavorite &&
                <div className={`absolute top-2 right-2 transition-all bg-base cursor-pointer ${isFavorite ? '' : 'md:opacity-0 md:group-hover:opacity-100'}`} >
                <ButtonIcon
                    style={isFavorite ? 'filled' : 'light'}
                    color={isFavorite ? 'warning' : 'base-200'}
                    icon='heart'
                    isPill
                    size='small'
                    onClick={e => {e.stopPropagation(); onFavorite()}}
                />
            </div>}
        </div>
        
        {/* Description */}
        <div className={contentClasses}>
            
            {/* Title */}
            <div className={`mb-sm flex flex-row gap-2 justify-between items-center`}>
                <h3 className={`font-medium`} style={truncateStyle}>
                    {title}
                </h3>
                {rating && <div className='flex-shrink-0 flex flex-row items-center gap-0.5'>
                    <Icon icon='star' className='flex-shrink-0 scale-75'/>
                    {rating}
                </div>}
            </div>

            {/* Description Lines */}
            {descriptionFirstLine && <span className={`font-light opacity-70 truncate overflow-ellipsis`} style={truncateStyle}>
                {descriptionFirstLine}
            </span>}
            

            {/* Price and Price Note */}
            {price && 
                <div className={`flex flex-row gap-1 items-end items-baseline truncate font-medium`} style={truncateStyle}>
                        {price}
                </div>
            }
            
            
            </div>

            
        </div>
    );
}



