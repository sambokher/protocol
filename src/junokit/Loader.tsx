type LoaderProps = {
  size?: "12px" | "16px" | "20px" | "24px" | "28px";
  type?: "spinner" | "pulse";
  color?:
    | "base-0"
    | "base-100"
    | "base-content"
    | "primary"
    | "accent"
    | "error"
    | "warning"
    | "success"
    | "info"
    | string;
  opacity?: "100" | "70" | "50";
  attributes?: object;
  listeners?: object;
};

export default function Loader({
  size = "16px",
  type = "spinner",
  color,
  opacity = "70",
  attributes,
  listeners,
}: LoaderProps) {
  const borderSizeMap = {
    "12px": "border",
    "16px": "border-2",
    "20px": "border-[3px]",
    "24px": "border-2px",
    "28px": "border-[3px]",
  };
  // border-current
  const useColor = color ? color : "current";
  const typeClasses =
    type == "spinner"
      ? `${borderSizeMap[size]} border-solid border-${useColor} border-t-transparent`
      : `bg-${useColor} `;

  const animation = type == "spinner" ? "animate-spin" : "pulsate-125";
  const loaderClasses = `${typeClasses} rounded-full opacity-${opacity} ${animation}`;

  return <div style={{ width: size, height: size }} className={loaderClasses} {...attributes} {...listeners} />;
}
