import { useState, useRef, useEffect } from 'react';

type InputPINProps = {
    length?: number,
    state?: 'default' | 'disabled' | 'error' | 'success',
    bgColor?: 'none' | 'base-0' | 'base-50' | 'base-100',
    size?: 'small' | 'medium' | 'large',
    width?: 'auto' | '1/2' | 'full',
    hasOutline?: boolean,
    onComplete?: (code: string) => void,
    onChange?: (code: string) => void,
    __juno?: any
}

export default function InputPIN({
        length = 4, 
        state = 'default',
        bgColor = 'base-0',
        size = 'medium',
        width = 'auto',
        hasOutline = true,
        onComplete = () => {},
        onChange = () => {}, 
        
        __juno = {}
    }: InputPINProps) {

    const [code, setCode] = useState([...Array(length)].map(() => ""));
    useEffect(() => {
        setCode([...Array(length)].map(() => ""));
    }, [length]);

    const inputs = useRef([]);

    const handleFocus = (slot) => {
        inputs.current[slot].focus();
    };

    const processInput = (e, slot) => {
        const num = e.target.value;
        if (/[^0-9]/.test(num)) return; // Only allow digits
        const newCode = [...code];
        newCode[slot] = num;
        setCode(newCode);

        if (slot !== length - 1 && num !== "") {
            handleFocus(slot + 1);
        }

        if (newCode.every(num => num !== "")) {
            onComplete(newCode.join(""));
        }

        onChange(newCode.join("")); // Trigger onChange with the full PIN code
    };

    const onKeyUp = (e, slot) => {
        if (e.key === "Backspace" && !code[slot] && slot !== 0) {
            handleFocus(slot - 1);
        }
    };

    const sizeStyles = size === 'small' ? `text-xs w-5 py-1` : size === 'large' ? `text-base w-8 py-2` : `text-sm w-7 py-1.5`;
    const cornerStyles = size === "small" ? "rounded" : size === "large" ? "rounded-lg" : "rounded-md";
    const gapStyles = size == 'small' ? 'gap-2' : size == 'large' ? 'gap-4' : 'gap-3'
    
    let stateStyles = hasOutline ? `ring-1 ring-inset ring-base-300` : 'ring-1 ring-inset ring-transparent';
    if (state === 'disabled') {
        stateStyles = `bg-base-100 opacity-70 cursor-not-allowed ${hasOutline ? 'ring-1 ring-inset ring-base-300' : ''}`;
    } else if (state === 'error') {
        stateStyles = `text-warning-content ${hasOutline ? 'ring-1 ring-inset ring-warning' : ''}`;
    } else if (state === 'success') {
        stateStyles = `text-success-content ${hasOutline ? 'ring-1 ring-inset ring-success' : ''}`;
    }

    const bgStyles = (bgColor && bgColor !== 'none') ? `bg-${bgColor}` : '';

    const widthStyle = width !== 'auto' ? `w-${width}` : 'w-auto';
    
    const classes = `flex flex-row items-center justify-evenly ${widthStyle} ${gapStyles} border border-transparent`;

    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
                {code.map((num, idx) => (
                    <input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={num}
disabled={state === 'disabled'}
                        className={`
                            ${sizeStyles} ${cornerStyles} ${bgStyles} ${stateStyles}
                             text-center focus:ring-2 focus:ring-accent 
                            ${state === 'disabled' && 'cursor-not-allowed'}`}
onChange={(e) => processInput(e, idx)}
                        /* replace to  'onKeyUp={(e) => onKeyUp(e, idx)}' */
ref={(ref) => inputs.current[idx] = ref}
                        
                    />
                ))}
            
        </div>
    );
}


