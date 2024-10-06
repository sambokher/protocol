import { ButtonIcon } from './'; 
import { spacingMap } from './helpers';


type ModalProps = {
    paddingX?: '0px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px',
    paddingY?: '0px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px',
    gap?: '0px' | '8px' | '12px' | '16px' | '24px' | '32px',
    modalBackground?: 'base-100' | 'base-0' | 'base-50',
    width?: '480px' | '640px' | '780px' | '960px' | '1200px',
    corners?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl',
    backdrop?: 'dark' | 'blurred' | 'none',
    children?: any,
    onClose?: any,
    closeButton?: boolean,
    
    __juno?: any
}

export default function Modal({
        paddingX = '16px',
        paddingY = '16px',
        gap = '12px',

        modalBackground = 'base-100',
        width = '640px',
        corners = 'base',
        backdrop = 'dark',
        children,
        onClose,
        closeButton,

        __juno = {}
      }: ModalProps) {
    
    // OVERLAY STYLES
    const darkBackground = `color-mix(in srgb, var(--base-content) 24%, transparent)`
    const lightBackground = `color-mix(in srgb, var(--base-content) 12%, transparent)`
    const overlayClasses = `fixed top-0 left-0 flex flex-col w-full h-full`


    // MODAL STYLES
    const paddingStyles = `${paddingX ? `px-${spacingMap[paddingX]}` : ''} ${paddingY ? `py-${spacingMap[paddingY]}` : ''}`;
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';

    // md:rounded-sm md:rounded-base md:rounded-md md:rounded-lg md:rounded-xl md:rounded-2xl md:rounded-3xl
    const cornerStyles = corners === 'none' ? '' : `md:rounded-${corners}`;
    const modalBg = modalBackground ? `bg-${modalBackground} mx-auto text-base-content` : `mx-auto`;
    const borderStyles = `border border-base-200`;
    
    const shadowStyle = {
        '480px': 'shadow-md',
        '640px': 'shadow-md', 
        '780px': 'shadow-lg',
        '960px': 'shadow-lg',
        '1200px': 'shadow-xl',
        '1440px': 'shadow-xl',
    }[width]
    
    const classes = `flex flex-col h-full md:h-auto md:min-h-[120px] relative items-stretch justify-start mx-auto 
    md:mt-32 
    ${shadowStyle} ${modalBg} ${gapStyles} ${borderStyles} ${paddingStyles} ${cornerStyles}`
    const isMobile = window.innerWidth < 768;
    return (
        /* Overlay */
        <div  
        className={overlayClasses} 
        {...__juno?.attributes} /* do we put them here or on the drawer */
        style={{
            backgroundColor: backdrop == 'none' ? 'transparent' : backdrop == 'dark' ? darkBackground : lightBackground,
            zIndex: 100, 
            backdropFilter: backdrop == 'blurred' && 'blur(2px)',
            WebkitBackdropFilter: backdrop == 'blurred' && 'blur(2px)', /* For Safari compatibility */
        }}>
            
            {/* Modal */}
            <div 
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            style={{width: '100%', maxWidth: width,
            animation: 'fadeInUp 100ms ease-in-out',
             }}>
            {closeButton && 
            <div className={`absolute right-4 md:right-2 top-4 md:top-2 z-50 transition-all rounded-lg`}>
                <ButtonIcon icon='close' 
                size="small" 
                style={isMobile ? 'light' : 'ghost'}
                    onClick={onClose}
                />
            </div>}
            {children}
            </div>
        </div>
    );
}



