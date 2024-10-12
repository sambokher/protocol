type LoaderProps = {
    size?: '12px' | '16px' | '20px' | '24px' | '28px' | string,
    type?: 'spinner' | 'pulse',
    color?: 'base-0' | 'base-100' | 'base-content' | 'primary' | 'accent' | 'error' | 'warning' | 'success' | 'info' | string,
    opacity?: '100' | '70' | '50',
    __juno?: any
}

export default function Loader({
        size='16px', 
        type='spinner', 
        color=null,
        opacity='70', 
        __juno = {},
    }: LoaderProps) {
    
    const borderSizeMap = {
        '12px': 'border',
        '16px': 'border-2',
        '20px': 'border-[3px]',
        '24px': 'border-4',
        '28px': 'border-[5px]'
    };
    // border-current 
    const useColor = color ? color : 'current'
    const typeClasses = type == 'spinner' ? `${borderSizeMap[size]} border-solid border-${useColor} border-t-transparent` : 
    `bg-${useColor} `
    
    const animation = type == 'spinner' ? 'animate-spin' : 'pulsate-125' 
    const classes = `${typeClasses} rounded-full opacity-${opacity}
${animation}`

    return (
        <div className={__juno?.outlineStyle} {...__juno?.attributes}>
            <div 
                style={{width: size, height: size}}
                className={classes}/>
        </div> 
    );
}



