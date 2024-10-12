import { Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

/* Props to set up
hasCharacterCount?: boolean;
defaultRows?: number;
maxRows?: number;
maxCharacters?: number;
*/

type WithoutSize = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;
type TextAreaProps = WithoutSize & {
    state?: 'default' | 'disabled' | 'error' | 'success',
    bgColor?: 'none' | 'base-0' | 'base-50' | 'base-100' | 'current-5' | 'current-10',
    size?: 'small' | 'medium' | 'large',
    label?: string,
    helperText?: string,
    rightIcon?: IconType,
    leftIcon?: IconType,
    prefix?: string,
    suffix?: string,
    textAlign?: 'left' | 'right' | 'center',
    width?: 'auto' | '1/2' | 'full',
    hasOutline?: boolean,
    __juno?: any,

    /* React Input Props (subset) */
    defaultValue?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    placeholder?: string,    
}

export default function TextArea({
    state = 'default',

    bgColor = 'current-5',
    size = 'medium',
    label = '',
    helperText = '',
    rightIcon,
    leftIcon,
    prefix = '',
    suffix = '',
    textAlign = 'left',
    width = 'auto',
    hasOutline = false,        
    
    __juno = {}, 

    /* React Input Props (subset) */
    defaultValue,
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder = '',
    ...extraProps

  }: TextAreaProps) {
    
    let reactProps = {...extraProps, defaultValue, value, onChange, onBlur, onFocus, placeholder}
    
    // const sizeStyles = size == 'small' ? `py-1 px-2 gap-1.5` : size == 'large' ? `py-2 px-3 gap-3` : `py-1.5 px-2 gap-3`;
    const paddingX = size == 'small' ? `px-2.5` : size == 'large' ? `px-4` : `px-3.5`;
    const gapUnit = size == 'small' ? 2 : size == 'large' ? 3 : 2.5
    const paddingY = size == 'small' ? `py-1.5` : size == 'large' ? `py-3` : `py-2`;

    const textSize = size == 'small' ? 'text-xs' : size == 'large' ? 'text-base' : 'text-sm';
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    
    // default
    let stateStyles = hasOutline ? `ring-1 ring-inset ring-base-200 focus-within:ring-[1.5px] focus-within:ring-accent` : '';
    switch (state) {
        case 'disabled':
            stateStyles = `bg-base-100 opacity-70 cursor-not-allowed ${hasOutline ? 'ring-1 ring-inset ring-base-200' : ''}`
            break;
        case 'error':
            stateStyles = `text-warning ${hasOutline ? 'ring-1 ring-inset ring-warning' : ''}`
            break;
        case 'success':
            stateStyles = `text-success ${hasOutline ? 'ring-1 ring-inset ring-success' : ''}`
            break;
    }
    
    const bgStyles = (bgColor && bgColor !== 'none') ? `bg-${bgColor} ${!hasOutline && 'focus-within:brightness-95'}` : '';
    
    
    let inputWrapper = `w-full relative flex flex-row items-start ${paddingX} ${paddingY} ${textSize} ${cornerStyles} ${bgStyles} ${stateStyles} `

    
    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-normal`

    const messageTextColor = state == 'error' ? stateStyles = 'text-warning' : state == 'success' ? stateStyles = 'text-success' : 'text-current-70'
    const messageClasses = size == 'large' ? `text-base  ${messageTextColor}` : `text-sm ${messageTextColor}`
    const widthStyle = width != 'auto' ? `w-${width}` : size == 'small' ? '' : size == 'large' ? 'min-w-[200px]' : 'min-w-[160px]'
    
    
    const iconSize = size == 'small' ? '16px' : size == 'large' ? '24px' : '20px'
    const iconStyle = size == 'small' ? 'w-4' : size == 'large' ? 'w-6' : 'w-5' // temporary before we fix Icon
    const LeftIconComponent = leftIcon ? <Icon icon={leftIcon} size={iconSize} className={`flex-shrink-0 scale-90 ${iconStyle}`}/> : null;
    const RightIconComponent = rightIcon ? <Icon icon={rightIcon} size={iconSize} className={`flex-shrink-0 scale-90 ${iconStyle}`}/> : null;

    const gapStyles = size == 'small' ? 'gap-0.5' : size == 'large' ? 'gap-1.5' : 'gap-1'
    
    const classes = `flex flex-col ${widthStyle} ${gapStyles} flex-shrink-0`

    const inputPaddingX = `${(prefix || LeftIconComponent) ? 'pl-'+gapUnit : ''} ${(suffix || RightIconComponent) ? 'pr-'+gapUnit : ''}`


    const textColor = (state == 'disabled' || state == 'default') ? '' : `text-${state}-content`
    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
            {label && ( <label className={labelClasses}>{label}</label>)}

            <div className={inputWrapper} >
                {LeftIconComponent}
                <span className={`flex-shrink-0 ${LeftIconComponent && prefix ? `pl-${gapUnit}` : ''}`}>{prefix}</span>
                <textarea
                {...reactProps}
disabled={state == 'disabled'}
                className={`w-full text-${textAlign} border-0 border-transparent focus:outline-none focus:ring-0 font-medium placeholder:font-normal
                ${textColor} placeholder-current-70 bg-transparent ${state == 'disabled' && 'cursor-not-allowed'} ${inputPaddingX} resize-none 
                `}
                />  
                <span className={`flex-shrink-0 ${RightIconComponent && suffix ? `pr-${gapUnit}` : ''}`}>{suffix}</span>
                {RightIconComponent}
            </div>
            
            {helperText && <span className={messageClasses}>{helperText}</span>}    

        </div>
        
    );
}



