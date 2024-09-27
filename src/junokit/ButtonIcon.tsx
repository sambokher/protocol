import React from "react";
import Icon from "./Icon";
import Loader from "./Loader";
import { IconNameType } from "./iconMap";

type ButtonIconProps = {
  icon?: IconNameType;
  color?: string;
  style?: "filled" | "outlined" | "ghost" | "link" | "light";
  state?: "default" | "disabled" | "loading" | "active";
  size?: "small" | "medium" | "large";
  rightIcon?: IconNameType;
  marginTop?: "4px" | "6px" | "8px" | "12px" | "16px" | "24px" | "32px";
  alignSelf?: "auto" | "start" | "end" | "center";
  hideOnMobile?: boolean;
  isPill?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  attributes?: Record<string, unknown>;
  listeners?: Record<string, unknown>;
};

export default function ButtonIcon({
  icon = "heart",
  color = "current",
  style = "light",
  state = "default",
  size = "medium",
  isPill = false,
  onClick = () => {},
  marginTop,
  alignSelf = "auto",
  hideOnMobile = false,
  attributes,
  listeners,
}: ButtonIconProps) {
  const buttonStyles = `flex flex-row items-center relative transition-all flex-shrink-0 flex-grow-0 box-border`;

  const isDisabled = state == "disabled";
  const isLoading = state == "loading";
  const isActive = state == "active";

  /* Filled */
  const textColor = color == "current" ? "current" : color == "base-200" ? "base-content" : "base-0";
  const statusStyles =
    isDisabled || isLoading || color == "current"
      ? ""
      : isActive
        ? "brightness-90"
        : "hover:brightness-110 active:brightness-90";
  const bgStyles = color == "current" ? "bg-current" : `bg-${color}`;
  const filledStyle = `${bgStyles} text-${textColor} ${statusStyles} `;

  /* Outlined */
  const outlineStatusStyles =
    isDisabled || isLoading ? "" : isActive ? "bg-current-10" : "hover:bg-current-10 active:bg-transparent";
  const outlinedStyle = `ring-1 ring-inset ring-${color} text-${color} ${outlineStatusStyles}`;

  /* Light */
  const lightColor =
    color == "current"
      ? "bg-current-10"
      : color == "base-200"
        ? "bg-base-100"
        : color == "base-700"
          ? "bg-base-500"
          : "bg-" + color + "-surface";
  const lightTextColor = color == "base-700" ? "base-0" : color == "base-200" ? "base-content" : color + "-content";
  const lightStatusStyles =
    isDisabled || isLoading ? "" : isActive ? `bg-${lightColor}/75` : `hover:bg-${lightColor}/75`;
  const lightStyle = `text-${lightTextColor} ${lightColor}  ${lightStatusStyles}`;

  /* Ghost */
  const ghostStatusStyles = isDisabled || isLoading ? "" : isActive ? `bg-current-10` : `hover:bg-current-10`;
  const ghostStyle = `text-${color} ${ghostStatusStyles}`;

  /* Link */
  const linkStatusStyles = !(isDisabled || isLoading || isActive) ? `opacity-80 hover:opacity-100` : "";
  const linkStyle = `text-${color} ${linkStatusStyles}`;

  const styleMap = {
    filled: filledStyle,
    outlined: outlinedStyle,
    ghost: ghostStyle,
    light: lightStyle,
    link: linkStyle,
  };

  const typeStyles = styleMap[style];

  const selfAlign = `self-${alignSelf}`;
  const sizeStyles = size == "small" ? `h-7 w-7 text-xs` : size == "large" ? `w-12 h-12 text-base` : `h-9 w-9 text-sm`;

  const cornerStyles = `${isPill ? `rounded-full` : size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"}`;
  const marginStyles = !marginTop ? "" : `mt-${marginTop}`;

  const classes = `${hideOnMobile ? "hidden md:flex " : "flex"}
        items-center justify-center
        ${buttonStyles} ${typeStyles} ${sizeStyles} ${cornerStyles} ${selfAlign} ${marginStyles} cursor-pointer
        ${isDisabled ? "opacity-50 saturate-50 !cursor-default" : ""}`;

  const iconSize = size == "small" ? "16px" : size == "large" ? "24px" : "20px";
  const iconWidth = size == "small" ? "w-4 h-4" : size == "large" ? "w-6 h-6" : "w-5 h-5";
  const IconComponent = icon ? (
    <Icon icon={icon} size={iconSize} className={`hover:scale-105 transition-all duration-75 ${iconWidth}`} />
  ) : null;
  const PlaceHolderIcon = (
    <Icon icon={"heart"} size={iconSize} className={`${iconWidth} hover:scale-110 transition-all duration-150`} />
  );
  const loaderColor = "current";

  return (
    <button {...attributes} {...listeners} 
    onClick={state == "disabled" ? () => {} : onClick} className={classes} style={{ marginTop: marginTop }}>
      <div
        className={`${isLoading && "invisible"} ${color == "current" && style == "filled" ? "text-base-0 mix-blend-difference" : ""}`}
      >
        {IconComponent ? IconComponent : PlaceHolderIcon}
      </div>
      {isLoading && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
            ${color == "current" && style == "filled" ? "text-base-0 mix-blend-difference" : ""}`}
        >
          <Loader
            size={size == "small" ? "12px" : "16px"}
            color={loaderColor}
            type="spinner"
            opacity={style == "filled" ? "50" : "100"}
          />
        </div>
      )}
    </button>
  );
}
