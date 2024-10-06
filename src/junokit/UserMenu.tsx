import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Icon from "./Icon";
import { IconNameType } from "./iconMap";

type UserMenuProps = {
  size?: "medium" | "small" | "large";
  width?: "auto" | "full";
  color?: "base-0" | "base-100" | "base-200" | "primary" | "accent";
  name?: string;
  avatarPosition?: "left" | "right";
  avatarType?: "image" | "initials";
  imageSrc?: string;
  icon?: Extract<IconNameType, "chevron-right" | "chevron-down" | "chevron-left" | "arrow-up-down">;
  isCollapsed?: boolean;
  tooltip?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  attributes?: React.HTMLAttributes<HTMLDivElement>;
  listeners?: React.DOMAttributes<HTMLDivElement>;
};

export default function UserMenu({
  size = "medium",
  width = "auto",
  color = "accent",
  name = "JD",
  avatarPosition = "left",
  avatarType = "initials",
  imageSrc,
  icon,
  isCollapsed,
  isActive,
  onClick,
  children,
  attributes,
  listeners,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeStylesMap = {
    small: `p-px md:py-1.5 md:px-1.5 text-xs`,
    medium: `p-0.5 md:py-2 md:px-2.5 text-sm`,
    large: `p-1 md:py-2.5 md:px-3.5 text-base`,
  };

  const gapStyles = isCollapsed ? "gap-0" : size == "small" ? "gap-1.5" : size == "large" ? "gap-2.5" : "gap-2";
  const imageSize = size == "small" ? "24px" : size == "large" ? "32px" : "28px";
  const bgStyles = isActive || isOpen ? "bg-current-5" : "md:hover:bg-current-5";
  const cornerStyles = isCollapsed
    ? "rounded-full"
    : size == "small"
      ? "rounded"
      : size == "large"
        ? "rounded-lg"
        : "rounded-md";
  const widthStyles = isCollapsed ? "w-auto" : `w-${width}`;

  const classes = `relative flex gap-1 ${widthStyles} ${sizeStylesMap[size]} ${cornerStyles} ${bgStyles} items-center justify-between cursor-default transition-all duration-500 group`;

  const IconComponent = icon ? (
    <Icon
      icon={icon}
      className="scale-75 opacity-0 md:group-hover:opacity-100 md:hover:scale-90 transition-all cursor-pointer"
    />
  ) : null;

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (onClick) onClick();
  }

  return (
    <div className={classes} {...attributes} {...listeners} onClick={handleClick} ref={dropdownRef}>
      <div className={`${gapStyles} flex items-center`} style={{ order: avatarPosition == "left" ? -2 : 2 }}>
        <Avatar
          initials={name.toUpperCase()}
          bgColor={color}
          imageSrc={imageSrc}
          size={imageSize}
          type={avatarType}
          hoverEffect={false}
        />
      </div>

      {isOpen && children && (
        <div
          className={`absolute -bottom-1 translate-y-full right-0 bg-base-0 shadow-md p-1 border-[0.5px] border-base-200 rounded-md z-10
        flex flex-col items-stretch min-w-full transition-all duration-150`}
        style={{animation: 'fadeInDown 100ms ease-in-out'}}
        >
          {children}
        </div>
      )}

      {icon && IconComponent}
    </div>
  );
}
