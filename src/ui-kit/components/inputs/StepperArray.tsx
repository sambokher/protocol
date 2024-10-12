import { useEffect, useState } from 'react';
import { ButtonIcon } from '../';

const sampleOptions = [
    { label: 'Option A', value: 'option-a'},
    { label: 'Option B', value: 'option-b'},
    { label: 'Option C', value: 'option-c'}
]

type StepperProps = {
    state?: 'default' | 'disabled' | 'error' | 'success',
    bgColor?: 'none' | 'base-0' | 'base-50' | 'base-100' | 'current-5' | 'current-10',
    size?: 'small' | 'medium' | 'large',
    label?: string,
    helperText?: string,
    width?: 'auto' | '1/2' | 'full',
    hasOutline?: boolean,

    /* React Input Props (subset) */
    value?: string,
    onChange?: (value: string) => void;
    options?: { label: string, value: string }[];

    __juno: any
}

export default function StepperArray({
    state = 'default',

    bgColor = 'current-5',
    size = 'medium',
    label,
    helperText,
    width = 'auto',
    hasOutline = false,        
    __juno = {},

    /* Select-like Props */
    options: externalOptions,
    value: externalValue,
    onChange,

  }: StepperProps) {
    
    const [internalOptions, setInternalOptions] = useState(externalOptions || sampleOptions);
    const [selectedValue, setSelectedValue] = useState(externalValue || internalOptions[0].value);
    const isControlled = externalOptions !== undefined && onChange !== undefined;
    const options = isControlled ? externalOptions : internalOptions;
    const value = isControlled ? externalValue : selectedValue
    const selectedOption = options.find(o => o.value == value)
    
    useEffect(() => {if (externalOptions) {setInternalOptions(externalOptions);}}, [externalOptions]);
    useEffect(() => {if (externalValue) {setSelectedValue(externalValue);}}, [externalValue]);     

    const nextValue = options[(options.indexOf(selectedOption) + 1)]?.value 
    const prevValue = options[(options.indexOf(selectedOption) - 1)]?.value

    function selectNextValue() {
        if (!nextValue) return;

        setSelectedValue(nextValue);
        onChange(nextValue);

    }

    function selectPrevValue() {
        if (!prevValue) return;

        setSelectedValue(prevValue);
        onChange(prevValue);
        
    }

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
            {label && <label className={labelClasses}>{label}</label>}
            <div className='flex flex-row items-center gap-1'>
            <ButtonIcon 
                state={prevValue ? 'default' : 'disabled'}
                size={size} 
                icon='chevron-left' 
                style='ghost'
                onClick={selectPrevValue} 
            />
            <div className={inputWrapper} >
                <div className={`flex-grow min-w-10 text-center ${paddingY} border-0 border-transparent focus:outline-none focus:ring-0 font-medium placeholder:font-normal
                placeholder-current-70 whitespace-nowrap truncate ellispsis bg-transparent ${textColor} ${state == 'disabled' && 'cursor-not-allowed'}`}
                >
                    {selectedOption?.label}
            </div> 
            
            </div>
            <ButtonIcon state={nextValue ? 'default' : 'disabled'}
                size={size} icon='chevron-right' style='ghost' 
                onClick={selectNextValue} />
            </div>
            {helperText && <span className={messageClasses}>{helperText}</span>}    
        </div>
        
    );
}



