import React from 'react';
import { spacingMap } from '../helpers';

type HeaderProps = {
    width?: 'stretch' | '780' | '960' | '1200' | '1440',
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    background?: 'base-0' | 'base-100' | 'base-200' | 'base-700' | 'base-content' | string,
    hasBorder?: boolean,
    alignItems?: 'start' | 'end' | 'center' | 'stretch',
    justifyContent?: 'start' | 'center' | 'end' | 'between',
    fontSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl',
    minHeight?: number,
    children?: React.ReactNode,

    __juno?: any,
}

function Header({
        width = 'stretch',
        
        paddingX,
        paddingY,
        gap,

        background,
        hasBorder = false,
        
        alignItems = 'center',
        justifyContent = 'between',
        fontSize = 'base',
        minHeight,
        children,

        __juno = {}
      }: HeaderProps) {
    
    const bgStyles = background ?`bg-${background}` : '';
    // font color function needs to be more robust and isolated
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content' && background != 'base-700') ? 'text-base-content' : `text-base-0`
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    const heightStyles = minHeight ? `min-h-[${minHeight}px]` : ''
    const borderStyles = hasBorder ? "border-b border-current-10" : "";
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const fontSizeStyles = `text-${fontSize}`;
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    
    
    const innerClasses = `relative flex flex-row min-h-[60px] w-full border-box ${fontSizeStyles} ${fontColor} ${paddingStyles} ${heightStyles} ${gapStyles} ${alignItemsStyles} ${justifyContentStyles}`

    const outerClasses = `w-full flex flex-col items-center ${bgStyles} ${borderStyles} relative backrop-blur`;

    return (
        <div 
        className={`${outerClasses} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        >
            <div 
            className={`${innerClasses} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            data-tag={__juno?.attributes?.['data-tag']}   
            
            style={{width: '100%', maxWidth: width != 'stretch' ? `${width}px` : '100%'}}>
                {children}
                </div>
        </div>
    );
}

Header.__juno_name = "Header";
export default Header;


