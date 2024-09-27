import Icon from "./Icon";
import { IconNameType } from "./iconMap";

type SegmentedSwitchProps = {
  size?: "small" | "medium" | "large";
  value: string;
  width?: "auto" | "1/2" | "full";
  bgColor?: "base-0" | "base-50" | "base-100" | "base-200" | "base-300" | "current-5" | "none";
  selectedOptionColor?: "base-0" | "accent" | "primary" | "success" | "info";
  label?: string;
  options: { label: string; value: string; icon?: IconNameType }[];
  onChange: (value: string) => void;
  hasOutline?: boolean;
  attributes?: object;
  listeners?: object;
};

export default function SegmentedSwitch({
  size = "medium",
  value,
  width = "auto",
  bgColor = "current-5",
  selectedOptionColor = "base-0",
  label,
  options,
  onChange,
  hasOutline = false,
  attributes,
  listeners,
}: SegmentedSwitchProps) {
  
    /* Wrapper */ 
    const widthStyle = `w-${width}`;
    const heightStyle = size == 'small' ? 'min-h-7 h-7' : size == 'large' ? 'h-12 min-h-12' : 'h-9 min-h-9';
    const gapStyles = size == 'small' ? 'gap-0.5' : size == 'large' ? 'gap-1.5' : 'gap-1'
    const sizeStyles = size == 'small' ? `gap-0.5 text-xs p-0.5` : size == 'large' ? `gap-1.5 text-base p-1` : `gap-1 text-sm p-0.5`;
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    const bgStyles = bgColor != 'none' ? bgColor == 'current-5' ? 'bg-current-5 hover:bg-current-10' : `bg-${bgColor}` : ''
    
    const borderStyles = hasOutline ? 'ring-1 ring-inset ring-base-200' : ''
    
    let wrapperClasses = `flex flex-col whitespace-nowrap ${gapStyles} ${widthStyle} select-none`
    let classes = `${bgStyles} ${borderStyles} ${sizeStyles} ${cornerStyles} ${heightStyle}  ${gapStyles} w-full flex flex-row  items-center justify-between font-medium `
    
    
    const textColor = bgColor.startsWith('base-') ? 'text-base-content' : `text-${bgColor}-content`

  const labelTextSize = size == "small" ? `text-xs` : size == "large" ? `text-lg` : `text-sm`;
  const labelClasses = `${labelTextSize} font-normal`;


  /* Options */
  const optionSizeStyles =
    size == "small" ? `h-full px-1 rounded-sm` : size == "large" ? `h-full px-3 rounded-md` : `h-full px-2 rounded`;
  const optionClasses = `cursor-pointer  flex flex-rowgrow w-full items-center justify-center text-center ${optionSizeStyles} ${textColor} ${gapStyles}`;
  const selectedTextColor = selectedOptionColor?.startsWith("base") ? `text-base-content` : `!text-base-0`;
  const selectedOptionClasses = `bg-${selectedOptionColor} ring-1 ring-base-200  ${selectedTextColor}`;
  
  return (
    <div {...attributes} {...listeners} className={wrapperClasses}>
      {label && <label className={labelClasses}>{label}</label>}
      <div className={classes}>
        {options
          .slice(0, 5) // up to 5 options
          .map((option, index) => (
            <div
              className={`${optionClasses} ${option.value == value ? selectedOptionClasses : ""}`}
              style={{ minWidth: `auto` }}
              key={index}
              onClick={() => onChange(option.value)}
            >
              {option.icon && <Icon icon={option.icon} className="flex-shrink-0 scale-[0.8] origin-center" />}
              {option.label && <span className="text-center"> {option.label}</span>}
            </div>
          ))}
      </div>
    </div>
  );
}
