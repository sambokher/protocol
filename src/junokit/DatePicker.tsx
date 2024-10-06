import { Icon } from './';
import { IconNameType } from "./iconMap";

type DatePickerProps = {
    state?: 'default' | 'error' | 'disabled' | 'success';
    bgColor?: string;
    size?: 'small' | 'medium' | 'large';
    label?: string;
    helperText?: string;
    rightIcon?: IconNameType;
    textAlign?: 'left' | 'center' | 'right';
    width?: 'auto' | '1/2' | 'full';
    hasOutline?: boolean;
    defaultValue?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    
    __juno?: any;
};

export default function DatePicker({
    state = 'default',

    bgColor = 'current-5',
    size = 'medium',
    label = '',
    helperText = '',
    rightIcon,
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
    placeholder = 'hello',
    ...extraProps

  }: DatePickerProps) {
    
    let reactProps = {...extraProps, defaultValue, value, onChange, onBlur, onFocus, placeholder}
    
    // const sizeStyles = size == 'small' ? `py-1 px-2 gap-1.5` : size == 'large' ? `py-2 px-3 gap-3` : `py-1.5 px-2 gap-3`;
    const paddingX = size == 'small' ? `px-2.5` : size == 'large' ? `px-4` : `px-3.5`;
    const paddingY = size == 'small' ? `py-1.5` : size == 'large' ? `py-3` : `py-2`;

    const textSize = size == 'small' ? 'text-xs' : size == 'large' ? 'text-base' : 'text-sm';
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    
    const ringSize = size == 'small' ? '1' : size == 'large' ? '2' : '1.5'
    // default
    let stateStyles = hasOutline ? `ring-1 ring-inset ring-base-200 focus-within:ring-[${ringSize}px] focus-within:ring-primary` : `ring-1 ring-inset ring-transparent focus-within:ring-[${ringSize}px] focus-within:ring-primary`;
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
    
    const heightStyle = size == 'small' ? 'h-7' : size == 'large' ? 'h-12' : 'h-9';
    let inputWrapper = `w-full relative flex flex-row items-center ${heightStyle} ${paddingX} ${textSize} ${cornerStyles} ${bgStyles} ${stateStyles} `

    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-normal`

    const messageTextColor = state == 'error' ? stateStyles = 'text-warning' : state == 'success' ? stateStyles = 'text-success' : ''
    const messageClasses = size == 'large' ? `text-base  ${messageTextColor}` : `text-sm ${messageTextColor}`
    const widthStyle = width != 'auto' ? `w-${width}` : size == 'small' ? '' : size == 'large' ? 'min-w-[200px]' : 'min-w-[160px]'
    
    
    const iconSize = size == 'small' ? '16px' : size == 'large' ? '24px' : '20px'
    const iconStyle = size == 'small' ? 'w-4' : size == 'large' ? 'w-6' : 'w-5' // temporary before we fix Icon
    
    const RightIconComponent = rightIcon ? <Icon icon={rightIcon} size={iconSize} className={`flex-shrink-0 scale-90 ${iconStyle}`}/> : null;

    const gapStyles = size == 'small' ? 'gap-0.5' : size == 'large' ? 'gap-1.5' : 'gap-1'
    const classes = `flex flex-col ${widthStyle} ${gapStyles}`

    const textColor = (state == 'disabled' || state == 'default') ? '' : `text-${state}-content`

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            {label && ( <label className={labelClasses}>{label}</label>)}
            <div className={inputWrapper} >
            <input
            {...reactProps}
            type='date'
            disabled={state == 'disabled'}
            className={`w-full text-${textAlign} ${paddingY} border-0 border-transparent focus:outline-none focus:ring-0 font-medium placeholder:font-normal
            placeholder-current-70 bg-transparent ${textColor} ${state == 'disabled' && 'cursor-not-allowed'}`}
            />  
            
            {RightIconComponent}
            </div>
            {helperText && <span className={messageClasses}>{helperText}</span>}    
        </div>
        
        
    );
}



