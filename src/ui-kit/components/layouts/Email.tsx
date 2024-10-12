import { spacingMap } from '../helpers';

type EmailProps = {
    width?: 'stretch' | '560' | '640' | '780' | '960',
    pageBackground?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-300' | 'primary' | 'accent',
    emailBackground?: 'none' | 'base-50' | 'base-0' | 'base-100' | 'base-200' | 'base-300' | 'primary' | 'accent',
    hasOutline?: boolean,
    corners?: 'none' | 'sm' | 'md' | 'lg',
    
    marginTop?: "24px" | "32px" | "48px" | "64px",
    paddingX?: "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px",
    paddingY?: "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px",
    gap?: "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px",
    alignItems?: 'start' | 'center' | 'end' | 'stretch',
    children: React.ReactNode,
    __juno?: any
}

export default function Email({ 
        pageBackground='base-100', 
        emailBackground='base-0',
        corners='sm',
        paddingX=null,
        paddingY=null,
        alignItems='start', 
        gap=null, 
        marginTop=null, 
        hasOutline=false,
        width='560',
        children, 
        __juno = {}
    }: EmailProps) {
    
    const gapStyles = gap ? `gap-${spacingMap[gap]}` : '';
    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;

    const fontColor = emailBackground.startsWith('base') ? 'text-base-content' : `text-${emailBackground}-content`
    const cornerStyles = corners != 'none' && `rounded-${corners}`
    const borderStyles = hasOutline ? 'ring-[0.5px] ring-current-10' : '';

    const outerClasses = `flex flex-col flex-grow w-full h-auto bg-${pageBackground} ${fontColor}`
    
    const innerClasses = `flex flex-col w-full h-auto mx-auto ${gapStyles} ${borderStyles} bg-${emailBackground} ${cornerStyles} ${paddingStyles} items-${alignItems}`

    return (
        <div 
        className={`${outerClasses} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        style={{paddingTop: marginTop}}>
            <div 
                className={`${innerClasses} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
                style={{maxWidth: width != 'stretch' ? `${width}px` : '100%'}} 
                >
                {children}
            </div>
        </div>
    );
}





