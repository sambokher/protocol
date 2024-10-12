import { Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

type TagProps = {
    text?: string,
    type?: 'filled' | 'outline' | 'light',
    color?: 'base-200' | 'base-700' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error',
    size?: 'small' | 'medium',
    leftIcon?: IconType,
    rightIcon?: IconType,
    isPill?: boolean,
    onRightIconClick?: () => void,
    __juno?: any,
}

export default function Tag({
        text = 'Tag',
        type = 'filled',
        color = 'base-200',
        size = 'medium',
        leftIcon,
        rightIcon,
        isPill = true,
        onRightIconClick,
        __juno = {},
      }: TagProps) {
    
    // CONTAINER STYLES
    const styleMap = {
        'filled': `bg-${color} text-${color == 'base-200' ? 'base-content' : 'base-0'}` ,
        'outline': `text-${color} ring-1 ring-${color}` ,
        'light': `bg-${color}/20 text-${color?.startsWith('base') ? 'base-content' : color+'-content'}` ,
    }
    
    const sizeStyleMap = {
        small: `text-xs py-0.5 gap-0.5 ${isPill ? 'rounded-full px-2' : 'rounded px-1.5'}`,
        medium: `text-sm py-1 gap-1 ${isPill ? 'rounded-full px-3' : 'rounded-md px-2'}`,
    };

    const sizeStyles = sizeStyleMap[size]

    const classes = `flex font-semibold items-center flex-shrink-0 justify-center ${sizeStyles} ${styleMap[type]}`
    
    const LeftIconComponent = leftIcon ? <Icon icon={leftIcon} className={`flex-shrink-0 scale-90 -ml-${size == 'small' ? '1' : '1.5'}`}/> : null;
    const RightIconComponent = rightIcon ? <Icon icon={rightIcon} className={`flex-shrink-0 scale-[0.8] active:scale-100 transition-all duration-150 -mr-${size == 'small' ? '1' : '1.5'}`}
onClick={onRightIconClick}
        /> : null;
        
    // -mr-1 -mr-1.5
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >   
        {LeftIconComponent}
        <span style={truncateStyle} className='flex-grow'>
        {text}
        </span>
        {RightIconComponent}
        </div>
    ); 
}


