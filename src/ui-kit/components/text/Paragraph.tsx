import { spacingMap } from '../helpers';

const dummyText = `This medium-length paragraph provides more detail, suitable for sections that require a bit more explanation. It's perfect for content areas where you need to elaborate on a topic without overwhelming the reader with text.`

type Props = {
    text?: string,
    textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
    textColor?: 'primary' | 'primary-content' | 'accent' | 'accent-content' | 'base-0' | 'base-50' | 'base-100' | 'base-content' | 'base-500' | 'base-700' | 'base-900' | 'success-content' | 'warning-content' | 'error-content' | 'info-content' | string,
    marginBottom?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    marginTop?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    lineHeight?: 'auto' | 'none' | 'tight' | 'normal' | 'relaxed' | 'loose',
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
    fontWeight?: 'auto' | 'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black',
    __juno?: any
}

export default function Paragraph({
        text = dummyText,
        textSize = 'auto',
        textColor,
        marginBottom,
        marginTop,
        lineHeight = 'auto',
        textAlign = 'left',
        
        fontWeight,
        __juno = {} 
      }: Props) {

    const textSizeStyles = textSize !== 'auto' && `text-${textSize}`
    const textColorStyles = (textColor == 'none' || !textColor) ? `` : `text-${textColor}`
    const marginBottomStyles = marginBottom ? `mb-${spacingMap[marginBottom]}` : '';
    const marginTopStyles = marginTop ? `mt-${spacingMap[marginTop]}` : '';
    
    const lineHeightStyles = lineHeight !== 'auto' && `leading-${lineHeight}`
    const fontWeightStyles = fontWeight !== 'auto' && `font-${fontWeight}`
    const textAlignStyles = textAlign ? `text-${textAlign}` : ''; 

    const classes = `whitespace-pre-wrap ${textSizeStyles} ${textColorStyles} ${marginBottomStyles} ${marginTopStyles} ${lineHeightStyles} ${fontWeightStyles} ${textAlignStyles}`

    return (
        <p
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
        {text}
        </p>
    );
}


