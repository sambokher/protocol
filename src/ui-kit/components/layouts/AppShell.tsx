import React, { isValidElement, ReactNode } from 'react';
import { spacingMap } from '../helpers';

type AppShellProps = {
    pageBackground?: 'base-0' | 'base-50' | 'base-100' | 'base-200' | 'base-300' | 'primary' | 'secondary' | 'accent',
    maxWidth?: 'stretch' | '960' | '1200' | '1440' | '1920',
    justifyContent?: 'center' | 'start' | 'end',
    paddingX?: "2px" | "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px" | "32px" | "48px",
    paddingY?: "2px" | "4px" | "6px" | "8px" | "10px" | "12px" | "16px" | "24px" | "32px" | "48px",
    children: React.ReactNode,
    backgroundImg?: string,
    __juno?: any
}

export default function AppShell({ 
        pageBackground='base-0', 
        maxWidth='stretch',
        justifyContent='center',
        paddingX,
        paddingY,
        backgroundImg,
        children, 
        __juno = {}
    }: AppShellProps) {

    const paddingStyles = `${paddingX ? ` px-${spacingMap[paddingX]}` : ''}${paddingY ? ` py-${spacingMap[paddingY]}` : ''}`;
    const fontColor = pageBackground?.startsWith('base') ? 'base-content' : `${pageBackground}-content`;
    const pageBgColor = `bg-${pageBackground}`;
    const fontColorValue = `text-${fontColor}`;
    
    // Ensure that parent has h-screen or replace h-full to h-screen in the classes below
    const outerClasses = `relative flex flex-col w-screen h-full flex-grow ${pageBgColor} ${fontColorValue}`;
    const innerClasses = `relative flex flex-row w-full items-start flex-grow h-full self-${justifyContent} ${paddingStyles}`
    const mainClasses = `relative flex flex-col w-full h-full items-stretch flex-grow`;

    
    // Define the groupedChildren object with string keys and arrays of ReactNode
    const groupedChildren: Record<string, ReactNode[]> = {
        Header: [],
        Hero: [],
        IconBar: [],
        Sidebar: [],
        FeaturePanel: [],
        MainArea: [], // sidepanel + main
        Footer: [],
    };
    
    /* Iterate through the children and group them accordingly */
    /* need to rewrite according to update in prod */
    React.Children.forEach(children, (child) => {
        if (isValidElement(child)) {
        const { type } = child;
    
        // Determine the default name of the component
        let typeName: string =
            typeof type === 'string' // For intrinsic elements like 'div', 'span'
            ? type
            : (type.name || 'Unknown'); // For function or class components
    
        
        // Override with props.self.componentAPIName if it exists
        typeName = child.props?.self?.componentAPIName || typeName;
        
        // Push the child to the appropriate group or default to MainArea
        if (groupedChildren[typeName]) {
            groupedChildren[typeName].push(child);
        } else {
            groupedChildren.MainArea.push(child);
        }
        }
    });

    const { Header, Hero, Footer, MainArea, IconBar, Sidebar, FeaturePanel } = groupedChildren;
    
    const noImage = !backgroundImg;
    const imageStyles = { 
        background: `url(${backgroundImg}) no-repeat center center / cover`
    };

    return (
        <div
        className={`${outerClasses} ${__juno?.outlineStyle}`}
        {...__juno?.attributes}
        style={noImage ? {} :  imageStyles} 
        >
        <div 
        className={`${innerClasses} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
        data-tag={__juno?.attributes?.['data-tag']}   
        style={{ width: '100%', maxWidth: maxWidth != 'stretch' ? `${maxWidth}px` : '100%'}}
        >
            {IconBar}
            {Sidebar}
            {FeaturePanel}
            
            {/* Main Block */}
            <div className={mainClasses} style={{minHeight: '100%', height: '100%', maxHeight: '100%', overflow: 'scroll'}}>
                {Header}
                {Hero}
                <div className={`flex flex-row flex-grow w-full justify-${justifyContent}`}>
                    {MainArea}
                </div>
                {Footer}
            </div>
        </div>
        </div>
    );
}


