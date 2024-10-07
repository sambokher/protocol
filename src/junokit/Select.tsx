import { useState, useEffect, useRef } from "react";
import { Icon } from "./index";

// const sampleOptions = [
//   { label: "Option A", value: "option-a" },
//   { label: "Option B", value: "option-b" },
//   { label: "Option C", value: "option-c" },
// ];

type Option = { label: string; value: string };

type SelectProps = {
  value: string;
  options: Option[];
  onChange: (v: string) => void;

  width?: "auto" | "1/2" | "full";
  size?: "small" | "medium" | "large";
  label?: string;
  state?: "default" | "disabled" | "error" | "success";
  bgColor?: "base-0" | "base-50" | "base-100" | "none" | "current-5" | string;
  placeholder?: string;
  rightIcon?: "chevron-down" | "none";
  hasOutline?: boolean;
  helperText?: string;
  attributes?: Record<string, unknown>;
  listeners?: Record<string, unknown>;
};

export default function Select({
  size = "medium",
  placeholder = "Select",
  bgColor = "current-5",

  options,
  value,

  label = "",
  helperText = "",
  state = "default",
  rightIcon = "chevron-down",
  width = "auto",
  hasOutline = false,
  onChange,
  attributes,
  listeners,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value == value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const sizeStyles =
    size == "small"
      ? `py-1 px-2 gap-1.5 text-xs`
      : size == "large"
        ? `py-2 px-3 gap-3 text-base`
        : `py-1.5 px-2 gap-3 text-sm`;

  const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md";
  let stateStyles = "";
  switch (state) {
    case "default":
      stateStyles = hasOutline
        ? open
          ? `border border-accent`
          : `border border-base-200`
        : "border border-transparent";
      break;
    case "disabled":
      stateStyles = `bg-base-100 opacity-70 cursor-not-allowed ${hasOutline ? "border border-base-200" : ""}`;
      break;
    case "error":
      stateStyles = `text-warning-content ${hasOutline ? "border border-warning" : ""}`;
      break;
    case "success":
      stateStyles = `text-success-content ${hasOutline ? "border border-success" : ""}`;
      break;
  }

  const heightStyle = size == "small" ? "h-7" : size == "large" ? "h-12" : "h-9";
  const bgStyles = bgColor && bgColor !== "none" ? `bg-${bgColor}` : "bg-base-100 text-base-content";

  const classes = `w-full flex items-center justify-between truncate ellipsis box-border font-medium !select-none ${sizeStyles} ${heightStyle} ${cornerStyles} ${bgStyles} ${stateStyles}`;
  const labelTextSize = size == "small" ? `text-xs` : size == "large" ? `text-lg` : `text-sm`;
  const labelClasses = `${labelTextSize} !font-normal`;

  const messageTextColor =
    state == "error" ? "text-warning" : state == "success" ? "text-success" : "text-base-content";
  const messageClasses = `text-sm ${messageTextColor}`;
  const widthStyle =
    width != "auto"
      ? `w-${width}`
      : size == "small"
        ? "min-w-[120px]"
        : size == "large"
          ? "min-w-[200px]"
          : "min-w-[160px]";
  const gapStyles = size == "small" ? "gap-0.5" : size == "large" ? "gap-1.5" : "gap-1";
  const wrapperClasses = `flex flex-col ${widthStyle} max-w-full ${gapStyles} relative ${open ? "z-50" : ""}`;

  const RightIconComponent =
    rightIcon !== "none" ? <Icon icon={rightIcon} className={`flex-shrink-0 flex-grow-0 opacity-80 scale-75`} /> : null;

  /* OPTIONS STYLING */
  const shadowStyles = size == "small" ? "shadow-sm" : size == "large" ? "shadow-md" : "shadow";
  const optionsBorderRadius = size === "small" ? "rounded" : size === "large" ? "rounded-lg" : "rounded-md";
  const smallerRadius = size === "small" ? "rounded-sm" : size === "large" ? "rounded-md" : "rounded";

  const optionsClasses = `w-full absolute mt-2 p-0.5 gap-0.5 bg-base-0 overflow-hidden ${optionsBorderRadius} ${shadowStyles} ring-[0.5px] ring-inset ring-current-10
  -bottom-1 translate-y-full z-10 left-0
  `;
  const optionSizeStyles =
    size == "small"
      ? `py-1 px-2 gap-1.5 text-xs min-w-[120px]`
      : size == "large"
        ? `py-2 px-3 gap-3 text-base min-w-[200px]`
        : `py-1.5 px-2 gap-3 text-sm min-w-[160px]`;

  const optionClasses = `${optionSizeStyles} hover:bg-current-10 transition-all duration-75 ease-in-out cursor-default ${smallerRadius}`;

  function handleClick(e) {
    if (state === "disabled") return;
    e.stopPropagation();
    setOpen(!open);
  }
  return (
    <div {...attributes} {...listeners} className={wrapperClasses}>
      {label && <label className={labelClasses}>{label}</label>}
      <div
        className={classes}
        ref={dropdownRef}
        onClick={(e) => handleClick(e)}
      >
        {selectedOption ? (
          <span className={"overflow-hidden truncate"}>{selectedOption?.label || selectedOption?.value}</span>
        ) : (
          <span className={"text-current-70"}>{placeholder}</span>
        )}

        {RightIconComponent}
        {open && (
          <div className={optionsClasses} 
            style={{ 
              
              animation: 'fadeInDown 100ms ease-in-out'
              }}>
            {options.map((option, index) => (
              <div key={index} className={optionClasses} onClick={() => onChange(option.value)}>
                {option?.label || option?.value || option.toString()}
              </div>
            ))}
          </div>
        )}
      </div>
      {helperText && <span className={messageClasses}>{helperText}</span>}
    </div>
  );
}
