import { useEffect, useState } from 'react';

const sampleOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

type RadioButtonsProps = {
    direction?: 'flex-row' | 'flex-col',
    width?: 'auto' | '1/2' | 'full',
    style?: 'standard' | 'button',
    state?: 'default' | 'disabled' | 'error' | 'success',
    size?: 'small' | 'medium' | 'large',
    options?: { label: string, value: string }[],
    onSelect?: any,
    selectedOption?: string,
    __juno?: any
}

export default function RadioButtons({ 
        direction='flex-col',
        options: externalOptions,
        state='default',
        size='medium', 
        style='standard',
        width='auto',
        onSelect, 
        selectedOption: externalSelectedOption,
        __juno = {}
    }: RadioButtonsProps) {
    
    const [internalOptions, setInternalOptions] = useState(externalOptions || sampleOptions);
    const [internalSelectedOption, setInternalSelectedOption] = useState(externalSelectedOption || null);
    const isControlled = externalOptions !== undefined && onSelect !== undefined;
    const options = isControlled ? externalOptions : internalOptions;
    const selectedOption = isControlled ? externalSelectedOption : internalSelectedOption;

    // Effect to sync internal state with external `tabs` prop
    useEffect(() => {
        if (!isControlled) {
            setInternalOptions(externalOptions || sampleOptions);
        }
    }, [externalOptions, isControlled]);

    const classes = `flex ${direction} items-stretch gap-2 w-${width} cursor-default`;

    
    function handleOptionClick(e, value) {
        e.stopPropagation();
        
        if (isControlled && onSelect) {
            onSelect(value);
        } else {
            setInternalSelectedOption(value);
        }
    }

    /*
    const handleLabelUpdate = (index) => (e) => { 
        let newOptions = [...options];
        newOptions[index].label = e.target.innerText; 
        const fakeEvent = { target: { innerText: newOptions}};
        onPropertyUpdate('options')(fakeEvent)  
    */
    
    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
            {options.map((option, index) => (
            <RadioButton 
                key={index} 
                size={size}
                style={style}
                width={'full'}
                state={state}
                label={option.label}
                isSelected={selectedOption === option.value}
                onChange={(e) => handleOptionClick(e, option.value)}
                /* junoProps={{onPropertyUpdate: () => handleLabelUpdate(index) }} */
            />
            ))}   
            
        </div>
    );
}


type RadioButtonProps = {
    width?: 'auto' | '1/2' | 'full',
    style?: 'standard' | 'button',
    state?: 'default' | 'disabled' | 'error' | 'success',
    label?: string,
    isSelected?: boolean,
    size?: 'small' | 'medium' | 'large',
    onChange?: any,
    __juno?: any
}

function RadioButton({ 
        state='default', 
        label='radio button', 
        isSelected=false, 
        style='standard',
        size='medium', 
        width='auto',
        onChange,
        __juno = {},
        
    }: RadioButtonProps) {
    
    const heightStyle = size == 'small' ? 'h-7' : size == 'large' ? 'h-12' : 'h-9';
    const sizeStyles = size == 'small' ? `gap-1.5 text-xs`: size == 'large' ? `gap-3 text-base` : `gap-2 text-sm`;
    const paddingStyles = size == 'small' ? `px-1.5` : size == 'large' ? `px-3` : `px-2`;
        
    const fillColorMap = {
        'default': `ring-1 ring-inset ring-primary bg-primary`,
        'error': `ring-1 ring-inset ring-error-focus bg-error`,
        'success': `ring-1 ring-inset ring-success-focus bg-success`,
        'disabled': 'bg-base-200 ring-1 ring-inset ring-base-300'
    };
    
    const stateStyles = isSelected ? fillColorMap[state] : 'ring-1 ring-inset ring-base-300'
    const borderStyles = isSelected ? `ring-1 ring-inset ring-primary` : `ring-1 ring-inset ring-base-200`
    const bgSttyles = isSelected ? `bg-primary/10` : `bg-transparent hover:bg-current-5 transition-all duration-75`
    
    const styleMap  = {
        standard: `flex items-start ${sizeStyles} cursor-default w-${width}`, 
        button: `flex flex-row ${paddingStyles} ${heightStyle} rounded items-center ${sizeStyles} 
        cursor-pointer w-${width} ${borderStyles} ${bgSttyles} `
    }

    const classes = styleMap[style] || styleMap['standard']

    const outerCircleDimensions = 
        style == 'standard' ? 
        size == 'small' ? 'w-4 h-4 mt-px' : size == 'large' ? 'w-6 h-6 ' : 'w-5 h-5' :
        size == 'small' ? 'w-3 h-3 mt-px' : size == 'large' ? 'w-5 h-5 ' : 'w-4 h-4'
    const outerCircleClasses = `${outerCircleDimensions} rounded-full flex items-center justify-center ${stateStyles} `

    const labelClasses = `whitespace-nowrap  ${state == 'disabled' ? 'opacity-60' : ''}`
    const checkColorMap = {
        'default': 'primary',
        'warning': 'warning-content',
        'success': 'success-content',
        'disabled': 'base-300'
    }
    const innerCircleSize = size == 'small' ? 8 : size == 'large' ? 12 : 10
    
    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
onClick={onChange}
        >
            <div className="relative flex-shrink-0 inline-block">
                <span className={outerCircleClasses}>
                    {isSelected && <div
                    style={{width: innerCircleSize, height: innerCircleSize}}
                    className={`flex-shrink-0 rounded-full bg-${checkColorMap[state]}`}
                    />}
                </span>
            </div>
            {label && <span className={labelClasses} style={{textWrap: 'nowrap'}}>{label}</span>}
        </div>
    );
}



