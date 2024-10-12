type StatusProps = {
    color?: 'info' | 'success' | 'base-200' | 'base-700' | 'warning' | 'error',
    size?: 'small' | 'medium',
    text?: string,
    isPill?: boolean,
    style?: 'bright' | 'subtle',
    __juno?: any
}

export default function Status({
        color = 'info',
        size = 'medium',
        text = 'Status',
        isPill = false,
        style = 'subtle',
        __juno = {},
      }: StatusProps) {
    
    const sizeStyleMap = {
        small: `py-1 ${isPill ? 'px-2' : 'px-1.5'} gap-1.5 text-xs max-w-[120px]`,
        medium: `py-1 ${isPill ? 'px-2.5' : 'px-2'} gap-2 text-sm max-w-[160px]`
    };
    const cornerStyles = isPill ? 'rounded-full' : size === 'small' ? 'rounded' : 'rounded-md';
    const sizeStyles = sizeStyleMap[size]

    const fontColor = `text-base-content`
    const borderStyles = style == 'bright' ? `ring-1 ring-${color}` : ``
    const bgStyles = style == 'bright' ? `bg-${color}/20` : `bg-${color}/10`
    
    const classes = `${borderStyles} ${fontColor} ${sizeStyles} ${bgStyles} flex flex-row items-center font-medium justify-start leading-tight flex-shrink-0 flex-grow-0 whitespace-nowrap ${cornerStyles}`
    
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'};
    const circleSize = size == 'small' ? 7 : 9;
    const ringStyles = size == 'small' ? 'ring-1' : 'ring-2';

    

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
            >   
        {/* Status Indicator */}
        <div className={`flex-shrink-0 rounded-full bg-${color} 
        ${style == 'bright' ? `${ringStyles} ring-${color}/50` : ''} `}
            style={{
            width: circleSize, 
            height: circleSize, 
            
        }} />

        {/* Text */}
        <span style={truncateStyle}>
        {text}
        </span>
        </div>
    ); 
}


