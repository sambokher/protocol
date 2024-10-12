import React from 'react';
import { spacingMap } from '../helpers';

type FooterProps = {
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',

    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | string,
    hasBorder?: boolean,
    
    alignItems?: 'start' | 'end' | 'center' | 'stretch',
    fontSize?: 'sm' | 'base' | 'md' | 'lg',
    minHeight?: number,
    width?: 'stretch' | '780px' | '960px' | '1200px' | '1440px',
    children?: React.ReactNode,
    __juno?: any,
}

export default function Footer({
        paddingX = null,
        paddingY = null,
        gap = null, 

        background = null,
        hasBorder = false,
        
        alignItems = 'stretch',
        fontSize = 'base',
        minHeight = null,
        width = 'stretch',
        children,
        __juno = {}
      }: FooterProps) {

    const bgStyles = background ? `bg-${background}` : '';
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content') ? 'text-base-content' : `text-base-0`
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    const borderStyles = hasBorder ? 'border-t border-current-10' : '';
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const heightStyles = minHeight ? `min-h-[${minHeight}px]` : '';
    const fontSizeStyles = `text-${fontSize}`;

    const outerClasses = `w-full flex flex-col items-center relative ${bgStyles} ${borderStyles}`
    const innerClasses = `flex flex-col justify-between w-full min-h-[60px] mx-auto border-box ${fontSizeStyles} ${paddingStyles} ${gapStyles} ${heightStyles} ${alignItemsStyles} ${fontColor}` 



    return (
        <div 
        className={`${outerClasses} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        >
            <div 
            className={`${innerClasses} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            style={{maxWidth: width != 'stretch' ? width : '100%'}}>
            {children}
            </div>
        </div>
    );
}


