import { spacingMap } from '../helpers';
// need to add truncate and wrapping controls

type Props = {
    textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
    textColor?: 'primary' | 'primary-content' | 'accent' | 'accent-content' | 'base-0' | 'base-50' | 'base-100' | 'base-content' | 'base-500' | 'base-700' | 'base-900' | 'success-content' | 'warning-content' | 'error-content' | 'info-content' | string,
    marginBottom?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    marginTop?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    lineHeight?: 'auto' | 'none' | 'tight' | 'normal' | 'relaxed' | 'loose',
    text?: string,
    fontWeight?: 'auto' | 'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black',
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
    __juno?: any
}

export default function Text({
        textSize = 'auto',
        textColor,
        marginBottom,
        marginTop,
        lineHeight = 'auto',
        text = 'Text..',
        fontWeight = 'auto',
        textAlign = 'left',
        __juno = {}
      }: Props) {

    const textSizeStyles = textSize !== 'auto' ? `text-${textSize}` : '';
    const textColorStyles = (textColor == 'none' || !textColor) ? `` : `text-${textColor}`
    const marginBottomStyles = marginBottom ? `mb-${spacingMap[marginBottom]}` : '';
    const marginTopStyles = marginTop ? `mt-${spacingMap[marginTop]}` : '';
    
    const lineHeightStyles = lineHeight !== 'auto' ? `leading-${lineHeight}` : '';
    const fontWeightStyles = fontWeight !== 'auto' ? `font-${fontWeight}` : '';
    const textAlignStyles = textAlign ? `text-${textAlign}` : '';

    const classes = `inline-flex ${textSizeStyles} ${textColorStyles} ${marginBottomStyles} ${marginTopStyles} ${lineHeightStyles} ${fontWeightStyles} ${textAlignStyles}`
    
    return (
        <span
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{whiteSpace: 'pre-wrap'}}>
        {text}
        </span>
    );
}


