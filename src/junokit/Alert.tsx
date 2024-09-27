import Button from "./Button";
import Link from "./Link";
import Icon from "./Icon";

import { IconNameType } from "./iconMap";

type AlertProps = {
  type?: "info" | "base" | "error" | "warning" | "success";
  size?: "small" | "medium" | "large";
  icon?: "auto" | IconNameType;
  hasCloseButton?: boolean;
  text?: string;
  style?: "filled" | "outline" | "light";
  actionText?: string;
  actionType?: "button" | "link";
  title?: string;
  width?: "auto" | "1/2" | "full";
  onActionClick?: () => void;
  attributes?: object;
  listeners?: object;
};

// needs mobile behavior
export default function Alert({
  type = "base",
  size = "medium",
  icon,
  hasCloseButton = false,
  text = "This is an alert message",
  style = "light",
  actionText = "",
  actionType = "link",
  title = "",
  width = "auto",
  onActionClick,
  attributes,
  listeners,
}: AlertProps) {
  const styleMap = {
    filled: type == "base" ? `bg-base-content text-base-0` : `bg-${type} text-base-0`,
    outline:
      type == "base"
        ? `text-base-600 ring-1 ring-inset ring-base-300`
        : `text-${type}-content ring-1 ring-inset ring-${type}-focus`,
    light: type == "base" ? `bg-base-100 text-base-content` : `bg-${type}-surface text-${type}-content`,
  };

  const typeStyles = styleMap[style];

  const sizeStyles = size == "small" ? `py-1.5 px-2 gap-1.5 text-xs` : `py-2.5 px-4 gap-2.5 text-sm`;
  const widthStyle = width == "auto" ? `w-auto` : `w-${width}`;
  const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md";

  const wrapperClasses = `flex flex-row items-start justify-between transition-all duration-100 ${typeStyles} ${sizeStyles} ${cornerStyles} ${widthStyle}`;

  const iconStyleMap = {
    info: "info",
    error: "warning",
    base: "info",
    warning: "warning",
    success: "check-circle",
  };

  const truncateStyle = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

  const useIcon = icon == "auto" ? iconStyleMap[type] : icon;
  const iconSize = size == "small" ? "w-4 h-4" : "w-5 h-5";

  const IconComponent = icon ? <Icon icon={useIcon as IconNameType} className={`flex-shrink-0 ${iconSize}`} /> : null;

  return (
    <div {...attributes} {...listeners} className={wrapperClasses}>
      {IconComponent}
      <div
        className={`flex flex-col flex-grow-1 w-full items-start font-normal ${size == "small" ? "gap-0.5" : "gap-1"}`}
      >
        {title && title != "" && (
          <h2 className="font-semibold" style={truncateStyle}>
            {title}
          </h2>
        )}
        {text}
        {actionText && actionText != "" ? (
          actionType == "button" ? (
            <Button
              text={actionText}
              size={"small"}
              color={type == "base" ? "base-700" : type}
              style={"filled"}
              marginTop={"6px"}
              onClick={onActionClick}
            />
          ) : (
            <Link text={actionText} onClick={onActionClick} underline="always" />
          )
        ) : null}
      </div>

      {hasCloseButton && <Icon icon="close" className="flex-shrink-0 mt-0.5" />}
    </div>
  );
}
