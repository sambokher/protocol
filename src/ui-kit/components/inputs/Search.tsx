import React, { useState } from 'react';
import { ButtonIcon, Icon, InputText } from '../';

type InputWithoutSize = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;
type SearchProps = InputWithoutSize & {
    state?: 'default' | 'disabled' | 'error' | 'success',
    bgColor?: 'none' | 'base-0' | 'base-50' | 'base-100' | 'current-5' | 'current-10',
    size?: 'small' | 'medium' | 'large',
    label?: string,
    helperText?: string,
    includeIcon?: boolean,
    width?: 'auto' | '1/2' | 'full',
    hasOutline?: boolean,
    __juno?: any,
    
    /* React Input Props (subset) */
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    placeholder?: string,
}
export default function Search({
        size = 'medium',
        bgColor = 'current-5',
        state = 'default',
        includeIcon = true,
        width = 'auto',
        
        hasOutline = false,
        __juno = {},
        
        /* React Input Props (subset) */
        value: controlledValue,
        onChange,
        onBlur,
        onFocus,
        placeholder = 'Search',

        }: SearchProps ) {

    const [value, setValue] = useState<string>(controlledValue); 
    const [isFocused, setIsFocused] = useState(false);

    // Handle input change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange && onChange(e); // Call parent's onChange if provided
    };

    // Handle clear button click event
    const handleClear = () => {
        setValue('');
        onChange && onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>); // Trigger onChange with empty value
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

    const classes = `relative w-${width}`;

    return (
    <div 
    className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`} 
    {...__juno?.attributes}
    >
        {/* controlled input */}
        <InputText
            size={size}
            bgColor={bgColor}
            state={state}
            width={'full'}
            hasOutline={hasOutline}
            defaultValue={undefined}
            leftIcon={includeIcon ? 'search' : undefined}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}  
        />
         {(value?.length > 0 || isFocused) && (
        <div
          className={`absolute text-xs cursor-pointer rounded ${
            size === 'large' ? 'right-2' : 'right-1.5'
          } top-1/2 -translate-y-1/2 transition-all rounded-lg`}
        >
          <ButtonIcon icon="close" size="small" style="link" isPill={true} onClick={handleClear} />
        </div>
      )}
    </div>
);  
}

Search.definitions = {
    apiName: 'Search',
    displayName: 'Search Input',
    description: 'A search input component for entering search queries, featuring customizable size, background color, text, and icon position. Supports different states like placeholder, filled, and focused.',
    ai_instructions: 'search input field. has a magnifying glass icon on the left.',
    type: 'search',
    relativeSize: 'small',
    acceptedChildren: 'none',
    status: 'beta',
    package: 'Pro',
    propDefinitions: {
        width: {
            type: "width",
            options: ["auto", "1/2", "full"],
            displayName: "Width",
            default: "auto", 
            defaultOnMobile: 'full', 
            tile: '1/2'
        },
        size: {
            type: 'size',
            options: ['small', 'medium', 'large'],
            default: 'small', 
            displayName: 'Size',
            tile: '1/2'
        },
        state: {
            type: 'oneOf',
            options: ['default', 'disabled', 'error', 'success'],
            default: 'placeholder', 
            displayName: 'State',
            tile: '1/2'
        }, 
        bgColor: {
            type: 'colors',
            options: ['none', 'base-0', 'base-50', 'base-100'],
            default: 'base-100', 
            displayName: 'Background',
            tile: '1/2'
        },
        placeholder: {
            type: 'string',
            default: 'Search', 
            displayName: 'Placeholder',
        },
        includeIcon: {
            type: 'bool',
            displayName: 'Include Search Icon',
            default: true
        },
        hasOutline: {
            type: "bool",
            displayName: "Outline",
            default: false, 
            ai_instructions: 'adds base-300 1px outline',
        }, 
    }

}

