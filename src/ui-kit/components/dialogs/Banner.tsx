import { Button, Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

type BannerProps = {
    title?: string,
    text?: string,
    type?: 'base' | 'error' | 'warning' | 'success' | 'info',
    width?: '480px' | '640px' | '780px' | '960px' | '1200px' | '100%',
    primaryAction?: string,
    secondaryAction?: string,
    icon?:  'auto' | Extract<IconType, 'info' | 'warning' | 'error' | 'check-circle'>;
    backdrop?: 'dark' | 'blurred' | 'none',
    
    __juno?: any
}


export default function Banner({
        title = 'Banner Title',
        text = 'Banner message',
        width = '640px',
        type = 'info',
        primaryAction = 'Learn more',
        secondaryAction = 'Discard',
        icon = 'auto',
        backdrop = 'none',
        __juno = {}
      }: BannerProps) {


    
    // OVERLAY STYLES
    const darkBackground = `color-mix(in srgb, var(--base-content) 24%, transparent)`
    const lightBackground = `color-mix(in srgb, var(--base-content) 12%, transparent)`
    const overlayClasses = `absolute top-0 flex flex-col w-full h-full`

    // BANNER STYLES
    const alertStyles = 'flex flex-row items-start justify-between font-normal transition duration-100';
    const typeStyles = type != 'base' ? `text-${type}-content ring-1 ring-${type} bg-${type}-surface` : `text-base-content ring-1 ring-base-200`

    const classes = `bg-base-0 text-base px-3 py-2 pb-3 rounded-lg gap-2 flex flex-row items-start justify-start shadow-md mx-auto ${alertStyles} ${typeStyles}`

    // ICON Styles
    const iconStyleMap: {[key: string]: IconType} = {
        info: 'info',
        error: 'warning',
        base: 'info',
        warning: 'warning',
        success: 'check-circle',
    };

    const useIcon = icon == 'auto' ? iconStyleMap[type] : icon;
    const IconComponent = icon ? <Icon icon={useIcon} className='flex-shrink-0 mt-0.5' /> : null;
    
    return (
        /* Overlay */
        <div  className={overlayClasses} 
        {...__juno?.attributes}
        
        style={{
            backgroundColor: backdrop == 'none' ? 'transparent' : backdrop == 'dark' ? darkBackground : lightBackground,
            zIndex: 50, 
            backdropFilter: backdrop == 'blurred' && 'blur(2px)',
            WebkitBackdropFilter: backdrop == 'blurred' && 'blur(2px)', /* For Safari compatibility */
        }}>

        {/* Modal */}
            <div 
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            style={{width: '100%', maxWidth: width, marginTop: 60 }}>
            {IconComponent}
            <div className='flex flex-col gap-1.5 flex-grow-1 w-full items-start'>
                {title && <h2 className='font-semibold text-lg'>
                    {title}
                </h2>}
                {text}
                <div className={`flex flex-row flex-shrink-0 items-center gap-2`}>
            {primaryAction && 
                <Button 
                    text={primaryAction} 
                    size={'small'}
                    color={type == 'base' ? 'base-700' : type}
                    style={'filled'}
                    marginTop={'8px'}
                />}
            {secondaryAction && 
                <Button 
                    text={secondaryAction} 
                    size={'small'}
                    color={type == 'base' ? 'base-200' : type}
                    style={'light'}
                    marginTop={'8px'}
                />}
            </div>
            </div>
            <Icon icon='close' className='flex-shrink-0 hover:scale-110 cursor-pointer transition-all' />
            </div>
        </div>
    );
}




