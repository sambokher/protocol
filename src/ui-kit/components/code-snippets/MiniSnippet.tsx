import { useEffect, useRef, useState } from 'react';
import { Icon } from '../';

type MiniSnippetProps = {
    bgColor?: 'base-50' | 'base-100' | 'base-200',
    size?: 'small' | 'medium',
    text?: string,
    width?: 'auto' | '1/2' | 'full',
    whiteSpace?: 'wrap' | 'nowrap' | 'pre-wrap' | 'pre-line' | 'pre' | 'normal',
    highlightSyntax?: boolean,
    copyButton?: boolean,
    hasOutline?: boolean,
    maxHeight?: number,
    __juno?: any,
}

export default function MiniSnippet({
        bgColor = 'base-50',
        size = 'small',
        text = `Hello, World!`,
        width = 'full',
        whiteSpace = 'pre',
        highlightSyntax = false,
        copyButton = true,
        hasOutline = false,
        maxHeight=null,
        __juno = {},
    }: MiniSnippetProps) {
    
    const widthStyle = width == 'auto' ? `w-auto` : `w-${width} max-w-${width}`
    const sizeStyles =  size == 'small' ? `py-1.5 px-3 gap-2 text-xs` : `py-2.5 px-4 gap-3 text-sm`;
    const cornerStyles = size == "small" ? "rounded" :  "rounded-md"
    const bgStyles = `bg-${bgColor}`
    const borderStyles = hasOutline ? `border border-base-300` : `border border-transparent`

    const classes = `flex flex-col ${widthStyle} ${borderStyles} ${cornerStyles} ${bgStyles} relative group`

    let contentClasses = `flex flex-row justify-between font-medium items-start overflow-y-scroll relative group flex-shrink-0 font-mono select-text  ${sizeStyles} w-full`


    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); 
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
    }
    const buttonOffsets = size == 'small' ? 'top-1 right-1.5' : 'top-2 right-2.5'

    const [expanded, setExpanded] = useState(false); 
    const [isOverflowing, setIsOverflowing] = useState(false);

    const contentRef = useRef(null);

    useEffect(() => {  
       if (!maxHeight || maxHeight == null) return;
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
        }
    }, [maxHeight, text]);



    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            <pre 
                style={{ whiteSpace, maxHeight: expanded ? 'none' : maxHeight, overflowX: 'scroll', overflowY: 'hidden', minHeight: '1.5em'}} className={contentClasses}
                ref={contentRef}>
                    <code>
                {text}
                </code>
            </pre>

            {/* COPY BUTTON */}
            {copyButton && <div 
                className={`absolute ${buttonOffsets} ${bgStyles} transition-all rounded z-10 flex items-center justify-center cursor-pointer group p-0.5`}
                onClick={copyToClipboard}
            >
                <Icon icon={copied ? 'check' : 'copy'} className={`hover:scale-110 transition-all duration-150 ${size == "small" ? "w-4 h-4" : "w-5 h-5"}`} size={size =='small' ? '16px' : '20px'} />
            </div>}

             {/* SHOW MORE BUTTON */}
            {maxHeight && isOverflowing &&  (
                <button 
                    className={`py-2 self-center mx-auto text-xs text-primary opacity-50 hover:opacity-100 transition-all duration-150`} 
                    onClick={() => setExpanded(!expanded)}
                >
                    {!expanded ? 'Expand' : 'Collapse'}
                </button>
            )}
        </div>
    );
}



