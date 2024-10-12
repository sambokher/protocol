import { useRef } from 'react';
import { Loader, Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

type InputFileProps = {
    state?: 'loading' | 'default' | 'disabled' | 'error' | 'success',
    text?: string,
    bgColor?: 'none' | 'base-0' | 'base-100',
    size?: 'small' | 'medium' | 'large',
    label?: string,
    helperText?: string,
    icon?: IconType,
    textAlign?: 'left' | 'center' | 'right',
    hasOutline?: boolean,
    width?: 'auto' | '1/2' | 'full',
    onChange?: (files: FileList) => void,
    accept?: string,
    __juno?: any
}

export default function InputFile({
        state = 'default',
        text = 'Choose File',
        bgColor = null,
        size = 'medium',
        label = 'File Upload',
        helperText = 'help text',
        icon = 'cloud-upload',
        textAlign,
        hasOutline = true,
        width = 'auto',
        onChange = () => console.log('File uploaded'),
        accept = '',
        __juno = {}
      }: InputFileProps) {

    const sizeStyles = size == 'small' ? `py-0.5 px-2 gap-1.5 text-xs` : size == 'large' ? `py-2 px-3 gap-3 text-base` : `py-1.5 px-2 gap-3 text-sm`;
    const cornerStyles = size == "small" ? "rounded" : size == "large" ? "rounded-lg" : "rounded-md"
    
    let stateStyles = hasOutline ? `border border-base-300` : 'border border-transparent';
    switch (state) {
        case 'disabled':
            stateStyles = `bg-base-100 opacity-70 cursor-not-allowed ${hasOutline ? 'border border-base-300' : ''}`;
            break;
        case 'error':
            stateStyles = `text-warning-content ${hasOutline ? 'border border-warning' : ''}`;
            break;
        case 'success':
            stateStyles = `text-success-content ${hasOutline ? 'border border-success' : ''}`;
            break;
    }
    
    const bgStyles = (bgColor && bgColor !== 'none') ? `bg-${bgColor}` : '';
    const inputClasses = `w-full flex items-center justify-between relative truncate ellipsis box-border font-medium ${sizeStyles} ${cornerStyles} ${bgStyles} ${stateStyles}`
    
    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-medium`

    const messageTextColor = state == 'error' ? stateStyles = 'text-warning' : state == 'success' ? stateStyles = 'text-success' : ''
    const messageClasses = `text-sm font-sm ${messageTextColor}`

    const widthStyle = width != 'auto' ? `w-${width}` : size == 'small' ? 'min-w-[120px]' : size == 'large' ? 'min-w-[200px]' : 'min-w-[160px]'

    const gapStyles = size == 'small' ? 'gap-0.5' : size == 'large' ? 'gap-1.5' : 'gap-1'
    const classes = `flex flex-col ${widthStyle} ${gapStyles}`

    const IconComponent = icon ? <Icon icon={icon} className='flex-shrink-0 flex-grow-0' /> : null;

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        if (onChange) {
            onChange(event.target.files);
        }
    };

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            {label && <label className={labelClasses}>{label}</label>}

                <div className={inputClasses} style={{boxSizing: 'border-box'}}>
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ 
                        opacity: '0', 
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                    }}
                    onChange={handleFileChange}
                    accept={accept}
                />

                    {state == 'loading' ? <Loader size={'small'} type='spinner' opacity='50' /> : IconComponent}
                    <div className={`flex-grow text-${textAlign}`}>{state == 'loading' ? 'Uploading' : text}</div>
                </div>
                {helperText && <span className={messageClasses}>{helperText}</span>}
            </div>
    );
}



