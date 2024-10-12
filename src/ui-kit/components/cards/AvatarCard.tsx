import { Avatar } from '../';

type AvatarCardProps = {
    imageSize?: '16px' | '20px' | '24px' | '28px' | '32px' | '40px' | '48px',
    imageSrc?: string,
    imagePosition?: 'left' | 'right',
    imageColor?: 'auto' | 'base-0' | 'accent' | 'primary' | 'success' | 'error' | 'warning' | 'base-700',
    imageOnly?: boolean,
    type?: 'image' | 'initials',
    name?: string,
    secondaryText?: string,
    
    __juno?: any
}

export default function AvatarCard({ 
        imageSize = '28px',
        imageSrc = null,
        imageColor = 'accent',
        imageOnly = false,
        type = 'image',
        imagePosition = 'left',
        name = 'John Doe',
        secondaryText = null,
        
        __juno = {},
    }: AvatarCardProps) {

    const parsedSize = parseInt(imageSize)
    const gapStyle = parsedSize >= 42 ? 'gap-4' : parsedSize >=  33 ? 'gap-3' : parsedSize >= 28 ? 'gap-3' : 'gap-2'
    const classes = `flex flex-row items-center justify-start relative ${gapStyle}`
    
    const noSecondaryText = !secondaryText || secondaryText == '' || parsedSize < 24
    
    const titleSizeStyles = noSecondaryText 
        ? parsedSize >= 42 ? 'text-xl' : parsedSize >= 33 ? 'text-lg' : parsedSize >= 29 ? 'text-base' : parsedSize >= 20 ? 'text-sm' : 'text-xs'
        : parsedSize >= 42 ? 'text-lg' : parsedSize >= 33 ? 'text-base' : parsedSize >= 29 ? 'text-sm' : 'text-xs';
        
    
    const marginStyles = noSecondaryText ? '' :  parsedSize < 29 ? 'mb-0.5' : parsedSize < 33 ? 'mb-1' : parsedSize < 42 ? 'mb-1' : 'mb-1.5'
    const titleClasses = `font-medium leading-none ${titleSizeStyles} ${marginStyles}`

    const secondaryTextFontSize = parsedSize < 29 ? 'text-xs' : parsedSize < 33 ? 'text-xs' : parsedSize < 42 ? 'text-sm' : 'text-sm'
    const secondaryTextClasses = `text-current-50 leading-tight ${secondaryTextFontSize}`
    
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}
    console.log(name)
    return (
        <div
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
            >
         <Avatar size={imageSize} imageSrc={imageSrc} bgColor={imageColor} type={type} initials={name?.slice(0, 1)} />
         
         {!imageOnly &&
         <div 
            className={`flex flex-col ${imagePosition == 'left' ? 'justify-start text-left' : 'justify-end text-right'} text-current transition-all duration-75 ${imageOnly ? 'w-0 pointer-events-none opacity-0' : 'w-auto'}`}
            style={{...truncateStyle, order: imagePosition == 'left' ? 1 : -1}}>
            <h3 style={truncateStyle} className={titleClasses}>
                {name}
            </h3>
            {!noSecondaryText &&  <span style={truncateStyle} className={secondaryTextClasses}>
                {secondaryText}
            </span>}
         </div>}
        </div>
    )
}


