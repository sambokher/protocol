import { useState } from 'react';
import { Button, Select } from '../';

const sample = `function greet(name) {
    const greeting = "Hello, " + name + "!";
    console.log(greeting);
}

greet("Alice");
greet("Bob");`

type CodeSnippetProps = {
    width?: 'auto' | '1/2' | 'full',
    size?: 'small' | 'medium',
    hasOutline?: boolean,
    text?: string,
    __juno?: any
}

export default function CodeSnippet({
        size = 'medium',
        width = 'auto',
        hasOutline = true,
        text = sample,
        __juno = {},
    }: CodeSnippetProps) {

    const widthStyle = width == 'auto' ? `w-auto` : `w-${width}`
    const sizeStyles =  size == 'small' ? `py-1 px-1.5 gap-1.5 text-xs` : `py-1.5 px-2 gap-3 text-sm`;
    const cornerStyles = size == "small" ? "rounded" :  "rounded-md"
    const headerCorners = size == "small" ? "rounded-t" :  "rounded-t-md"
    const bgStyles = `bg-base-0 text-base-content`
    const borderStyles = hasOutline ? `border border-base-300` : `border border-transparent`
    
    const classes = `flex flex-col ${widthStyle} ${borderStyles} ${cornerStyles} ${bgStyles} relative group`
    

    const snippetClasses = `w-full ${sizeStyles}`

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

    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            <div className={`flex flex-row items-center justify-between w-full ${sizeStyles} bg-base-100 ${headerCorners}`}>
                <Select size='small' />
                <Button 
                    size={'small'}
                    text={'copy'} 
                    color={'base-700'} 
                    style='outlined' 
                    leftIcon={copied ? 'check' : 'copy'}
                    onClick={copyToClipboard}/>
            </div>
            <pre className={snippetClasses} style={{ whiteSpace: 'pre-wrap' }}>
                {text}
            </pre>
        </div>
    );
}


