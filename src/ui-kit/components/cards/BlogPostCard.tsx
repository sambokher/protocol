import { Icon } from '../';
import { useMemo } from 'react';

type BlogPostCardProps = {
    imageSrc?: string,
    width?: '100%' | '200px' | '320px' | '400px',
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'xl',
    imageAspectRatio?: '1 / 1' | '2 / 1' | '3 / 1' | '4 / 1',
    textSize?: 'small' | 'medium',
    title?: string,
    icon?: 'none' | 'calendar' | 'post',
    posted_date?: string,
    author_name?: string,
    description?: string,
    defaultIconSet?: string,
    __juno?: any
}

export default function BlogPostCard({
        imageSrc = null,
        width = '100%',
        corners = 'md',
        imageAspectRatio = '2 / 1',
        textSize = 'small',
        title = "Post Title",
        posted_date = "Jun 2, 2023",
        author_name = "Author Name",
        description = "Short description that should be about 80-100 characters long.",
        __juno = {}

    }: BlogPostCardProps) {

    
    const sizeStyles = `w-full h-auto ${textSize == 'small' ? 'text-sm' : 'text-base'}`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    const classes = `flex flex-col items-stretch justify-start gap-3 ${sizeStyles}`

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
            {noImage && <Icon icon={'post'} className='flex-shrink-0' />}
        </div>
        
        {/* CONTENT BLOCK */}
        <div className={`flex flex-col flex-grow gap-1.5`} style={truncateStyle}>
            
            {/* Title */}
            <h3 className={`${titleFont} font-semibold `} style={truncateStyle}>
                {title}
            </h3>

            {/* post info */}
            {(author_name || posted_date ) && 
            <div className={`flex flex-row justify-between w-full gap-2 items-end ${smallerFont}`} style={{maxWidth: '100%'}}>
            <span className='font-medium truncate' style={truncateStyle}>
                {author_name}
            </span>
            {posted_date && <div className='flex-shrink-0 flex flex-row items-center gap-1.5'>
                {posted_date}
                <Icon icon='calendar' className='flex-shrink-0 scale-75' />
            </div>
            }</div>}
            {/* Description Lines */}
            {description && <div className={`${smallerFont} text-justify `} >
                {description}
            </div>}
        </div>
        </div>
    );
}


