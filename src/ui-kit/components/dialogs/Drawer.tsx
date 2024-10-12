import { spacingMap } from '../helpers';

type DrawerProps = {
    backdrop?: 'dark' | 'blurred' | 'none',
    position?: 'right' | 'left',
    paddingX?: '0px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px',
    paddingY?: '0px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px',
    bgColor?: 'base-0' | 'base-50' | 'base-100',
    border?: 'left' | 'right' | 'none',
    gap?: '0px' | '8px' | '12px' | '16px' | '24px' | '32px',
    alignItems?: 'start' | 'end' | 'center' | 'stretch',
    justifyContent?: 'start' | 'end' | 'center' | 'between',
    display?: boolean,
    width?: '360px' | '480px' | '640px' | '780px' | '50%' | '33%' | '25%',
    children?: any,
    
    __juno?: any
}

export default function Drawer({
        backdrop = 'none',
        position = 'right',
        
        paddingX = '16px',
        paddingY = '16px',
        gap = '12px',

        bgColor = 'base-0',
        
        alignItems = 'stretch',
        justifyContent = 'start',
        width = '360px',
        children,
        __juno = {}
        
      }: DrawerProps) {

    
    const darkBackground = `color-mix(in srgb, var(--base-content) 24%, transparent)`
    const lightBackground = `color-mix(in srgb, var(--base-content) 12%, transparent)`
    const overlayClasses = `absolute top-0 flex flex-col w-full h-full`

    // STYLES
    const bgStyles = bgColor ? `bg-${bgColor} text-base-content` : '';
    const borderStyles = position == 'left' ? 'border-l border-base-300' : 'border-r border-base-300';
    
    const paddingStyles = `${paddingX ? `px-${spacingMap[paddingX]}` : ''} ${paddingY ? `py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';

    const classes  = `flex flex-col relative h-full w-full flex-grow-0 flex-shrink-0 shadow-md ${paddingStyles} ${bgStyles} ${borderStyles}  ${gapStyles} ${alignItemsStyles} ${justifyContentStyles}`
    
    return (
        /* Overlay */
        <div  
        className={overlayClasses}
        {...__juno?.attributes} /* do we put them here or on the drawer */
        style={{
            backgroundColor: backdrop == 'none' ? 'transparent' : backdrop == 'dark' ? darkBackground : lightBackground,
            zIndex: 50, 
            backdropFilter: backdrop == 'blurred' && 'blur(2px)',
            overflowX: 'auto',
            overflowY: 'hidden',
            alignItems: position == 'left' ? 'flex-start' : 'flex-end',
            WebkitBackdropFilter: backdrop == 'blurred' && 'blur(2px)', /* For Safari compatibility */
        }}>
            <div 
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            style={{width: '100%', maxWidth: width, pointerEvents: 'all' }}>
            {children}
            </div>
        </div>
    );
}



