import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, AreaChart, Area } from 'recharts';
import { Icon } from '../';

const dummyData = {
    keys: ['week', 'sales'],
    values: [
        ['Aug 12', 150],
        ['Aug 19', 190],
        ['Aug 26', 180],
        ['Sep 2', 210],
        ['Sep 9', 205],
        ['Sep 16', 220],
        ['Sep 23', 240]
    ]
};

type AreaChartProps = {
    title?: string,
    width?: 'auto' | 'full' | '1/2',
    height?: '92px' | '120px' | '160px' | '200px' | '240px' | '360px',
    lineColor?: 'primary' | 'accent' | 'base-content' | 'base-0',
    lineWidth?: '1' | '2' | '3' | '4',
    lineType?: 'wavy' | 'linear',
    showGrid?: boolean,
    showDots?: boolean,
    showLabels?: boolean,
    showYAxis?: boolean,
    showXAxis?: boolean,
    backgroundColor?: 'base-0' | 'base-100' | 'base-200' | string,
    corners?: 'none' | 'sm' | 'md' | 'lg',
    emptyState?: boolean,
    emptyMessage?: string,
    data?: {
        keys: string[],
        values: any[][]
    },
    __juno?: any
}

export default function AreaChartComponent({
        backgroundColor = null, 
        width = 'full',
        height = '120px',
        lineColor = 'primary',
        lineWidth = '2',
        lineType = 'wavy',
        showDots = true,
        showLabels = true,
        showYAxis = true,
        showXAxis = true,
        showGrid = true,
        data = dummyData,
        title = 'Sales',
        emptyState = false,
        emptyMessage = 'Data may take up to 24 hrs to show',
        __juno = {}
      }: AreaChartProps) {

    const widthStyles = `w-${width}`;
    // const paddingStyles = padding === 'none' ? 'p-0' : `p-${padding}`;
    // const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;

    const bgStyles = backgroundColor && backgroundColor != 'none' ? `bg-${backgroundColor}` : ''
    const fontColorStyles = backgroundColor && backgroundColor != 'none' ? `text-base-content` : 'text-inherit'

    const classes = `flex flex-col items-stretch relative ${widthStyles} ${bgStyles} ${fontColorStyles}`

    // ${paddingStyles} ${cornerStyles}
    
    const emptyStyles = `flex flex-col justify-center items-center px-sm text-sm font-medium gap-2 rounded-md`
    
    function transformData(keys, values) {
        return values?.map(values => {
            return values.reduce((obj, val, index) => {
                obj[keys[index]] = val;
                return obj;
            }, {});
        });
    }
    
    const sampleData = data ? transformData(data?.keys, data?.values) : []    
    const sideMargins = (!showYAxis && !showLabels && !showDots && !showXAxis) ? 0 : 20

    return (
        <div
            className={`${classes} ${__juno?.outlineStyle} ${__juno?.tagStyle}`}
            {...__juno?.attributes}
        >
            {/* CHART */}
            {(!emptyState && data?.keys?.length && data?.values?.length) ?
            <div className='flex flex-row' style={{ 
                    width: '100%', 
                    height: height,  }}>
                <ResponsiveContainer width={'100%'} height="100%" >
                    <AreaChart data={sampleData} margin={{ top: 20, right: sideMargins, bottom: 0, left: sideMargins }}>
                    {showGrid && <CartesianGrid strokeDasharray="1 3" />}
                    {showXAxis && <XAxis dataKey={data.keys[0]} tick={{ fontSize: '12px'}}/>}
                    {showYAxis && <YAxis width={20} tick={{ fontSize: '12px'}}/>}
                    <Tooltip />
                    <Area 
                        type={lineType === 'wavy' ? 'monotone' : 'linear'}
                        dataKey={data.keys[1]}
                        stroke={`var(--${lineColor})`} 
                        fill={`var(--${lineColor})`} 
                        strokeWidth={lineWidth}
                        dot={showDots} 
                        activeDot={{ r: 4 }}
                    >
                        {showLabels && (
                            <LabelList 
                                dataKey={data?.keys[1]} 
                                position="top" 
                                style={{ fill: `var(--${lineColor})`, fontSize: 10 }} 
                            />
                        )}
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
            </div>
        :
        <>
        <div className={emptyStyles} style={{ height: height, backgroundColor: `color-mix(in srgb, currentColor 8%, transparent)`}}>
            <Icon icon='chart-up' />
            <span className='font-normal text-sm'>
                {emptyMessage}
            </span>
        </div>
        </>
        }
        </div>
    );
}


