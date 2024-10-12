import React from 'react';
import { spacingMap } from '../helpers';

type HeroProps = {
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',

    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-700' | 'base-content' | string,
    hasBorder?: boolean,
    
    alignItems?: 'start' | 'end' | 'center' | 'stretch',
    flexDirection?: 'flex-col' | 'flex-row',
    fontSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl',
    bgImageSrc?: string,
    bgOverlay?: 'none' | 'darker' | 'white',
    height?: number,
    justifyContent?: 'start' | 'center' | 'end' | 'between',
    width?: 'stretch' | '780px' | '960px' | '1200px' | '1440px',
    children?: React.ReactNode,
    __juno?: any,
}

export default function Hero({
        paddingX = null,
        paddingY = null,
        gap = null, 

        background = null,

        hasBorder = false,
        
        alignItems = 'center',
        flexDirection = 'flex-col',
        fontSize = 'base',
        bgImageSrc = null,
        bgOverlay = 'darker',
        height = 320,
        justifyContent = 'between',
        width = 'stretch',
        children,
        __juno = {}
      }: HeroProps) {

    const bgStyles = background ?`bg-${background}` : '';
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content' && background != 'base-700') ? 'text-base-content' : `text-base-0`
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    
    const heightStyles = height ? `h-[${height}px]` : ''
    const borderStyles = hasBorder ? 'border-b border-current-10' : '';
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const fontSizeStyles = `text-${fontSize}`;
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    

    const innerClasses = `flex w-full border-box flex-grow flex-shrink-0
        ${flexDirection}
        ${fontSizeStyles}
        ${fontColor}
        ${paddingStyles}
        ${heightStyles}
        ${gapStyles} 
        ${alignItemsStyles}
        ${justifyContentStyles}`

    const outerClasses = `w-full flex flex-col items-center ${bgStyles} ${borderStyles} relative`
    const noImage = !bgImageSrc;

    return (
        <div 
        className={`${outerClasses} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        style={noImage ? {} : getImageStyles(bgOverlay, bgImageSrc)}>
            <div className={`${innerClasses} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            style={{maxWidth: width != 'stretch' ? width : '100%'}}>
                {children}
            </div>
        </div>
    );
}

function getImageStyles(bgOverlay, bgImageSrc) {
    switch (bgOverlay) {
        case 'darker':
            return {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${bgImageSrc})`,
                backgroundSize: 'cover'
            };
        case 'white':
            return {
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5)), url(${bgImageSrc})`,
                backgroundSize: 'cover'
            };
        default:
            return {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${bgImageSrc})`,
                backgroundSize: 'cover'
            };
    }
}



