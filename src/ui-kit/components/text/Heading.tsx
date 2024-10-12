import { spacingMap } from '../helpers'; 
// need to add truncate and wrapping controls

type Props = {
    textSize?: 'auto' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl',
    textColor?: 'none' | 'primary' | 'primary-content' | 'accent' | 'accent-content' | 'base-0' | 'base-50' | 'base-100' | 'base-content' | 'base-500' | 'base-700' | 'base-900' | 'success-content' | 'warning-content' | 'error-content' | 'info-content' | string,
    marginBottom?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    marginTop?: '4px' | '6px' | '8px' | '12px' | '16px' | '24px' | '32px',
    lineHeight?: 'auto' | 'none' | 'tight' | 'normal' | 'relaxed' | 'loose',
    text?: string,
    fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black',
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
    alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch',
    __juno?: any
}

export default function Heading({
        textSize = '2xl',
        textColor = null,
        marginBottom = null, 
        marginTop = null, 
        lineHeight = 'auto',
        text = 'Heading',
        fontWeight = 'semibold',
        textAlign = 'left',
        alignSelf = 'auto',
        __juno = {}
      }: Props) {
    
    const textSizeStyles = `text-${textSize}`;
    const textColorStyles = (textColor == 'none' || !textColor) ? `` : `text-${textColor}`
    
    const marginBottomStyles = marginBottom ? `mb-${spacingMap[marginBottom]}` : '';
    const marginTopStyles = marginTop ? `mt-${spacingMap[marginTop]}` : '';
    
    const lineHeightStyles = lineHeight != 'auto' ? `leading-${lineHeight}` : '';
    const fontWeightStyles = `font-${fontWeight}`
    const textAlignStyles = textAlign != 'auto' ? `text-${textAlign}` : '';
    const alignSelfStyles = alignSelf != 'auto' ? `self-${alignSelf}` : '';

    const classes = `text-ellipsis ${textSizeStyles} ${textColorStyles} ${marginBottomStyles} ${marginTopStyles} ${lineHeightStyles} ${fontWeightStyles} ${textAlignStyles} ${alignSelfStyles}`

    return (
        <h1
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        style={{whiteSpace: 'pre-wrap'}} 
        >
        {text}
        </h1>
    );
}



