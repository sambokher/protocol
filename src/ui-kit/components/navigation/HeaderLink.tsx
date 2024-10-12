import React, { useEffect, useState } from 'react';
import { Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

type HeaderLinkProps = {
    text?: string,
    fontWeight?: 'auto' | 'light' | 'normal' | 'medium' | 'semibold',
    leftIcon?: Extract<IconType, 'chevron-down' | 'plus'>;
    rightIcon?: Extract<IconType, 'chevron-down' | 'plus'>;
    size?: 'small' | 'medium' | 'large',
    width?: 'auto' | 'full',
    dropdownBgColor?: 'base-0' | 'base-100' | 'base-200' | 'none',
    background?: 'base-0' | 'base-100' | 'base-200' | 'primary' | 'accent' | 'base-900' | string,
    showDropdown?: boolean,
    onClick?: () => void,
    defaultIconSet?: string,
    children?: React.ReactNode,
    openDirection?: 'downward-right' | 'downward-left',
    // openBehavior?: 'onHover' | 'onClick',

    __juno?: any
}

export default function HeaderLink({
        text = 'Item',
        fontWeight = 'medium',
        leftIcon,
        rightIcon = null,
        size = 'medium',
        width = 'auto',
        dropdownBgColor = 'base-0',
        background = null,
        showDropdown = false,
        onClick = () => {},
        children,
        openDirection = 'downward-right',
        __juno = {}

        // openBehavior = 'onClick', // Commented until hover is also implemented
      }: HeaderLinkProps) {

    const fontWeightStyles = fontWeight ? `font-${fontWeight}` : '';
    const sizeStyles = size == 'small' ? `py-1 px-1.5 gap-1.5 text-xs` : `py-1.5 px-3 gap-2 text-sm`;
    const widthStyle = width == 'full' ? `w-full self-stretch` : `w-${width}`
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    const borderStyles = `border border-transparent`
    const bgStyles = (!background || background == 'none') ? '' : `bg-${background} transition-all hover:brightness-95` 
    const fontColor = (!background || background == 'none') ? 'text-inherit' : background?.startsWith('base') ? 'text-base-content' : `text-${background}-content`;

    let linkClasses = `flex flex-row items-center justify-between relative cursor-default ${widthStyle} ${fontWeightStyles} ${sizeStyles} ${bgStyles} ${cornerStyles} ${fontColor} ${borderStyles}`
    
    const iconStrokeWidth = fontWeight === 'light' ? 1 : (fontWeight === 'medium' || fontWeight === 'semibold') ? 2 : 1.5
    const iconWidth = size == 'small' ? 'w-4' : size == 'large' ? 'w-6' : 'w-5'
    
    const LeftIcon = leftIcon ? <Icon icon={leftIcon}  className={`flex-shrink-0 scale-90 ${iconWidth}`}/> : null;
    const RightIcon = rightIcon ? <Icon icon={rightIcon}  className={`flex-shrink-0 opacity-60 scale-[0.8]`} /> : null;
    
    const shadowStyles = size == 'small' ? 'shadow-sm' : 'shadow'
    const dropdownSizeStyles = size == 'small' ? 'py-1.5 px-1.5 rounded-md gap-1' : 'p-2 rounded-lg gap-1.5'
    const dropwdownClasses = `absolute -bottom-2 left-1/2 -translate-x-1/2 text-base-content translate-y-full border flex flex-col min-w-full bg-${dropdownBgColor} ${dropdownSizeStyles} ${shadowStyles}` 
    
    const [ open, setOpen ] = useState(showDropdown)
    useEffect(() => {
        setOpen(showDropdown);
    }, [showDropdown]);

    const classes = `relative flex-shrink-0 flex items-center justify-center`

    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        onClick={() => children ? setOpen(!open) : onClick()}
            >
            <div className={linkClasses}>
                {LeftIcon}
                <div className='flex-grow w-full'>
                    {text}
                </div>
                {RightIcon}
            </div>
            {open && <div className={dropwdownClasses} 
            style={{ minWidth: size == 'small' ? 120 : 180, minHeight: size == 'small' ? 28 : 36}}>
                    {children}
            </div>}
        </div>
    );
}


