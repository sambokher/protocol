
import { Icon } from '../';
import {IconType, allIconNames} from '../iconMap';


type DataCardProps = {
    title?: string,
    value?: string,
    changeValue?: string,
    changeColor?: 'primary' | 'accent' | 'base-content' | 'success' | 'warning' | 'error' | 'info',
    textSize?: 'small' | 'medium',
    icon?: Extract<IconType, 'chart-up' | 'chart-down' | 'chart-up-down' | 'chart-down-up'>;
    helpText?: string,
    __juno?: any;
}

export default function DataCard({
        title = "Metric",
        value = "$10,500",
        changeValue = "+12%",
        changeColor = null,
        textSize = 'small',
        icon = 'chart-up',
        helpText = null,
        __juno = {}
    }: DataCardProps) {

    const sizeStyles = `w-full h-auto ${textSize == 'small' ? 'text-sm' : 'text-base'}`
    const truncateStyle = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    const classes = `flex flex-row items-stretch justify-start gap-3 ${sizeStyles}`

    const titleFont = textSize == 'small' ? 'text-base' : 'text-lg';
    const smallerFont = textSize == 'small' ? 'text-sm' : 'text-base';
    
    const IconComponent = icon ? <Icon icon={icon} /> : null;

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        {...__juno?.attributes}
        >
        {IconComponent}

        {/* CONTENT BLOCK */}
        <div className={`flex flex-col flex-grow items-start ${smallerFont} gap-1.5`} style={truncateStyle}>
            
            {title && <div className={`flex-shrink-0 flex flex-row items-center relative group`}>
                {title}
            </div>}

            {/* Value */}
            <div className='flex flex-row items-baseline gap-2' >
                    <h3 className={`${titleFont} flex flex-row font-semibold `} style={truncateStyle}>
                        {value}
                    </h3>
                    <span className={`${smallerFont} font-semibold text-${changeColor}`} style={truncateStyle}>
                        {changeValue}
                    </span>
            </div>
            

            {/* Description */}
            {helpText && <div className={`${smallerFont} -mt-1`} style={truncateStyle}>
                {helpText}
            </div>}
        </div>
        </div>
    );
}


