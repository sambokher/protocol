import * as IconoirIcons from 'iconoir-react';

type StarRatingsProps = {
    label?: string,
    ratingValue?: '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%',
    labelPosition?: 'left' | 'right',
    color?: 'base-300' | 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error',
    size?: 'xs' | 'sm' | 'base' | 'lg',
    __juno?: any
}

export default function StarRatings({
        label = '4.5',
        ratingValue = '90%', // This should be considered whether it should be a percentage string or a numeric value depending on your implementation.
        labelPosition = 'right',
        color = 'error',
        size = 'sm', // consider making this px value
        __juno = {},
      }: StarRatingsProps) {
    
    const classes = `flex flex-row gap-2 items-center text-${size}`
    const starClasses = `flex flex-row gap-1.5 flex-shrink-0 text-${color}`
    /* text-orange-500 */

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`} 
        {...__juno?.attributes}
        >
            <div className='relative flex flex-row gap-1.5 opacity-100' style={{ width: 'max-content' }}>
                    <div className='flex flex-row gap-1.5 opacity-10'>
                        {Array.from({ length: 5 }, (_, index) => <IconoirIcons.StarSolid key={index} className='flex-shrink-0' />)}
                    </div>
                    <div className={starClasses} style={{ position: 'absolute', width: ratingValue, overflow: 'hidden'}}>
                        {Array.from({ length: 5 }, (_, index) => <IconoirIcons.StarSolid key={index} className='flex-shrink-0' />)}
                    </div>
            </div>
            {label && <div className={`flex-shrink-0 leading-none font-normal`} style={{order: labelPosition === 'left' ? '-1' : 1}}>
             {label}
            </div>}
        </div>
    ); 
}



