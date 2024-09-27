import React from "react";
import { spacingMap } from "./helpers";

type HeaderProps = {
  width?: "stretch" | "780" | "960" | "1200" | "1440";
  paddingX?: "6px" | "8px" | "12px" | "16px" | "24px" | "32px" | "48px" | "64px";
  paddingY?: "6px" | "8px" | "12px" | "16px" | "24px" | "32px" | "48px" | "64px";
  gap?: "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px" | "32px" | "48px";
  background?: string;
  hasBorder?: boolean;
  alignItems?: "start" | "end" | "center" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between";
  fontSize?: "xs" | "sm" | "base" | "md" | "lg" | "xl";
  minHeight?: number;
  children?: React.ReactNode;
  attributes?: object;
  listeners?: object;
};

function Header({
  width = "stretch",

  paddingX,
  paddingY,
  gap,

  background,
  hasBorder = false,

  alignItems = "center",
  justifyContent = "between",
  fontSize = "base",
  minHeight,
  children,
  attributes,
  listeners,
}: HeaderProps) {

  
  const bgStyles = background ? `bg-${background}` : "";
  const fontColor =
    !background || background == "none"
      ? ""
      : background?.startsWith("base") && background != "base-content" && background != "base-700"
        ? "text-base-content"
        : `text-base-0`;

  // px-1 px-2 px-3 px-4 px-6 px-8 px-12 px-16 px-24 px-32 px-48 px-64
  const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ""}${paddingY ? ` py-${spacingMap[paddingY]}` : ""}`;
  const gapStyles = gap ? `gap-${spacingMap[gap]}` : "";

  const heightStyles = minHeight ? `min-h-[${minHeight}px]` : "";
  const borderStyles = hasBorder ? "border-b border-current-10" : "";
  const alignItemsStyles = alignItems ? `items-${alignItems}` : "";
  const fontSizeStyles = `text-${fontSize}`;
  const justifyContentStyles = justifyContent ? `justify-${justifyContent}` : "";

  const classes = `flex flex-row min-h-[60px] w-full border-box ${fontSizeStyles} ${fontColor} ${paddingStyles} ${heightStyles} ${gapStyles} ${alignItemsStyles} ${justifyContentStyles}`;

  // bg-base-50/50 bg-base-0/50 bg-primary/50 bg-secondary/50 bg-accent/50
  const outerClasses = `w-full flex flex-col items-center ${bgStyles}/50 ${borderStyles} relative backrop-blur`;

  return (
    <div {...attributes} {...listeners} className={outerClasses}>
      <div className={classes} style={{ width: "100%", maxWidth: width != "stretch" ? `${width}px` : "100%" }}>
        {children}
      </div>
    </div>
  );
}
Header.__juno_name = "Header";
export default Header;
