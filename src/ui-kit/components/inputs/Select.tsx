import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../'
import { IconType } from '../iconMap';

type Option = { label: string, value: string };

type SelectProps = {
    width?: 'auto' | '1/2' | 'full';
    size?: 'small' | 'medium' | 'large';
    label?: string;
    state?: 'default' | 'disabled' | 'error' | 'success';
    bgColor?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    showOptions?: boolean;
    options?: Option[];
    rightIcon?: Extract<IconType, 'chevron-down'>;
    hasOutline?: boolean;
    onChange?: (value: string) => void;
    helperText?: string;
    __juno?: any;
};

const sampleOptions = [
    { label: 'Option A', value: 'option-a'},
    { label: 'Option B', value: 'option-b'},
    { label: 'Option C', value: 'option-c'}
];

export default function Select({
        size = 'medium',
        placeholder = 'Select',
        showOptions = false,
        bgColor = 'current-5',
        options = sampleOptions,
        value: propValue,
        label = '',
        name,
        helperText = '',
        state = 'default',
        rightIcon = 'chevron-down',
        width = 'auto',
        hasOutline = false,
        onChange,
        __juno,
      }: SelectProps) {
    
    const [ open, setOpen ] = useState(showOptions);
    useEffect(() => {
        setOpen(showOptions);
      }, [showOptions]);

    const [selectedValue, setSelectedValue] = useState(propValue || options[0].value);
    useEffect(() => {
        if (propValue) {
          setSelectedValue(propValue);
        }
      }, [propValue]);
    
    const selectedOption = options.find(o => o.value === selectedValue)

    const handleSelect = ({value}: Option) => onChange ? onChange(value) : setSelectedValue(value);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const sizeStyles = size === 'small' ? `py-1 px-2 gap-1.5 text-xs` : size === 'large' ? `py-2 px-3 gap-3 text-base` : `py-1.5 px-2 gap-3 text-sm`;
    const cornerStyles = size === "small" ? "rounded" : size === "large" ? "rounded-lg" : "rounded-md"
    const ringSize = size === 'small' ? '1' : size === 'large' ? '2' : '1.5'

    let stateStyles: string;
    switch (state) {
        case 'disabled':
            stateStyles = `bg-base-100 opacity-70 cursor-not-allowed ${hasOutline ? 'ring-1 ring-inset ring-current-10' : ''}`
            break;
        case 'error':
            stateStyles = `text-warning ${hasOutline ? 'ring-1 ring-inset ring-warning' : ''}`
            break;
        case 'success':
            stateStyles = `text-success ${hasOutline ? 'ring-1 ring-inset ring-success' : ''}`
            break;
        default:
            stateStyles = `ring-1 ring-inset focus-within:ring-[${ringSize}px] focus-within:ring-primary ${hasOutline ? `ring-current-10` : `ring-transparent`}`;
    }

    const heightStyle = size === 'small' ? 'h-7' : size === 'large' ? 'h-12' : 'h-9';
    const bgStyles = (bgColor && bgColor !== 'none') ? `bg-${bgColor}` : 'bg-base-100 text-base-content'

    const inputClasses = `w-full flex items-center justify-between truncate ellipsis box-border font-medium select-none ${sizeStyles} ${heightStyle} ${cornerStyles} ${bgStyles} ${stateStyles}`
    const labelTextSize = size === 'small' ? `text-xs` :  size === 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-medium`

    const widthStyle = width !== 'auto' ? `w-${width}` : size === 'small' ? 'min-w-[120px]' : size === 'large' ? 'min-w-[200px]' : 'min-w-[160px]'
    const gapStyles = size === 'small' ? 'gap-0.5' : size === 'large' ? 'gap-1.5' : 'gap-1'
    const wrapperClasses = `flex flex-col ${widthStyle} ${gapStyles} relative ${open ? 'z-50' : ''}`

    const messageTextColor = state === 'error' ? 'text-warning' : state === 'success' ? 'text-success' : 'text-base-content'
    const messageClasses = `text-sm ${messageTextColor}`

    /* OPTIONS STYLING */
    const shadowStyles = size === 'small' ? 'shadow-sm' : size === 'large' ? 'shadow-md' : 'shadow'
    const optionsBorderRadius = (size === 'small' ? 'rounded' : size === 'large' ? 'rounded-lg' : 'rounded-md');
    const optionsClasses = `w-full absolute mt-2 p-0.5 gap-0.5 bg-base-0 overflow-hidden ${optionsBorderRadius} ${shadowStyles} ring-[0.5px] ring-inset ring-current-10`

    const optionSizeStyles = size === 'small' ? `py-1 px-2 gap-1.5 text-xs min-w-[120px]` :  size === 'large' ? `py-2 px-3 gap-3 text-base min-w-[200px]`: `py-1.5 px-2 gap-3 text-sm min-w-[160px]`;
    const smallerRadius = size === 'small' ? 'rounded-sm' : size === 'large' ? 'rounded-md' : 'rounded';
    const optionClasses = `${optionSizeStyles} hover:bg-current-10 transition-all duration-75 ease-in-out cursor-default ${smallerRadius}`
  
    return (
        <div className={`${wrapperClasses} ${__juno?.outlineStyle} ${__juno?.tagStyle}`} {...__juno?.attributes}>
            <input type="hidden" name={name} value={selectedOption ? selectedOption.value : ""} />
            {label && <label className={labelClasses}>{label}</label>}
        <div className={inputClasses} ref={dropdownRef} onClick={__juno ? undefined : ((e) => {e.stopPropagation(); setOpen(!open)})}>
                {selectedOption
                    ? (selectedOption.label || selectedOption.value)
                    : <span className={'text-current-70'}> {placeholder}</span>}
                {rightIcon
                    ? <Icon icon={rightIcon} className="flex-shrink-0 flex-grow-0 opacity-80 scale-75"/>
                    : null}
                {open && (
                    <div
                        className={optionsClasses} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100 }}>
                        {options.map((option, index) => (
                            <div key={index} className={optionClasses} onClick={__juno ? undefined : (() => handleSelect(option))}>
                                {option.label || option.value}
                            </div>
                        ))}
                    </div>)}
            </div>
            {helperText && <span className={messageClasses}>{helperText}</span>}
        </div>
    );
}

