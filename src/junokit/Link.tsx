import { spacingMap } from "./helpers";

type Props = {
  text?: string;
  URL?: string;
  openInNewWindow?: boolean;
  textSize?: "auto" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  textColor?:
    | "primary"
    | "primary-content"
    | "accent"
    | "accent-content"
    | "base-0"
    | "base-50"
    | "base-100"
    | "base-content"
    | "base-500"
    | "base-700"
    | "base-900"
    | "success-content"
    | "warning-content"
    | "error-content"
    | "info-content"
    | string;
  lineHeight?: "auto" | "tight" | "normal" | "relaxed" | "loose";
  fontWeight?:
    | "auto"
    | "hairline"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  underline?: "always" | "onlyOnHover" | "never";
  marginTop?: "4px" | "6px" | "8px" | "12px" | "16px" | "24px" | "32px";
  marginBottom?: "4px" | "6px" | "8px" | "12px" | "16px" | "24px" | "32px";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  attributes?: object;
  listeners?: object;
};

export default function Link({
  text = "Link",
  URL = "#",
  openInNewWindow = false,
  onClick,
  textSize = "auto",
  textColor,
  lineHeight = "auto",
  fontWeight = "auto",
  underline = "onlyOnHover",
  marginBottom,
  marginTop,
  attributes,
  listeners,
}: Props) {
  const textSizeStyles = textSize != "auto" && `text-${textSize}`;
  const textColorStyles = textColor == "none" || !textColor ? `` : `text-${textColor}`;
  const lineHeightStyles = lineHeight != "auto" ? `leading-${lineHeight}` : "";
  const fontWeightStyles = fontWeight != "auto" ? `font-${fontWeight}` : "";
  const marginBottomStyles = marginBottom ? `mb-${spacingMap[marginBottom]}` : "";
  const marginTopStyles = marginTop ? `mt-${spacingMap[marginTop]}` : "";

  const underlineStyles =
    underline == "always" ? "underline" : underline == "onlyOnHover" ? "hover:underline" : "no-underline";

  const classes = `inline-flex ${textSizeStyles} ${textColorStyles} ${lineHeightStyles} ${fontWeightStyles} ${underlineStyles}  ${marginBottomStyles} ${marginTopStyles} cursor-pointer`;

  return (
    <a
      className={classes}
      href={URL}
      target={openInNewWindow ? "_blank" : "_self"}
      rel={openInNewWindow ? "noopener noreferrer" : ""}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      {text}
    </a>
  );
}
