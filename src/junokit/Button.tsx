import React from "react";
import Icon from "./Icon";
import Loader from "./Loader";
import { IconNameType } from "./iconMap";

export type ButtonStateType = "default" | "disabled" | "loading" | "active";

type ButtonProps = {
  width?: "auto" | "1/2" | "full";
  text?: string;
  state?: ButtonStateType;
  color?:
    | "current"
    | "base-200"
    | "base-700"
    | "primary"
    | "accent"
    | "warning"
    | "info"
    | "success"
    | "error"
    | string;
  style?: "filled" | "outlined" | "ghost" | "link" | "light";
  size?: "small" | "medium" | "large";
  leftIcon?: IconNameType;
  rightIcon?: IconNameType;
  marginTop?: "4px" | "6px" | "8px" | "12px" | "16px" | "24px" | "32px";
  hideOnMobile?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  attributes?: Record<string, unknown>;
  listeners?: Record<string, unknown>;
};

export default function Button({
  leftIcon,
  rightIcon,
  text = "Button",

  color = "current",
  style = "light",

  size = "medium",
  width = "auto",

  marginTop,
  state = "default",
  onClick = () => {},
  hideOnMobile = false,
  attributes,
  listeners,
}: ButtonProps) {
  const isDisabled = state == "disabled";
  const isLoading = state == "loading";
  const isActive = state == "active";

  // bg-current

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
      ? "bg-current-5 hover:bg-current-10"
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
  const linkStatusStyles = !(isDisabled || isLoading || isActive) ? `hover:underline opacity-80 hover:opacity-100` : "";
  const linkStyle = `text-${color} ${linkStatusStyles}`;

  const fontStyles = `font-medium`;

  const styleMap = {
    filled: filledStyle,
    outlined: outlinedStyle,
    ghost: ghostStyle,
    link: linkStyle,
    light: lightStyle,
  };
  const typeStyles = styleMap[style];

  let sizeStyles = `h-9 px-2.5 gap-2 text-sm`; // default size
  sizeStyles =
    size == "small" ? `h-7 px-1.5 gap-1 text-xs` : size == "large" ? `h-12 px-3 gap-2.5 text-base` : sizeStyles;

  const widthStyle = width == "auto" ? `w-auto` : `w-${width}`;
  const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md";

  const classes = `${hideOnMobile ? "hidden md:flex" : ""}
        relative flex flex-row items-center transition-all duration-75 box-border cursor-pointer justify-between
        ${fontStyles} ${typeStyles} ${sizeStyles} ${cornerStyles} ${widthStyle}
        ${isDisabled ? "opacity-50 saturate-50 !cursor-not-allowed" : ""}`;

  const iconSize = size == "small" ? "16px" : size == "large" ? "24px" : "20px";
  const iconWidth = size == "small" ? "w-4 h-4" : size == "large" ? "w-6 h-6" : "w-5 h-5";
  const LeftIconComponent = leftIcon ? (
    <Icon icon={leftIcon} size={iconSize} className={`scale-90 ${iconWidth}`} />
  ) : null;
  const RightIconComponent = rightIcon ? (
    <Icon icon={rightIcon} size={iconSize} className={`scale-[0.8] ${iconWidth}`} />
  ) : null;

  const loaderColor = "current";

  // 'mt-0.5', 'mt-1', 'mt-1.5', 'mt-2', 'mt-3', 'mt-4', 'mt-6', 'mt-8', 'mt-12', 'mt-16',
  // mt-[1px] mt-[2px] mt-[6px] mt-[8px] mt-[12px] mt-[16px] mt-[24px] mt-[32px] mt-[40px] mt-[48px] mt-[56px] mt-[64px]
  // bg-base-200/20 bg-base-700/20 bg-base-content/20 bg-current-20 bg-accent/20 bg-primary/20 bg-info/20 bg-error/20 bg-warning/20 bg-success/20
  // ring-current

  return (
    <button
      type="button"
      className={classes}
      {...attributes}
      {...listeners}
      style={{ marginTop: marginTop }}
      onClick={(e) => !isDisabled && onClick(e)}
    >
      <div className={`flex flex-row items-center justify-end flex-grow ${isLoading ? "invisible" : ""}`}>
        {LeftIconComponent}
      </div>
      <div className="flex-shrink-0 max-w-full box-border">
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
        <span
          className={`${isLoading ? "opacity-0" : ""} flex flex-row items-center gap-2 whitespace-nowrap
             ${color == "current" && style == "filled" ? "text-base-0 mix-blend-difference" : ""}
             truncate max-w-full`}
        >
          {text}
        </span>
      </div>
      <div className={`flex flex-row items-center justify-end flex-grow ${isLoading && "invisible"}`}>
        {RightIconComponent}
      </div>
    </button>
  );
}
