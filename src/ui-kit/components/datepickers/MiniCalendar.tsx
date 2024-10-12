import { useState } from 'react';
import { Icon } from '../';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, addMonths, subMonths, isToday, isSameMonth } from 'date-fns';

type MiniCalendarProps = {
    bgColor?: 'base-0' | 'base-50' | 'base-100' | 'base-200',
    selectColor?: 'accent' | 'primary' | 'base-content',
    corners?: 'none' | 'sm' | 'base' | 'md' | 'lg',
    weekStart?: 'Monday' | 'Sunday',
    hasOutline?: boolean,
    onChange?: any,
    __juno?: any
}

export default function MiniCalendar({
        bgColor = 'base-50',
        selectColor = 'accent',
        corners = 'sm',
        weekStart = 'Monday',
        onChange = () => {},
        hasOutline = false,
        __juno = {},
    }: MiniCalendarProps) {
    
    const cornerStyles = corners == 'none' ? '' : 'rounded-'+corners
    const outlineColor = (bgColor === 'base-50' || bgColor == 'base-0') ? 'base-100' : bgColor == 'base-100' ? 'base-200' : 'base-300'
    const outlineStyles = hasOutline ? 'ring-[0.5px] ring-inset ring-'+outlineColor : ''
    const classes = `flex w-full max-w-[240px] p-sm flex-col items-stretch relative text-sm select-none bg-${bgColor} ${cornerStyles} ${outlineStyles}`

    const weekdayStyle = `flex-grow-1 w-full text-center font-normal pt-2xs text-gray-500`
    const days = weekStart === 'Sunday' ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const [currentMonth, setCurrentMonth] = useState(new Date()); // YOU CAN CHANGE THIS TO A PROP
    const [selectedDate, setSelectedDate] = useState(new Date()); 

    function handleDateChange(date: Date) {
        setSelectedDate(date);
        onChange(date);
    }
    return (
        <div
        className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            {/* Month Row */}
            <div className='flex flex-row justify-between items-center w-full p-1'>
                <Icon icon='chevron-left' className='transition-all hover:scale-110 cursor-pointer' 
onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                />
                {format(currentMonth, 'MMMM yyyy')}
                <Icon icon='chevron-right'
                    className='transition-all hover:scale-110 cursor-pointer'
onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                />
            </div>

            {/* Weekdays Row */}
                <ul className='flex flex-row gap-1 w-full p-1 font-normal'>
                    {days.map((day, index) => (
                        <li key={index} className={weekdayStyle}>{day}</li>
                    ))}
                </ul>
            
            {/* Days Grid */}
            <div className='flex flex-col gap-1 w-full font-medium'>
                <DaysGrid 
                    currentMonth={currentMonth}  
                    selectedDate={selectedDate} 
                    selectColor={selectColor}
                    weekStart={weekStart}
                    setSelectedDate={handleDateChange}
                    cornerStyles={cornerStyles} />
            </div>
        </div>
    );
}

function DaysGrid({ currentMonth, selectedDate, setSelectedDate, selectColor, cornerStyles, weekStart = 'Monday' }) {
    const weekStartOptions = weekStart === 'Sunday' ? { weekStartsOn: 0 as 0 } : { weekStartsOn: 1 as 1 };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, weekStartOptions);
    let endDate = endOfWeek(monthEnd, weekStartOptions);

    const nextMonthStart = addDays(monthEnd, 1);

    const weeks = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate || weeks.length < 6) {
        let isCurrentWeek = false;
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const isInCurrentMonth = isSameMonth(day, monthStart);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);
            
            if (isCurrentDay) { isCurrentWeek = true }

            const dayClasses = `aspect-square h-8 w-8 ${cornerStyles} flex items-center justify-center ${isSelected ? 'text-base-0' : !isInCurrentMonth ? 'text-base-400' : 'text-base-content'}`;
            const currentDay = day;

            days.push(
                <div style={{ width: '14.28%' }} key={currentDay.toISOString()}>
                    <span className={`${dayClasses}`}
onClick={(e) => { e.stopPropagation(); setSelectedDate(currentDay); }}
                        style={{
                            backgroundColor:
                                isSelected ? `var(--${selectColor})` :
                                isCurrentDay ? 'color-mix(in srgb, var(--base-content) 12%, transparent)' : 'transparent',
                        }}
                    >
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        weeks.push(
            <div
                className={`flex w-full gap-0 rounded`}
                style={{backgroundColor: isCurrentWeek ? 'color-mix(in srgb, var(--base-content) 8%, transparent)' : 'transparent'}}
                key={day.getTime()}
            >
                {days}
            </div>
        );
        days = [];
    }

    /* CONDITIONAL extra week to ensure calendar has consistent height */
    if (weeks.length < 6) {
        let extraDays = [];
        let nextDay = nextMonthStart;
        for (let i = 0; i < 7; i++) {
            formattedDate = format(nextDay, 'd');
            const isSelected = isSameDay(nextDay, selectedDate);
            const isCurrentDay = isToday(nextDay);

            const dayClasses = `aspect-square h-8 w-8 rounded-full flex items-center justify-center ${isSelected ? 'text-base-content' : 'text-base-300'}`;

            extraDays.push(
                <div style={{ width: '14.28%' }} key={nextDay.toISOString()}>
                    <span className={`${dayClasses}`}
onClick={(e) => { e.stopPropagation(); setSelectedDate(nextDay); }}
                        style={{
                            backgroundColor: isSelected ? `var(--${selectColor})` : isCurrentDay ? 'color-mix(in srgb, var(--base-content) 12%, transparent)' : 'transparent',
                            color: isSelected ? 'white' : 'var(--base-content)'
                        }}>
                        {formattedDate}
                    </span>
                </div>
            );
            nextDay = addDays(nextDay, 1);
        }
        weeks.push(
            <div className="flex w-full gap-0" key={nextDay.getTime()}>
                {extraDays}
            </div>
        );
    }

    return <div className="w-full">{weeks}</div>;
}


