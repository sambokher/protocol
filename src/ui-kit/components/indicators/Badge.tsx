type BadgeProps = {
    style?: 'filled' | 'outline' | 'light',
    text?: string,
    color?: 'base-200' | 'base-700' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error',
    size?: 'small' | 'medium',
    isPill?: boolean,
    alignSelf?: 'auto' | 'start' | 'end' | 'center',
    __juno?: any
}

export default function Badge({
        style = 'filled',
        text = 'Badge',
        color = 'success',
        size = 'medium',
        isPill = false,
        alignSelf = 'auto',
        __juno = {},
      }: BadgeProps) {
    
    const styleMap = {
        'filled': `bg-${color} text-${color == 'base-200' ? 'base-content' : 'base-0'} `,
        'outline': `text-${color}-content ring-1 ring-inset ring-${color}`,
        'light': color?.startsWith('base') ? `bg-current-10 text-base-content` : `text-${color}-content bg-${color}-surface`
    }
    
    const sizeStyleMap = {
        small: `text-xs py-0.5 gap-1.5 ${isPill ? 'rounded-full px-2' : 'rounded px-1.5'}`,
        medium: `text-sm py-1 gap-2 ${isPill ? 'rounded-full px-3' : 'rounded-md px-2'}`,
    };
    
    const sizeStyles = sizeStyleMap[size]

    const classes = `flex font-normal items-center flex-shrink-0 justify-center leading-tight self-${alignSelf} ${sizeStyles} ${styleMap[style]}`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >   
            <span className='w-full' style={{...truncateStyle}} >
            {text}
            </span>
        </div>
    ); 
}


