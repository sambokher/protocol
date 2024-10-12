import { Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

type AlertProps = {
    type?: 'info' | 'base' | 'error' | 'warning' | 'success',
    size?: 'small' | 'medium' | 'large',
    icon?: 'auto' | IconType;
    hasCloseButton?: boolean,
    whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap',
    text?: string,
    style?: 'filled' | 'outline' | 'light',
    title?: string,
    width?: 'auto' | '1/2' | 'full',
    children?: React.ReactNode,
    __juno?: any;
}

// needs mobile behavior
export default function Alert({
        type = 'base',
        size = 'medium',
        icon,
        hasCloseButton = false,
        text = 'This is an alert message',
        style = 'light',
        whiteSpace, 
        title = '',
        width = 'auto',
        children,
        __juno = {}
    }: AlertProps) {

    const styleMap = {
        'filled': type == 'base' ? `bg-base-content text-base-0` : `bg-${type} text-base-0` ,
        'outline': type == 'base' ? `text-base-600 ring-1 ring-inset ring-base-300` : `text-${type}-content ring-1 ring-inset ring-${type}-focus`,
        'light': type == 'base' ? `bg-base-100 text-base-content` : `bg-${type}-surface text-${type}-content`
    }

    const typeStyles = `${styleMap[style]}`
    
    const sizeStyles = size == 'small' ? `py-1.5 px-2 gap-1.5 text-xs` : `py-2.5 px-4 gap-2.5 text-sm`;
    const widthStyle = width == 'auto' ? `w-auto` : `w-${width}`
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"

    const classes = `flex flex-row items-start justify-between transition-all duration-100 ${typeStyles} ${sizeStyles} ${cornerStyles} ${widthStyle}`

    const iconStyleMap: {[key: string]: IconType} = {
        info: 'info',
        error: 'warning',
        base: 'info',
        warning: 'warning',
        success: 'check-circle',
    };
    
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}
    
    const useIcon = icon == 'auto' ? iconStyleMap[type] : icon;
    const iconSize = size == 'small' ? 'w-4 h-4' : 'w-5 h-5';
    
    const IconComponent = icon ? <Icon icon={useIcon}  className={`flex-shrink-0 ${iconSize}`} /> : null;
    // const IconComponent = icon ? <Icon icon={useIcon as IconNameType} className={`flex-shrink-0 ${iconSize}`} /> : null; // correct to this

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >   
            {IconComponent}
            <div className={`flex flex-col flex-grow-1 w-full items-start font-normal ${size == 'small' ? 'gap-0.5' : 'gap-1'}`}
            style={{whiteSpace: whiteSpace || 'normal'}}>
                {title && title != '' && <h2 className='font-semibold' style={truncateStyle}>
                    {title}
                </h2>}
                {text}
                {children}
            </div>
            {hasCloseButton && <Icon icon='close' className='flex-shrink-0 mt-0.5'/>}   
        </div>
    ); 
    
}


