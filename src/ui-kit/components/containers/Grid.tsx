import { spacingMap } from '../helpers';

type GridProps = {
    paddingX?: '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    paddingY?: '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    gap?: '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'primary' | 'accent' | 'base-900',
    display?: boolean,
    columnCount?: number,
    alignItems?: 'start' | 'center' | 'end' | 'stretch',
    corners?: 'none' | 'sm' | 'md' | 'lg' | 'full',
    hasOutline?: boolean,
    width?: 'full' | 'auto' | '1/2' | '1/3' | '1/4' | '2/3' | '3/4',
    height?: 'full' | 'auto' | '1/2' | '1/3' | '1/4' | '2/3',
    fontColor?: 'base-0' | 'base-100' | 'base-200' | 'base-300' | 'base-500' | 'base-700' | 'primary' | 'accent' | 'base-900' | 'base-content' | 'auto' | 'success' | 'error' | 'warning' | 'info' | 'success-content' | 'error-content' | 'warning-content' | 'info-content',
    children?: any,
    
    __juno?: any
}

export default function Grid({
        paddingX = null,
        paddingY = null,
        gap = null,

        background = null,
        
        display = true,
        columnCount = 3,
        alignItems = 'start',
        corners = 'none',
        hasOutline = false,
        width = 'full',
        height = 'auto',
        fontColor = null,
        children,
        __juno = {}
    }: GridProps) {

    const bgStyles = background ? `bg-${background}` : '';
    
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const widthStyles = `w-${width}`;
    const heightStyles = `h-${height}`;
    const inheritFontStyle = (!background) ? '' : (background?.startsWith('base') && background != 'base-900') ? `text-base-content` : `text-base-0`;
    const fontStyles = (fontColor == 'auto' || !fontColor) ? inheritFontStyle : `text-${fontColor}`
    
    let borderStyles = hasOutline ? 'border border-base-300' : '';
    const classes = `grid ${borderStyles} ${widthStyles} ${bgStyles} ${cornerStyles} ${gapStyles} ${paddingStyles} ${heightStyles} ${fontStyles}`;
    
    if (display) return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{ alignItems: alignItems, gridTemplateColumns: columnCount ? `repeat(${columnCount}, minmax(0, 1fr))` : undefined }}
        >
        {children}
        </div>
    );
}


