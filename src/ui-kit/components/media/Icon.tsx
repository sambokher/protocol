import React, { useRef } from "react";
import { getIconComponent, IconType, LibraryType, allIconNames } from "../iconMap";

// most probably Color and Size should be shared among multiple components
type Color =
    | "base-100"
    | "base-200"
    | "base-300"
    | "primary"
    | "accent"
    | "base-content"
    | "info"
    | "warning"
    | "success"
    | "error"
    | "auto"  // last two are for backwards-compatibility
    | "none"; // to be refactored away

type Size = "auto" | "12px" | "16px" | "20px" | "24px" | "32px";


// TODO. Ideally we'd better remove 'none' from here, but it's in templates all over the places?
type Props = {
    icon?: IconType;
    library?: LibraryType;
    color?: Color;
    size?: Size;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    __juno?: any; // FIXME: router to export __juno type
};


const iconNoirSizeMap = {
    '12px': 'w-3 h-3',
    '16px': 'w-4 h-4',
    '20px': 'w-5 h-5',
    '24px': 'w-6 h-6',
    '32px': 'w-8 h-8',
}

/**
 * Icon
 * Make sure you have a proper icon library (react-icons or iconoir) installed
 */
export default function Icon({
    icon = 'circle',
    library = 'iconoir',
    color = 'none',
    size = "auto",
    className,
    onClick,
    __juno = {},
}: Props) {

    const ref = useRef(null);    
    const globalIconSet = 'iconoir' // ref?.current ? getComputedStyle(ref.current).getPropertyValue('--iconset').trim() : 'iconoir'
    const libraryToUse = (library || globalIconSet) as  LibraryType;

    if (!icon) return null;
    
    const IconComponent = getIconComponent(icon, libraryToUse);
    if (!IconComponent) return null;

    const classes = color ? `text-${color}` : "";

    const iconSize = size === "auto" ? `1.5em` : size;
    
    return (
        <div
            className={`${classes} ${__juno?.outlineStyle}`}
            onClick={onClick}
            {...__juno?.attributes}
        >
        <div className='absolute w-0 h-0 invisible' ref={ref} />
            <IconComponent size={iconSize} color={color} className={`${className} ${iconNoirSizeMap[size]} `} />
        </div>
    );
}

