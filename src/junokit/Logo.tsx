import Normal from "../assets/logo_full.svg";
import NormalInverted from "../assets/logo_full_inverted.svg";
import Symbol from "../assets/logo_symbol.svg";
import SymbolInverted from "../assets/logo_symbol_inverted.svg";

type LogoProps = {
  type?: "logo" | "symbol";
  size?: "20px" | "24px" | "28px" | "36px" | "40px" | "48px" | "60px" | "96px";
  color?: "normal" | "inverted";
  customWidth?: number;
  customHeight?: number;
  selfAlign?: "auto" | "start" | "center" | "end";
  assets?: object;
  attributes?: object;
  listeners?: object;
  onClick?: () => void;
};

export default function Logo({
  type = "symbol",
  size = "28px",
  customWidth,
  customHeight,
  selfAlign = "auto",
  color = "normal",
  attributes,
  listeners,
  onClick,
}: LogoProps) {
  const classes = `flex-shrink-0 self-${selfAlign}`;

  const wrapperInlineStyles = {
    width: customWidth,
    height: customHeight || size,
  };
  if (!customWidth && type === "symbol") {
    wrapperInlineStyles.width = Number(size.replace("px", ""));
  }

  let imgUrl = Symbol;
  if (color === "normal" && type === "logo") {
    imgUrl = Normal;
  }
  if (color === "inverted") {
    if (type === "symbol") {
      imgUrl = SymbolInverted;
    } else {
      imgUrl = NormalInverted;
    }
  }

  return (
    <div {...attributes} {...listeners} className={classes} style={wrapperInlineStyles} onClick={onClick}>
      <img src={imgUrl} style={{ ...wrapperInlineStyles, objectFit: "contain" }} />
    </div>
  );
}
