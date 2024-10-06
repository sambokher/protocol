import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Icon } from '.';
import { getIconName, IconNameType } from "./iconMap";

const sampleTabs = [
    { label: 'Home', value: 'home', icon: 'home'},
    { label: 'Help', value: 'help', icon: 'support'},
    { label: 'Settings', value: 'settings', icon: 'settings'},
    { label: 'Balances', value: 'balances', icon: 'chart-up'},
];

type TabGroupProps = {
    tabs?: { label: string, value: string, icon?: IconNameType }[],
    value?: string,
    selectColor?: 'primary' | 'accent' | 'base-content' | 'base-700' | 'base-500' | 'base-300' | 'base-100',
    size?: 'small' | 'medium' | 'large',
    underlineAll?: boolean,
    style?: 'default' | 'buttons' | 'flat',
    onChange?: (value: string) => void,
    __juno?: any
}

export default function TabGroup({
        tabs: externalTabs,
        value: externalValue,
        selectColor = 'accent',
        size = 'medium',
        underlineAll = false,
        style='default',
        onChange,
        __juno = {}
    }: TabGroupProps) {
    
    const [internalTabs, setInternalTabs] = useState(externalTabs || sampleTabs);
    const [selectedTab, setSelectedTab] = useState(externalValue || internalTabs[0].value);
    const isControlled = externalTabs !== undefined && onChange !== undefined;
    const tabs = isControlled ? externalTabs : internalTabs;

    useEffect(() => {if (externalTabs) {setInternalTabs(externalTabs);}}, [externalTabs]);
    useEffect(() => {if (externalValue) {setSelectedTab(externalValue);}}, [externalValue]);     
    
    function handleTabClick(value) {
        if (isControlled && onChange) {
            onChange(value);
        } else {
            setSelectedTab(value);
        }
    }
    
    const styleMap = {
        'buttons' : size === 'small' ? `text-xs gap-1.5` : size === 'large' ? `text-md gap-3` : `text-sm gap-2`,
        'default': size === 'small' ? `py-1 text-xs gap-1.5 -ml-2` : size === 'large' ? `py-3 gap-3 text-md -ml-2` : `py-1.5 gap-2 text-sm -ml-2`,
        'flat': size === 'small' ? `py-0 text-xs gap-1.5` : size === 'large' ? `py-0 gap-3 text-md` : `py-0 gap-2 text-sm`
    }
    

    const sizeStyles = styleMap[style] || styleMap['default'];
    const classes = `flex flex-row items-center w-full relative`;

    const buttonStylesMap = {
        'buttons': 'opacity-100 hover:bg-current-10 opacity-80 hover:opacity-100 rounded-md py-0.5 px-2 ',
        'default': 'hover:bg-current-10 opacity-70 hover:opacity-100 rounded-md py-0.5 px-2 ', 
        'flat': 'hover:bg-current-5 opacity-70 hover:opacity-100 py-2 px-2'
    }
    
    const tabStyles = `cursor-pointer ${buttonStylesMap[style]}
        transition-all duration-150 font-medium 
      items-center select-none`;

    // !bg-current-10 !hover:bg-base-100 // !text-primary !hover:text-primary
    // !bg-primary/10 !bg-accent/10 !bg-base-content/10 !bg-base-700/10 !bg-base-500/10 !bg-base-300/10 !bg-base-100/10
    const activeStyles = style == 'buttons' ? `!bg-current-10 !hover:bg-current-10 text-${selectColor} !opacity-100` : `bg-current-5 !hover:bg-current-10 text-${selectColor} !opacity-100` 
    
    const tabRefs = useRef([]);
    
    const [underlineStyle, setUnderlineStyle] = useState({});
    useLayoutEffect(() => {
        const activeTab = tabs.findIndex(tab => tab.value === selectedTab);
        if (tabRefs.current[activeTab]) {
            const { offsetLeft, clientWidth } = tabRefs.current[activeTab];
            setUnderlineStyle({
                left: offsetLeft + 'px',
                width: clientWidth + 'px',
                height: size === 'small' ? '2px' : size === 'large' ? '3px' : '2.5px',
            });
        }
    }, [tabs, size, selectedTab]); 

    return (
        <div 
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            <div className={`w-full flex flex-row items-center ${sizeStyles} `}>
            {tabs.map((tab, index) => (
                <div key={index}
                onClick={(e) => handleTabClick(tab.value)}
                className={`${tabStyles} ${tab.value == selectedTab ? activeStyles : ''}`}
                ref={style === 'flat' ? el => tabRefs.current[index] = el : null}
                >   
                    <span className='flex flex-row gap-1 whitespace-nowrap items-center'
                     ref={style !== 'flat' ? el => tabRefs.current[index] = el : null}
                    >   
                    {tab.icon && <Icon icon={tab.icon} className='scale-75 -ml-1 stroke-[2px]' />}
                    {tab.label}</span>
                </div>
            ))}
            </div>

            {/* Underline Area */}
            {(style === 'default' || style === 'flat') && 
            <>
            <div 
                className={`absolute bottom-0 left-0 h-px w-full rounded-full
                ${ underlineAll ? 'bg-current-10' : 'bg-transparent'} `}
            ></div>
            <div 
                className={`absolute bottom-0 bg-${selectColor} transition-all ${style != 'flat' ? 'rounded-sm' : ''}`}
                style={underlineStyle}
            ></div>
            </>
            }
        </div>
    );
}


