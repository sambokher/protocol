import React from 'react';
import { spacingMap } from '../helpers';

type IconBarProps = {
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-700' | 'base-content' | 'primary' | 'accent' | string,
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly',
    position?: 'left' | 'right',
    width?: '48px' | '64px' | '80px' | '96px',
    display?: boolean,
    textSize?: 'sm' | 'base' | 'md',
    children?: React.ReactNode,
    __juno?: any,
}

export default function IconBar({
        paddingX = null,
        paddingY = null,
        gap = null,

        background = 'base-0',        
        alignItems = 'stretch',
        justifyContent = 'start',
        position = 'left',
        width = '64px',
        display = true,
        textSize = 'base',
        children,
        __juno = {}
      }: IconBarProps) {
    
      const bgStyles = background ?`bg-${background}` : '';
      const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content' && background != 'base-700') ? 'text-base-content' : `text-base-0`
      const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
      const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    
    
    const fontSize = `text-`+textSize
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    

    const classes = `flex flex-col flex-shrink-0 flex-grow-0 z-50 relative ${fontColor} ${fontSize} ${paddingStyles} ${bgStyles} ${gapStyles} ${alignItemsStyles} ${justifyContentStyles} transition-all`

    if (display) return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{
            order: position == 'left' ? '-2' : 2,
            minWidth: width, 
            minHeight: '100%', 
        }}
        >
        {children}
        </div>
    );
}


