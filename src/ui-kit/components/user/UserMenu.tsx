import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Icon, Tooltip } from '../'
import { IconType } from '../iconMap';

type UserMenuProps = {
    size?: 'medium' | 'small' | 'large',
    width?: 'auto' | 'full',
    color?: 'base-0' | 'base-100' | 'base-200' | 'primary' | 'accent',
    name?: string,
    avatarPosition?: 'left' | 'right',
    avatarType?: 'image' | 'initials',
    imageSrc?: string,
    icon?: Extract<IconType, 'chevron-right' | 'chevron-down' | 'chevron-left' | 'arrows-up-down'>;
    isCollapsed?: boolean,
    tooltip?: boolean,
    isActive?: boolean,
    onClick?: () => void,
    children?: React.ReactNode,
    __juno?: any
}

export default function UserMenu({
        size = 'medium',
        width = 'auto',
        color = 'accent',
        name = 'JD',
        avatarPosition = 'left',
        avatarType = 'initials',
        imageSrc = null,
        icon = null,
        isCollapsed,
        tooltip=true,
        isActive,
        onClick,
        children, 
        __juno = {}
      }: UserMenuProps) {

    const [isOpen, setIsOpen] = useState(false)

    const sizeStylesMap = {
        small: `py-1.5 px-1.5 text-xs`,
        medium: `py-2 px-2.5 text-sm`,
        large: `py-2.5 px-3.5 text-base`
    }
    const borderStyles = `border border-transparent`
    const gapStyles = isCollapsed ? 'gap-0' : size == 'small' ? 'gap-1.5' : size == 'large' ? 'gap-2.5' : 'gap-2'
    const imageSize = size == 'small' ? '20px' : size == 'large' ? '28px' : '24px'
    const bgStyles = (isActive || isOpen) ? 'juno-current-color-bg' : 'juno-current-color-hover-bg'
    const cornerStyles = isCollapsed ? 'rounded-full' : size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    const widthStyles = isCollapsed ? 'w-auto' : `w-${width}`

    const classes = `relative flex gap-1 ${widthStyles} ${sizeStylesMap[size]} ${cornerStyles} ${bgStyles} ${borderStyles} items-center justify-between cursor-default transition-all duration-500 group`

    const IconComponent = icon ? <Icon icon={icon} className='scale-75 opacity-0 group-hover:opacity-100 hover:scale-90 transition-all cursor-pointer' /> : null;


    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownRef])

    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
            onClick={(e) => {e.stopPropagation(); setIsOpen(!isOpen)}}
        >
        <div className={`${gapStyles} flex items-center`}
        style={{order: avatarPosition == 'left' ? -2 : 2}}
        >
        <Avatar 
            initials={name}
            bgColor={color}
            imageSrc={imageSrc}
            size={imageSize} 
            type={avatarType}
            hoverEffect={false}
            
            />
            {<div className={`${isCollapsed ? 'w-0 opacity-0' : `w-auto ${isActive ? 'opacity-100' : 'opacity-80'}`} 
                transition-all whitespace-nowrap truncate text-ellipsis  select-none
                ${size == 'small' ? 'text-xs' : 'text-sm'} font-medium `}
                style={{order: avatarPosition == 'left' ? 2: -2}}
                >
            {name}
            </div>}
        </div>

        {isOpen && children &&
        <div 
        ref={dropdownRef}
        className={`absolute -bottom-1 translate-y-full right-0 bg-base-0 shadow-md p-1.5 border-[0.5px] border-base-200 rounded-md z-10
        flex flex-col items-stretch w-full animate-fadeInDown transition-all duration-150`}
        >
            {children}
        </div>}

        {!isCollapsed && icon && IconComponent}
        {isCollapsed && name != '' && tooltip &&
                <Tooltip
                    direction={avatarPosition == 'right' ? 'left' : 'right'}
                    size={size == 'small' ? 'small' : 'medium'} 
                    bgColor='base-content' 
                    text={name} 
                    />
            }
    </div>
 )
}


