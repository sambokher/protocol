import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from '..';
import { IconType, allIconNames } from '../iconMap';

type SidebarLinkProps = {
    text?: string,
    fontWeight?: 'auto' | 'light' | 'normal' | 'medium' | 'semibold',
    leftIcon?: IconType,
    size?: 'small' | 'medium' | 'large',
    width?: 'auto' | 'full',
    displayChildren?: boolean,
    indentLevel?: '0' | '1' | '2',
    color?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'primary' | 'accent' | 'none',
    isCollapsed?: boolean,
    isActive?: boolean,
    usePadding?: boolean,
    hoverEffect?: boolean,
    onClick?: () => void,
    children?: React.ReactNode,
    __juno?: any
}

export default function SidebarLink({
        text = 'Item',
        fontWeight = 'auto',
        leftIcon,
        size = 'medium',
        displayChildren = true,
        width = 'full',
        indentLevel = '0',
        color = 'none',
        isCollapsed = false,
        isActive = false,
        usePadding = true,
        hoverEffect = false,
        onClick = () => {},
        children,
        __juno = {}
      }: SidebarLinkProps) {

    const fontWeightStyles = fontWeight == 'auto' ? 'font-normal' : `font-${fontWeight}`
    
    const sizeStylesMap = {
        small: usePadding ? `px-2 py-1 text-xs` : `py-1 px-0 text-xs`,
        medium: usePadding ? `px-3 py-1.5 text-sm` : `py-1.5 px-0 text-sm`,
        large: usePadding ? `px-4 py-2.5 text-base` : `py-2.5 px-0 text-base`
    }

    const gapStyles = isCollapsed ? 'gap-0' : size == 'small' ? 'gap-2' : size == 'large' ? 'gap-3' : 'gap-2.5' // was 3 for medium
    
    const sizeStyles = sizeStylesMap[size] || sizeStylesMap['medium']

    const widthStyle = (width == 'auto' || isCollapsed) ? `w-auto` : `w-${width} self-stretch`
    
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    const borderStyles = `border border-transparent`
    
    const innerGap = size == 'small' ? 'gap-0' : size == 'large' ? 'gap-1.5' : 'gap-1'
    const classes = `transition-all duration-75 relative group flex flex-col duration-75 ${widthStyle} ${fontWeightStyles} ${innerGap}`

    const hoverStyles = 
    hoverEffect ? isActive ? 'bg-current-10' : 'hover:bg-current-10'
    : isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100' 
    

    let innerClasses = `transition-all relative flex flex-row items-center justify-between cursor-default duration-75 select-none
        ${hoverStyles} w-full ${sizeStyles} ${cornerStyles} ${borderStyles} ${gapStyles}` 

    const iconWidth = size == 'small' ? 'w-4' : size == 'large' ? 'w-6' : 'w-5'
    const IndentElement = <><div className={`flex-shrink-0 ${iconWidth}`}/></>
    const indentValue = parseInt(indentLevel) || 0

    const LeftIconComponent = leftIcon ? <Icon icon={leftIcon} className={`flex-shrink-0  ${iconWidth}`} /> : null;

    const [isOpen, setIsOpen] = useState(displayChildren)
    useEffect(() => {
        setIsOpen(displayChildren)
    }, [displayChildren])
    
    
    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`} 
            {...__juno?.attributes}
        >
        <div
            className={innerClasses}
            onClick={onClick}
            style={{
                color: color != 'none' && `var(--${color})`,
                }}>
            {!isCollapsed && Array(indentValue)?.fill(null)?.map((_, index) => (
            <React.Fragment key={index}>{IndentElement}</React.Fragment>
            ))}
            {LeftIconComponent}

            
            
            <div className={`flex flex-row flex-grow justify-between ${gapStyles} transition-all duration-0 ${isCollapsed ? 'w-0 h-0 pointer-events-none opacity-0' : 'w-auto'}`}>
                {text}
                {children ?
                        <Icon icon={'chevron-down'} 
                        onClick={()=>setIsOpen(!isOpen)}
                        className={`flex-shrink-0 text-xs my-auto transition-all ${isCollapsed ? 'opacity-0' : 'opacity-0 group-hover:opacity-60'} transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                        />
                : null
                }
            </div>
            {isCollapsed && text != '' &&
                <Tooltip 
                    direction='right' // up, down, left, right // need to add a prop
                    size={size == 'small' ? 'small' : 'medium'} 
                    bgColor='base-content' 
                    text={text} 
                    />
            }
        </div>
        {isOpen && !isCollapsed && children &&
        <div className={`${isOpen ? 'h-auto' : 'h-0'} w-full flex flex-col ${innerGap} transition-all`}>
        {children}
        </div>}
        </div>
    );
}



