import { useState } from 'react';

type SliderRangeProps = {
    width?: 'auto' | '1/2' | 'full',
    barColor?: 'info-content' | 'primary' | 'accent' | 'success-content' | 'base-content' | 'warning-content' | 'error-content',
    size?: 'small' | 'medium' | 'large',
    label?: string,
    value?: number,
    minValue?: number,
    maxValue?: number,
    __juno?: any
}

export default function SliderRange({
        width = 'auto',
        barColor = 'info-content',
        size = 'medium',
        label = 'Choose Range',
        value = 50,
        minValue = 0,
        maxValue = 100,
        __juno={}
} : SliderRangeProps) {
    
    const [sliderValue, setSliderValue] = useState(value)

    const widthStyle = width != 'auto' ? `w-${width}` : size == 'small' ? 'min-w-[120px]' : size == 'large' ? 'min-w-[200px]' : 'min-w-[160px]'
    const sizeStyles = size == 'small' ? 'gap-2xs' : size == 'large' ? 'gap-sm' : 'gap-xs'
    const classes = `flex flex-col ${widthStyle} ${sizeStyles}`
    
    const handleSliderChange = (event) => {
        const newValue = event.target.value;
        setSliderValue(newValue);
    };

    const heightMap = {
        small: 8,
        medium: 10,
        large: 12
    }    

    const circleSizeMap = {
        small: `[&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2`,
        medium: `[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3`,
        large: `[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4`
    }

    const inputRangeStyles = `[&::-webkit-slider-thumb]:appearance-none ${circleSizeMap[size]} [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-base-0 [&::-webkit-slider-thumb]:ring [&::-webkit-slider-thumb]:ring-info-content`
    const labelTextSize = size == 'small' ? `text-xs` :  size == 'large' ? `text-lg`: `text-sm`;
    const labelClasses = `${labelTextSize} font-medium`

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >   
        {label && <label className={labelClasses}>{label}</label>}
        <input
                type="range"
                min={minValue}
                className={inputRangeStyles}
                max={maxValue}
                value={sliderValue}
onChange={handleSliderChange}
                style={{
                    width: '100%', 
                    height: heightMap[size],
                    cursor: 'pointer',
                    background: `linear-gradient(to right, var(--${barColor}) 0%, var(--${barColor}) ${(sliderValue-minValue)/(maxValue-minValue)*100}%,  var(--base-200) ${(sliderValue-minValue)/(maxValue-minValue)*100}%, var(--base-200) 100%)`,
                    appearance: 'none', 
                    borderRadius: 100 
                }}
            />
        <div className='justify-between flex flex-row w-full text-sm'>
                <div className='flex-shrink-0 leading-none'>{minValue}</div>
                <div className='flex-shrink-0 leading-none'>{maxValue}</div>
            </div>
        </div>
    ); 
}


