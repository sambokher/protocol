import { DatePicker } from '../';

type DateRangeProps = {
    label?: string;
    helperText?: string;
    state?: 'default' | 'error' | 'disabled' | 'success';
    bgColor?: string;
    hasOutline?: boolean;
    size?: 'small' | 'medium' | 'large';
    width?: 'auto' | '1/2' | 'full';
    
    dateFrom?: string;
    dateTo?: string;

    __juno?: any
};

export default function DateRange({
    label = '',
    helperText = '',
    
    state = 'default',
    bgColor = 'current-5',
    hasOutline= false,
    
    size = 'medium',
    width = 'auto',
    
    dateFrom = '',
    dateTo = '',

    __juno = {},
}: DateRangeProps) {
    
    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-normal`

    let stateStyles = ''
    switch (state) {
        case 'disabled':
            stateStyles = `opacity-70 cursor-not-allowed`
            break;
        case 'error':
            stateStyles = `text-warning`
            break;
        case 'success':
            stateStyles = `text-success`
            break;
    }

    const messageTextColor = state == 'error' ? stateStyles = 'text-warning' : state == 'success' ? stateStyles = 'text-success' : ''
    const messageClasses = size == 'large' ? `text-base  ${messageTextColor}` : `text-sm ${messageTextColor}`

    const gapStyles = size == 'small' ? 'gap-0.5' : size == 'large' ? 'gap-1.5' : 'gap-1'
    const classes = `flex flex-col ${width} ${gapStyles}`

    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
            
            {label && ( 
                <label className={labelClasses}>
                    {label}
                </label>
            )}
            <div className={`flex flex-row gap-2 items-center`} style={{boxSizing: 'border-box', position: 'relative'}}>
                <DatePicker 
                    size={size}
                    width={'full'}
                    state={state}
                    bgColor={bgColor}
                    hasOutline={hasOutline}
                />
                <DatePicker
                    size={size}
                    width={'full'}
                    state={state}
                    bgColor={bgColor}
                    hasOutline={hasOutline}
                />
            </div>
            {helperText && <span className={messageClasses}>
                {helperText}
            </span>}    
        </div>
    );
}

