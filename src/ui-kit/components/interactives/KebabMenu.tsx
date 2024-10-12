import { useState, useEffect } from 'react'; 
import * as IconoirIcons from 'iconoir-react';
import { spacingMap } from '../helpers';

type KebabMenuProps = {
    bgColor?: 'base-0' | 'base-100',
    padding?: '8x' | '12px' | '16px',
    gap?: '4px' | '6px' | '8x' | '12px' | '16px',
    icon?: 'MoreHoriz' | 'MoreVert' | 'MoreHorizCircle' | 'MoreVertCircle' | 'NavArrowDown' | 'Plus' | 'PlusCircle',
    buttonBgColor?: 'base-0' | 'base-100',
    buttonOutline?: boolean,
    size?: '16px' | '20px' | '24px' | '32px',
    showMenu?: boolean,
    menuMinWidth?: 'fitContent' | '120px' | '160px' | '240px' | '320px',
    corners?: 'none' | 'sm' | 'md' | 'lg',
    openDirection?: 'downward-right' | 'downward-left' | 'upward-right' | 'upward-left',
    children: React.ReactNode,
    
    __juno?: any
}

export default function KebabMenu({
        bgColor = 'base-0',

        padding = null,
        gap = null,

        icon = 'MoreHoriz',
        buttonBgColor = null,
        buttonOutline = true,
        size = '20px',
        showMenu = false,
        menuMinWidth = '120px',
        corners = 'md',
        openDirection = 'downward-right',
        children,
        __juno = {},
      }: KebabMenuProps) {
    
    const [ open, setOpen ] = useState(showMenu)
    useEffect(() => {
        setOpen(showMenu);
    }, [showMenu]);

    /* Kebab Button */
    const iconColor = !buttonBgColor ? '' : parseInt(buttonBgColor.replace('base-', ''), 10) > 301 ? 'text-base-0' : 'text-base-content'
    const borderStyles = buttonOutline ? 'border border-base-300' : ''
    const menuPositionStyle = getMenuPositionStyle(openDirection)
    const classes = `relative flex-shrink-0 flex items-center justify-center`
    

    /* Icon */
    const iconSize = parseInt(size.replace('px', ''), 10) - 4
    const IconComponent = IconoirIcons[icon] || IconoirIcons['MoreHoriz'];
    

    /* Drop Area */
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    const paddingStyles = padding ? `gap-${spacingMap[padding]}` : '';
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const borderClasses = `border border-base-300` 
    const optionsClasses = `w-auto flex flex-col items-start justify-start mt-2 bg-${bgColor} z-5 absolute ${borderClasses} ${gapStyles} ${paddingStyles} ${cornerStyles} `
    
    function getMenuPositionStyle(direction) {
        switch (direction) {
            case 'upward-right':
                return { bottom: '100%', left: 0 };
            case 'upward-left':
                return { bottom: '100%', right: 0 };
            case 'downward-left':
                return { top: '100%', right: 0 };
            default: // 'downward-right'
                return { top: '100%', left: 0 };
        }
    }

    
    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        onClick={() => setOpen(!open) }
        >
        <div className={`p-[2px] rounded bg-${buttonBgColor} hover:brightness-95 transition-all ${borderStyles}`}>
        {IconComponent && <IconComponent 
            style={{height: iconSize, width: iconSize, strokeWidth: parseInt(size.replace('px', ''), 10) > 20 ? 2 : 1}} 
            className={`flex-shrink-0 flex-grow-0 ${iconColor}`}
            />}</div>
        
        {open && (<div  style={{ 
                        ...menuPositionStyle,
                        position: 'absolute', 
                        zIndex: 5000, 
                        minWidth: menuMinWidth
                    }}
                    className={optionsClasses}
                    >
                        {children}
        </div>)}
    </div>
);  
}



