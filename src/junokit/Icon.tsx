import React from "react";
import * as IconoirIcons from "iconoir-react";

import { getIconName, IconNameType } from "./iconMap";

type IconProps = {
  icon?: IconNameType;
  color?: string;
  size?: "auto" | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  attributes?: React.HTMLAttributes<HTMLDivElement>;
  listeners?: React.DOMAttributes<HTMLDivElement>;
};

export default function Icon({
  icon = "add",
  color,
  size = "auto",
  className = "",
  onClick,

  attributes,
  listeners,
}: IconProps) {
  const colorStyles = color == "auto" || color == "none" || !color ? "" : `text-${color}`;
  const wrapperClasses = `${colorStyles}`;

  const mappedIconName = getIconName(icon, "iconoir");

  const IconComponent = IconoirIcons[mappedIconName] || null;

  const sizeInt = parseInt(size, 10);

  if (!IconComponent) return null;
  const iconSize = size == "auto" ? `1.5em` : sizeInt;
  return (
    <div className={wrapperClasses} {...attributes} {...listeners} onClick={onClick}>
      <div className="absolute w-0 h-0 invisible" />
      <IconComponent size={iconSize} color={color} className={className} />
    </div>
  );
}
