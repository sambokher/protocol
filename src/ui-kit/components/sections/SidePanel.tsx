import React from 'react';
import { spacingMap } from '../helpers';

type SidePanelProps = {
    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-700' | 'base-content' | 'primary' | 'accent' | string,
    width?: '240px' | '280px' | '320px' | '360px' | '480px',
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    hasOutline?: boolean,
    alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
    justifyContent?: 'start' | 'end' | 'center' | 'between',
    display?: boolean,
    textSize?: 'sm' | 'base' | 'md',
    position?: 'left' | 'right',
    children?: React.ReactNode,
    __juno?: any,
}

export default function SidePanel({
        paddingX = null,
        paddingY = null,
        gap = null,

        background = 'base-50',

        position = 'left',
        hasOutline = true,
        
        alignItems = 'stretch',
        justifyContent = 'start',
        display = true,
        textSize = 'base',
        width = '280px',
        children,
        __juno = {}
      }: SidePanelProps) {

    const bgStyles = background ?`bg-${background}` : '';
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content' && background != 'base-700') ? 'text-base-content' : `text-base-0`
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    const fontSize = `text-`+textSize
    const borderStyles = !hasOutline ? '' : position == 'left' ? 'border-r-[0.5px] border-base-300' : 'border-l-[0.5px] border-base-300';
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    
    const classes = `flex flex-col flex-grow-0 flex-shrink-0 z-30 h-full relative ${paddingStyles} ${fontColor} ${fontSize} ${bgStyles} ${borderStyles} ${gapStyles} ${alignItemsStyles} ${justifyContentStyles}`

    if (display) return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{
            order: position == 'left' ? '-1' : 1, 
            width: width,
            maxWidth: width,
            minWidth: width
        }}>
        {children}
        </div>
    );
}


