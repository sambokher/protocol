import React from 'react';
import { spacingMap } from '../helpers';

type SidebarProps = {
    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-700' | 'base-content' | 'primary' | 'accent' | string,
    width?: 'auto' | '64px' | '240px' | '280px' | '320px' | '360px' | '480px' | '100%',
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px',
    gap?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly',
    position?: 'left' | 'right',
    hasOutline?: boolean,
    textSize?: 'sm' | 'base' | 'md',
    display?: boolean,
    children?: React.ReactNode,
    __juno?: any,
}

export default function Sidebar({
        background = 'base-0',

        paddingX = null,
        paddingY = null,
        gap = null, 
        
        position = 'left',
        hasOutline = true,
        
        alignItems = 'stretch',
        justifyContent = 'start',
        display = true,
        width = '280px',
        textSize = 'base',
        children,
        __juno = {}
      }: SidebarProps) {
    
    // STYLES
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    const fontSize = `text-`+textSize
    const bgStyles = background ? `bg-${background}` : '';
    const borderStyles = !hasOutline ? '' : position == 'left' ? 'border-r' : 'border-l';
    
    const borderColor = `color-mix(in srgb, var(--base-content) 12%, transparent)`

    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content' && background != 'base-700') ? 'text-base-content' : `text-base-0`
    
    const classes = `flex flex-col relative flex-grow-0 z-40 flex-shrink-0 transition-all
    ${paddingStyles} ${fontColor} ${fontSize} ${bgStyles} ${gapStyles} ${alignItemsStyles} ${justifyContentStyles} ${borderStyles} `

    if (display) return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        
        style={{
            order: position == 'left' ? '-2' : 2, 
            width: width,
            maxWidth: width,
            minWidth: width,
            borderColor: borderColor,
            minHeight: '100%',
        }}>
        {children}
        </div>
    );
}




