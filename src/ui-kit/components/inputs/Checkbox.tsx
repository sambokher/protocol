import React, { useEffect, useState } from 'react';

type CheckboxProps = {
    width?: 'auto' | '1/2' | 'full';
    style?: 'standard' | 'button';
    state?: 'default' | 'error' | 'disabled' | 'success';
    label?: string;
    name?: string;
    checked?: boolean;
    indeterminate?: boolean;
    size?: 'small' | 'medium' | 'large';
    onChange?: React.ChangeEventHandler;
    __juno?: any;
};

export default function Checkbox({
    width = 'auto',
    state = 'default',
    label,
    name = '',
    style = 'standard',
    checked = false,
    indeterminate = false,
    size = 'medium',
    onChange,
    __juno = null
  }: CheckboxProps) {
    
    const [isChecked, setChecked] = useState(checked);
    useEffect(() => setChecked(checked), [checked]);
    
    const heightStyles = size === 'small' ? 'h-7' : (size === 'large' ? 'h-12' : 'h-9');
    const sizeStyles = size === 'small' ? `gap-1.5 text-xs`: (size === 'large' ? `gap-3 text-base` : `gap-2 text-sm`);
    const paddingStyles = size === 'small' ? `px-1.5` : (size === 'large' ? `px-3` : `px-2`);
    const borderStyles = isChecked ? `ring-1 ring-inset ring-primary` : `ring-1 ring-inset ring-base-200`
    const bgStyles = isChecked ? `bg-primary/10` : `bg-transparent hover:bg-current-5 transition-all duration-75`
    
    const styleMap  = {
        standard: `flex items-start ${sizeStyles} cursor-default w-${width}`, 
        button: `flex flex-row ${paddingStyles} ${heightStyles} rounded items-center ${sizeStyles} 
        cursor-pointer w-${width} ${borderStyles} ${bgStyles}`
    }

    const fillColorMap = {
        'default': `ring-1 ring-inset ring-primary bg-primary`,
        'error': `ring-1 ring-inset ring-error-focus bg-error`,
        'success': `ring-1 ring-inset ring-success-focus bg-success`,
        'disabled': 'bg-base-200 ring-1 ring-inset ring-base-300'
    };

    const stateStyles = isChecked ? fillColorMap[state] : 'ring-1 ring-inset ring-base-300'
    
    const classes = styleMap[style] || styleMap.standard

    const checkboxDimensions = 
        style === 'standard' ? 
        size === 'small' ? 'w-4 h-4 mt-px rounded' : size === 'large' ? 'w-6 h-6 rounded-lg' : 'w-5 h-5 rounded-md' :
        size === 'small' ? 'w-3 h-3 mt-px rounded-sm' : size === 'large' ? 'w-5 h-5 rounded-md' : 'w-4 h-4 rounded'
    const checkboxClasses = `${checkboxDimensions} flex items-center justify-center ${stateStyles} `    

    const labelClasses = `whitespace-nowrap ${state === 'disabled' ? 'opacity-60' : ''}`
    const checkColor = 'base-0'
    const Component = __juno ? 'div' : 'label';
  
    return (
        <Component className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}>
        <input type="checkbox" name={name} onChange={ onChange || (() => setChecked(!isChecked))} checked={isChecked} className="hidden" />
            <div className="relative flex-shrink-0 inline-block">
                <span className={checkboxClasses}>
                    {isChecked ? !indeterminate ? 
                        <svg className="w-5 h-5" viewBox="0 0 20 20" aria-hidden="true" fill={`var(--${checkColor})`}>
                            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg> :
                        <svg className="w-5 h-5" viewBox="0 0 20 20" aria-hidden="true" fill={`var(--${checkColor})`}>
                            <rect x="4" y="9" width="12" height="2" />
                        </svg>
                        : null
                    }
                </span>
            </div>
            {(label && label != '') ? <span className={labelClasses} style={{textWrap: 'nowrap'}}>{label}</span> : null}
        </Component>
    );
}

