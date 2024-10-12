
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, LabelList } from 'recharts';
import { Icon } from '../';

const dummyData = {
    keys: ['name', 'temperature'],
    values: [
        ['Aug 12', 45],
        ['Aug 19', 34],
        ['Aug 26', 52],
        ['Sep 2', 51],
        ['Sep 9', 52],
        ['Sep 16', 60],
        ['Sep 23', 80]
    ]
}

type BarChartProps = {
    width?: 'auto' | 'full' | '1/2',
    height?: '92px' | '120px' | '160px' | '200px' | '240px' | '360px',
    barColor?: 'primary' | 'accent' | 'base-content' | 'base-0', 
    barWidth?: 24 | 32 | 36 | 48 | number,
    barCorners?: 'none' | 'sm' | 'md' | 'lg',
    backgroundColor?: 'base-0' | 'base-100' | 'base-200' | 'none' | 'base-50',
    emptyState?: boolean,
    emptyMessage?: string,
    showGrid?: boolean,
    showDots?: boolean,
    showLabels?: boolean,
    showYAxis?: boolean,
    showXAxis?: boolean,
    data?: {
        keys: string[],
        values: any[][]
    },
    __juno?: any
}

export default function BarChartComponent({
        backgroundColor = null, 
        width = 'full',
        height = '120px',
        barColor = 'primary',
        barWidth = 32,
        barCorners = 'sm',
        showDots = true,
        showLabels = true,
        showYAxis = true,
        showXAxis = true,
        showGrid = true,
        data = dummyData,
        emptyState = false,
        emptyMessage = 'Data may take up to 24 hrs to show',
        __juno = {}
      }: BarChartProps) {

    const widthStyles = `w-${width}`;
    // const paddingStyles = padding === 'none' ? 'p-0' : `p-${padding}`;
    // const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const bgStyles = backgroundColor && backgroundColor != 'none' ? `bg-${backgroundColor}` : ''
    const fontColorStyles = backgroundColor && backgroundColor != 'none' ? `text-base-content` : 'text-inherit'

    const classes = `flex flex-col items-stretch relative ${widthStyles} ${bgStyles} ${fontColorStyles}`
    
    const emptyStyles = `flex flex-col justify-center items-center px-sm text-sm font-medium gap-2 rounded-md`

    function transformData(keys, values) {
        return values?.map(values => {
            return values?.reduce((obj, val, index) => {
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
                <BarChart data={sampleData} 
                barSize={barWidth}
                margin={{ top: 20, right: sideMargins, bottom: 0, left: sideMargins }}>
                    {showGrid && <CartesianGrid strokeDasharray="1 3" />}
                    {showXAxis && <XAxis dataKey={data?.keys[0]} tick={{ fontSize: '12px'}}/>}
                    {showYAxis && <YAxis width={20} tick={{ fontSize: '12px'}}/>}
                    <Tooltip />
                    <Bar 
                        dataKey={data?.keys[1]} 
                        fill={`var(--${barColor})`}
                        style={{ clipPath: barCorners != 'none' ? `inset(0 0 0 0 round var(--border-radius-${barCorners}))` : '' }}
                    >
                        {showLabels && (<LabelList 
                            dataKey={data?.keys[1]} 
                            position="top" 
                            style={{ fontSize: 10 }} 
                        />
                        )}
                    </Bar>
                </BarChart>
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


