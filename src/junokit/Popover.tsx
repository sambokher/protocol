import React from 'react';
import { Button, Icon } from './';

type PopoverProps = {
    text?: string,
    title?: string,
    backdrop?: 'dark' | 'blurred' | 'none',
    primaryButton?: React.ReactNode,
    secondaryButton?: React.ReactNode,
    onClose?: () => void,
    __juno?: any
}

{/* NEED TO ADD ONCLICK HANDLERS */}

export default function Popover({
        text = 'Longer message containing important information..',
        title = 'Popover Title',
        backdrop = 'dark',
        primaryButton,
        secondaryButton,
        onClose,
        __juno = {}
    }: PopoverProps) {

    // OVERLAY STYLES
    const darkBackground = `color-mix(in srgb, var(--base-content) 24%, transparent)`
    const lightBackground = `color-mix(in srgb, var(--base-content) 12%, transparent)`
    const overlayClasses = `fixed top-0 left-0 flex flex-col w-full h-full`

    // Determine background styles
    const bgStyles = `bg-base-0 text-base-content`;
    const borderStyles = `border border-base-300`;
    const sizeStyles = `w-full max-w-[400px] min-h-[200px] max-h-[2/3] rounded-md`

    const classes  = `flex flex-col relative items-stretch md:mt-32 justify-start shadow-md mx-auto ${bgStyles} ${sizeStyles} ${borderStyles}`

    const titleClasses = `flex flex-row items-start text-base font-medium w-full justify-between border-b border-base-200 px-3 py-2`
    const noTitle = !title || title === ''
    return (
        /* Overlay */
        <div  
        className={overlayClasses} 
        {...__juno?.attributes} /* do we put them here or on the drawer */
        style={{
            backgroundColor: backdrop == 'none' ? 'transparent' : backdrop == 'dark' ? darkBackground : lightBackground,
            zIndex: 50, 
            backdropFilter: backdrop == 'blurred' && 'blur(2px)',
            WebkitBackdropFilter: backdrop == 'blurred' && 'blur(2px)', /* For Safari compatibility */
        }}>
        <div className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`} >
        <Icon 
        onClick={onClose}
        icon='close' className='absolute right-2 p-0.5 rounded bg-base-0 hover:bg-base-100 top-2 cursor-pointer hover:scale-110 transition-all opacity-70 hover:opacity-100'/>
        {!noTitle && 
        <div className={titleClasses}>
            <h2 className='font-semibold text-lg'>
                    {title}
            </h2>
        </div>}

        <div className={`flex flex-col flex-grow justify-between px-3 py-2 pb-3 text-base ${noTitle ? 'pr-8' : '' }`}>
            {text}
        </div>
        {/* Buttons */}
        {(primaryButton || secondaryButton) &&
        <div className={`flex flex-row items-center mt-2 flex-grow-0 flex-shrink-0 justify-end gap-2 px-3 py-2`}>
            {secondaryButton} 
            {primaryButton}
        </div>}
        </div>
        </div>
    );
}





            