import { spacingMap } from './helpers'; 

type DotProps = {
    size?: '4px' | '6px' | '8px' | '12px' | '16px',
    color?: 'base-0' | 'base-100' | 'base-200' | 'base-300' | 'base-content' | 'primary' | 'accent' | 'success' | 'warning' | 'error' |
    'info' | 'success-surface' | 'warning-surface' | 'error-surface' | 'info-surface',
    marginX?: '6px' | '8px' | '12px' | '16px' | '24px',
    marginY?: '6px' | '8px' | '12px' | '16px' | '24px',
    __juno?: any 
}

export default function Dot({
        size = '8px',
        color = 'base-300',
        marginX = null,
        marginY = null, 

        __juno = {}
      }: DotProps) {

    
    const classes = `py-${spacingMap[marginY]} px-${spacingMap[marginX]}`
    
    const inlineStyles = {
        width: size, 
        height: size,
    }

    return (
        <div 
            className={`${classes} ${__juno?.outlineStyle}`}
            {...__juno?.attributes}
        >
            <div className={`bg-slate-300 !bg-${color} rounded-full`} style={inlineStyles} />
        </div>)
}



