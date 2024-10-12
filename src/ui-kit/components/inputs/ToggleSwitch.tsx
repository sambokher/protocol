import { useState, useEffect, ChangeEvent } from 'react'; 

type ToggleSwitchProps = {
    type?: 'current' | 'primary' | 'base-300' | 'accent' | 'warning' | 'disabled' | 'success';
    label?: string;
    checked?: boolean;
    onChange?: (...args: any[]) => void; 
    style?: 'round' | 'rectangle';
    size?: 'small' | 'medium' | 'large';
    name?: string;
    __juno?: any
};


export default function ToggleSwitch({
    label = 'toggle label',
    type = 'current',
    checked: externalValue,
    name='',
    onChange,
    style = 'round',
    size = 'medium',
    __juno = {},
}: ToggleSwitchProps) { 
    

    const isControlled = externalValue !== undefined && onChange !== undefined;
    const [isChecked, setIsChecked] = useState(externalValue || false);
    const checked = isControlled ? externalValue : isChecked; 
    
    useEffect(() => {
            setIsChecked(externalValue || false)
    }, [externalValue]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.stopPropagation();
        if (isControlled) {
            onChange?.(e); // Safe call to onChange
        } else {
            setIsChecked(e.target.checked);
        }
    }
    const sizeStyles = size == 'small' ? `gap-1.5 text-xs` : size == 'large' ? `gap-3 text-base` : `gap-2 text-sm`;

    const classes = `flex flex-row items-start ${sizeStyles} cursor-default`
    
    const switchSizeMap = {
        'small': style == 'round' ? 'w-7' : 'w-6',
        'medium': style == 'round' ? 'w-8' : 'w-7',
        'large': style == 'round' ? 'w-10' : 'w-8',
    }
    // bg-current
    const switchStyles = !checked ? `bg-current-20` : `bg-${type} text-${type}-content`
    const cornerStyles = style == 'round' ? 'rounded-full' : 'rounded-md'
    const switchClasses = `relative flex flex-row justify-${checked ? 'end' : 'start'} ${switchStyles} ${switchSizeMap[size]} ${cornerStyles} items-center select-none transition duration-75 ease-in`
    const labelClasses = `${type == 'disabled' ? 'opacity-60' : ''} cursor-default`

    
    const toggleSize = {
        'small': 18,
        'medium': 21,
        'large': 24
    }
    const toggleSpanStyle = `${type == 'disabled' ? 'bg-base-200 cursor-not-allowed': 'bg-base-0'} ${checked ? `border-${type}`: 'border-current-20'} ${cornerStyles} shadow-sm transform transition-all ease-in-out duration-75`    
    
    return (
        <label
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
<input type="checkbox" name={name} checked={checked} onChange={e => handleChange(e)} className="hidden" />
            <div className={switchClasses}>
                <div className={toggleSpanStyle}
                style={{
                    borderWidth: size == 'large' ? '2.5px' : '2px', 
                    height: toggleSize[size],
                    width: style == 'round' ? toggleSize[size] : toggleSize[size]*0.8
                
                }}
                />
            </div>
            {label && <span className={labelClasses} style={{textWrap: 'balance'}}>
            {label}
            </span>}
        </label>
    );
}

