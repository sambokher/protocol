import React from 'react';
import { spacingMap } from '../helpers';

type FeaturePanelProps = {
    paddingX?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    paddingY?: '6px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px',
    gap?: '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | '32px' | '48px',

    background?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'primary' | 'accent' | 'base-content' | string,
    backgroundImageSrc?: string,
    
    alignItems?: 'start' | 'center' | 'end' | 'stretch',
    justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly',
    display?: boolean,
    textSize?: 'sm' | 'base' | 'md' | 'lg' | 'xl',
    position?: 'left' | 'right',
    children?: React.ReactNode,
    __juno?: any,
}

export default function FeaturePanel({
        paddingX = null,
        paddingY = null,
        gap = null,

        background = null, 
        
        alignItems = 'stretch',
        justifyContent = 'start',
        display = true,
        textSize = 'base',
        position = 'left',
        backgroundImageSrc = null,
        children,
        __juno = {}
      }: FeaturePanelProps) {

    const bgStyles = background ? `bg-${background}` : '';
    const fontColor = (!background || background == 'none') ? '' : (background?.startsWith('base') && background != 'base-content') ? 'text-base-content' : `text-base-0`
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    const fontSize = `text-`+textSize
    const alignItemsStyles = `items-${alignItems}`
    const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : '';

    const classes = `flex flex-col flex-grow w-full ${bgStyles} ${justifyContentStyles} ${paddingStyles} ${gapStyles} ${fontColor} ${fontSize} ${alignItemsStyles}`

    const noImage = !backgroundImageSrc;
    const imageStyles = { 
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${backgroundImageSrc}) no-repeat center center / cover`
    };
    
    if (display) return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{...noImage ? {} :  imageStyles, 
        order: position == 'left' ? '-1' : 1, 
        }}
        >
        {children}
        </div>
    );
}


