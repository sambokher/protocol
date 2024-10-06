import { spacingMap } from './helpers';

type DividerProps = {
    color?: 'base-0' | 'base-100' | 'base-200' | 'base-300' | 'base-content' | 'primary' | 'accent' | 'success' | 'warning' | 'error' |
    'info' | 'success-surface' | 'warning-surface' | 'error-surface' | 'info-surface',
    margins?: '6px' | '8px' | '12px' | '16px' | '24px',
    direction?: 'horizontal' | 'vertical',
    thickness?: '0.5px' | '1px' | '2px' | '3px' | '4px',
    length?: 'full' | '3/4' | '2/3' | '1/2' | '1/3',
    __juno?: any,
}

export default function Divider({
        length = 'full',
        color = 'base-300',
        thickness = '1px',
        
        margins = null,
        
        direction = 'horizontal',
        __juno = {},
      }: DividerProps) {

    const marginStyles = direction == 'vertical' ? `h-${length} px-${spacingMap[margins]}` : `w-${length} py-${spacingMap[margins]}`
    
    const classes = `${marginStyles}`

    const inlineStyles = {
        height: direction == 'horizontal' ? thickness : '100%',
        width: direction == 'vertical' ? thickness : '100%',
        backgroundColor: `var(--${color})`
    }
    
    return (
        <div
        className={`${classes} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        >
            <div style={inlineStyles}/>
        </div>)
}



