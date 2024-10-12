import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Icon } from '../';
import { IconType, allIconNames } from '../iconMap';

const sampleTabs = [
    { label: 'Home', value: 'home', icon: 'home' },
    { label: 'Help', value: 'help', icon: 'support' },
    { label: 'Settings', value: 'settings', icon: 'settings' },
    { label: 'Balances', value: 'balances', icon: 'chart-up' },
];

type TabsVerticalProps = {
    tabs?: { label: string, value: string, icon?: IconType }[],
    value?: string,
    width?: 'auto' | 'full',
    side?: 'left' | 'right',
    selectColor?: 'primary' | 'accent' | 'base-content' | 'base-700' | 'base-500' | 'base-300' | 'base-100',
    size?: 'small' | 'medium' | 'large',
    showBorder?: boolean,
    onChange?: (value: string) => void,
    __juno?: any
}

export default function TabsVertical({
    tabs: externalTabs,
    value: externalValue,
    width = 'auto',
    selectColor = 'accent',
    size = 'medium',
    side = 'left',
    showBorder = false,
    onChange,
    __juno = {}
}: TabsVerticalProps) {

    const [internalTabs, setInternalTabs] = useState(externalTabs || sampleTabs);
    const [selectedTab, setSelectedTab] = useState(externalValue || internalTabs[0].value);
    const isControlled = externalTabs !== undefined && onChange !== undefined;
    const tabs = isControlled ? externalTabs : internalTabs;

    useEffect(() => { if (externalTabs) { setInternalTabs(externalTabs); } }, [externalTabs]);
    useEffect(() => { if (externalValue) { setSelectedTab(externalValue); } }, [externalValue]);

    function handleTabClick(value) {
        if (isControlled && onChange) {
            onChange(value);
        } else {
            setSelectedTab(value);
        }
    }

    const styleMap = {
        'default': size === 'small' ? `py-0 text-xs` : size === 'large' ? `py-0 text-md` : `py-0 text-sm`
    }

    const sizeStyles = styleMap['default'];
    const widthStyle = 'w-' + width;
    const classes = `flex flex-row items-center ${widthStyle} relative`;

    const paddingStyle = size === 'small' ? 'py-1 px-1.5' : size === 'large' ? 'py-2 px-3' : 'py-1.5 px-2';
    const buttonStylesMap = {
        'default': `opacity-70 hover:opacity-100 w-full ${paddingStyle}`
    }

    const tabStyles = `cursor-pointer ${buttonStylesMap['default']}
        transition-all duration-150 font-medium 
      items-center select-none`;

    const activeStyles = `text-${selectColor} !opacity-100`;

    const tabRefs = useRef([]);

    const [underlineStyle, setUnderlineStyle] = useState({});
    useLayoutEffect(() => {
        const activeTab = tabs.findIndex(tab => tab.value === selectedTab);
        if (tabRefs.current[activeTab]) {
            const { offsetTop, clientHeight } = tabRefs.current[activeTab];
            setUnderlineStyle({
                top: offsetTop + 'px',
                height: clientHeight + 'px',
                [side]: '0px', // Set the underline on the left or right side
                width: size === 'small' ? '2px' : size === 'large' ? '3px' : '2.5px',
            });
        }
    }, [tabs, size, selectedTab, side]);

    return (
        <div
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            <div className={`w-full flex flex-col ${sizeStyles}`}>
                {tabs.map((tab, index) => (
                    <div key={index}
                        onClick={(e) => handleTabClick(tab.value)}
                        className={`${tabStyles} ${tab.value == selectedTab ? activeStyles : ''}`}
                        ref={el => tabRefs.current[index] = el}
                    >
                        <span className={`flex gap-1 whitespace-nowrap items-center`}>
                            {tab.icon && <Icon icon={tab.icon} className='scale-75 stroke-[2px]' />}
                            {tab.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Line Area */}
            {<>
                <div
                    className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} top-0 w-px h-full
                        ${showBorder ? 'bg-current-10' : 'bg-transparent'} `}
                ></div>
                <div
                    className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} bg-${selectColor} transition-all`}
                    style={underlineStyle}
                ></div>
            </>}
        </div>
    );
}


