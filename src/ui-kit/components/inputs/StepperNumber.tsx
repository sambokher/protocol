
import React, { useState } from 'react';
import { ButtonIcon } from '../'; 

type InputWithoutSize = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;
type StepperProps = InputWithoutSize & {
    state?: 'default' | 'disabled' | 'error' | 'success',
    bgColor?: 'none' | 'base-0' | 'base-50' | 'base-100' | 'current-5' | 'current-10',
    size?: 'small' | 'medium' | 'large',
    label?: string,
    helperText?: string,
    textAlign?: 'left' | 'right' | 'center',
    width?: 'auto' | '1/2' | 'full',
    hasOutline?: boolean,

    /* React Input Props (subset) */
    defaultValue?: number, 
    value?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    min?: number,
    max?: number,
    step?: number,
    placeholder?: string,

    __juno: any
}

export default function StepperNumber({
    state = 'default',

    bgColor = 'current-5',
    size = 'medium',
    label = '',
    helperText = '',
    textAlign = 'left',
    width = 'auto',
    hasOutline = false,        
    __juno = {},

    /* React Input Props (subset) */
    defaultValue,
    value: controlledValue,
    onChange,
    onBlur,
    onFocus,
    min, 
    max,
    step = 1,
    placeholder,
    ...extraProps

  }: StepperProps) {
    
    const [value, setValue] = useState<number>(controlledValue); 
    const [isFocused, setIsFocused] = useState(false);

    // Handle input change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setValue(newValue);
        onChange && onChange(e); // Call parent's onChange if provided
    };

    // Handle input focus event
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus && onFocus(e);
    };

    // Handle input blur event
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur && onBlur(e);
    };

    function increaseValue() {
        const currentValue = value || 0
        const newValue = currentValue + step
        if (max && newValue > max) return
        setValue(newValue)
    }

    function decreaseValue() {
        const currentValue = value || 0
        const newValue = currentValue - step
        if (min && newValue < min) return
        setValue(newValue)  
    }
    
    let reactProps = {...extraProps, defaultValue, value, 
        onChange: handleChange, onBlur: handleBlur, onFocus: handleFocus, 
         min, max, step, placeholder}


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
    
    const heightStyle = size == 'small' ? 'h-7' : size == 'large' ? 'h-12' : 'h-9';
    let inputWrapper = `w-full relative flex flex-row items-center ${heightStyle} ${paddingX} ${textSize} ${cornerStyles} ${bgStyles} ${stateStyles} `

    
    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-normal`

    const messageTextColor = state == 'error' ? stateStyles = 'text-warning' : state == 'success' ? stateStyles = 'text-success' : ''
    const messageClasses = size == 'large' ? `text-base  ${messageTextColor}` : `text-sm ${messageTextColor}`
    const widthStyle = width != 'auto' ? `w-${width}` : size == 'small' ? '' : size == 'large' ? 'min-w-[200px]' : 'min-w-[160px]'

    const gapStyles = size == 'small' ? 'gap-0.5' : size == 'large' ? 'gap-1.5' : 'gap-1'
    const classes = `flex flex-col ${widthStyle} ${gapStyles}`

    const textColor = (state == 'disabled' || state == 'default') ? '' : `text-${state}-content`

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
            {label && ( <label className={labelClasses}>{label}</label>)}
            <div className='flex flex-row items-center gap-1'>
            <ButtonIcon size={size} icon='minus' style='ghost' onClick={decreaseValue} />
            <div className={inputWrapper} >
            
            
            <input
            {...reactProps}
            disabled={state == 'disabled'}
            type='number'
            className={`w-10 text-center ${paddingY} border-0 border-transparent focus:outline-none focus:ring-0 font-medium placeholder:font-normal
            placeholder-current-70 bg-transparent ${textColor} ${state == 'disabled' && 'cursor-not-allowed'}`}
            />  
            
            </div>
            <ButtonIcon size={size} icon='plus' style='ghost' onClick={increaseValue} />
            </div>
            {helperText && <span className={messageClasses}>{helperText}</span>}    
        </div>
        
    );
}



