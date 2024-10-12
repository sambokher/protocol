type Props = {
    text?: string,
    direction?: 'up' | 'down' | 'left' | 'right',
    size?: 'small' | 'medium',
    bgColor?: 'base-0' | 'base-100' | 'base-content',
    __juno?: any,
}

export default function Tooltip({
     text = 'Tooltip',
     direction = 'up',
     size = 'medium',
     bgColor = 'base-content',
     __juno = {},
    }: Props) {
    
    const sizeStylesMap = {
        small: `py-0.5 px-2 text-xs rounded-sm shadow-sm`,
        medium: `py-1 px-3 text-sm rounded shadow-sm`
    }
    const distance = size === 'small' ? 2 : 4
    const directionStylesMap = {
        up: `-top-${distance} -translate-y-full left-1/2 -translate-x-1/2`,
        down: `-bottom-${distance} translate-y-full left-1/2 -translate-x-1/2`,
        left: `-left-${distance} -translate-x-full top-1/2 -translate-y-1/2`,
        right: `-right-${distance} translate-x-full top-1/2 -translate-y-1/2`
    }

    const bgStyles = bgColor === 'base-content' ? 'bg-base-content text-base-0' : `bg-${bgColor} text-base-content`
    const classes = `!absolute bg-${bgColor} ${sizeStylesMap[size]} transform ${directionStylesMap[direction]} ${bgStyles} transition-all duration-100 opacity-0 group-hover:opacity-100`
    
    /* ${isSelected ? 'opacity-80 group-hover:opacity-100' : ''}` || 'opacity-0 group-hover:opacity-100`' */
    
    return (
        <div className={classes} {...__juno?.attributes} // not adding outline style here because 'absolute' class is already added
        style={{pointerEvents: 'none', whiteSpace: 'nowrap'}}>
                {text}
        </div>
        )
}

