import React from 'react';
import { spacingMap } from '../helpers'; 

type MainProps = {
    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'primary' | 'accent' | 'base-content' | string,
    width?: 'stretch' | '780' | '960' | '1200' | '1440',
    direction?: 'flex-col' | 'flex-row',
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',
    marginX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    marginY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    corners?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl',
    selfAlign?: 'start' | 'center' | 'end',
    alignItems?: 'start' | 'center' | 'end' | 'stretch',
    hasOutline?: boolean,
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly',
    textSize?: 'sm' | 'base' | 'md',
    children?: React.ReactNode,
    __juno?: any,
}

function Main({
        background,
        direction = 'flex-col',

        marginX,
        marginY,
        paddingX,
        paddingY,
        gap,
        
        alignItems = 'start',
        justifyContent = 'start',
        textSize = 'base',
        width = '960',
        hasOutline = false,
        selfAlign = 'center',
        corners = 'none',
        children,
        __juno = {}
      }: MainProps) {

    const bgStyles = background ?`bg-${background}` : '';
    
    const marginStyles = `${marginX ? ` px-${spacingMap[marginX]}` : ''}${marginY ? ` py-${spacingMap[marginY]}` : ''}`;
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    
    const fontSize = `text-`+textSize
    const alignItemsStyles = alignItems ? `items-${alignItems}` : '';
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';
    
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content' && background != 'base-700') ? 'text-base-content' : `text-base-0`
    const alignMain = `items-${selfAlign}`
    const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const ringStyles = hasOutline ? 'ring-1 ring-inset ring-current-10' : '';
    
    
    const outerClasses = `flex flex-col flex-grow w-full relative ${alignMain} ${fontColor} ${fontSize} ${marginStyles}`
    const innerClasses = `flex ${direction} flex-grow w-full z-0 relative ${ringStyles} ${bgStyles} ${paddingStyles} ${gapStyles} ${alignItemsStyles} ${justifyContentStyles} ${cornerStyles}`
    
    return (
        <div 
        className={`${outerClasses} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        // style={{ minHeight: '100%', }}
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

Main.__juno_name = "Main";
export default Main;


