import React from 'react';
import { spacingMap } from '../helpers';

type FlexBoxProps = {
    direction?: 'flex-col' | 'flex-row',
    width?: 'full' | 'auto' | '1/2' | '1/3' | '1/4' | '2/3' | '3/4',
    height?: 'h-full' | 'h-1/2' | 'h-1/3' | 'h-1/4' | 'h-2/3' | 'h-[integer]px' | 'h-auto',
    paddingX?: '0px' | '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    paddingY?: '0px' | '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    gap?: '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'primary' | 'accent' | 'base-900',
    bgOpacity?: '10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100',
    hasOutline?: boolean,
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
    corners?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'full',
    alignItems?: 'start' | 'center' | 'end' | 'stretch',
    justifyContent?: 'start' | 'center' | 'end' | 'between',
    textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'md',
    maxWidth?: number,
    minWidth?: number,
    maxHeight?: number,
    minHeight?: number,
    selfAlign?: 'auto' | 'start' | 'center' | 'end',
    display?: boolean,
    bgImageSrc?: string,
    fontColor?: 'base-0' | 'base-100' | 'base-200' | 'base-300' | 'base-500' | 'base-700' | 'primary' | 'accent' | 'base-900' | 'base-content' | 'auto' | 
        'success' | 'error' | 'warning' | 'info' | 'success-content' | 'error-content' | 'warning-content' | 'info-content',
    children: React.ReactNode,
    __juno?: any
}

export default function FlexBox({
        direction = "flex-col",
        width = "full",
        height = "h-auto",
        paddingX,
        paddingY,
        background,
        bgOpacity,
        hasOutline,
        flexWrap = "nowrap",
        corners = "none",
        gap,
        alignItems = "start",
        justifyContent = "start",
        textSize = "auto",
        maxWidth,
        minWidth,
        maxHeight,
        minHeight,
        selfAlign = "auto",
        display = true,
        bgImageSrc,
        fontColor,
        children,
        __juno = {}
      }: FlexBoxProps) {

    const bgStyles = background ? `bg-${background}` : '';
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const widthStyles = width ? `w-${width}` : '';
    const heightStyles = `${height ? height : ''} ${maxHeight ? `max-h-[${maxHeight}px]` : ''} ${minHeight ? `min-h-[${minHeight}px]` : ''}`;
    const fontSize = textSize != 'auto' ? 'text-'+textSize : '';
    const borderStyles = hasOutline ? 'ring-1 ring-inset ring-base-200' : '';
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const wrapStyles = flexWrap ? `flex-${flexWrap}` : '';
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    const inheritFontStyle = (!background) ? '' : (background?.startsWith('base') && background != 'base-900') ? `text-base-content` : `text-base-0`;
    const fontStyles = (fontColor == 'auto' || !fontColor) ? inheritFontStyle : `text-${fontColor}`

    const classes = `flex ${direction} ${wrapStyles} ${widthStyles} ${selfAlign ? 'self-'+selfAlign : ''} ${fontStyles} ${fontSize} ${bgStyles} ${borderStyles} ${gapStyles} ${paddingStyles} ${cornerStyles} ${alignItemsStyles} ${justifyContentStyles} ${heightStyles}`
    
    const inLineStyles = {
        background: bgImageSrc && `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${bgImageSrc}) no-repeat center center / cover`, 
        backgroundColor: bgOpacity ? `color-mix(in srgb, var(--${background}) ${bgOpacity}%, transparent)` : null, 
        maxWidth: maxWidth, 
        minWidth: minWidth,
        maxHeight: maxHeight,
        minHeight: minHeight
    };

    const filteredInLineStyles = Object.fromEntries(
        Object.entries(inLineStyles).filter(([_, value]) => value != null)
    );

    if (display) return (
        <div 
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
            style={Object.keys(filteredInLineStyles).length > 0 ? filteredInLineStyles : undefined}
        >
            {children}
        </div>
    );
}




