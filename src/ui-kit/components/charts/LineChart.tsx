import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Icon } from '../';

const dummyData = {
    keys: ['week', 'visitors'],
    values: [
        ['Aug 12', 1200],
        ['Aug 19', 1340],
        ['Aug 26', 1280],
        ['Sep 2', 1400],
        ['Sep 9', 1450],
        ['Sep 16', 1500],
        ['Sep 23', 1550]
    ]
}

type LineChartProps = {
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
    emptyState?: boolean,
    emptyMessage?: string,
    bottomDomain?: number | 'auto',
    topDomain?: number | 'auto',
    data?: {
        keys: string[],
        values: any[][]
    },
    __juno?: any
}

export default function LineChartComponent({
        backgroundColor,
        width = 'full',
        height = '120px',
        lineColor = 'primary',
        lineWidth = '2',
        lineType = 'wavy',
        showDots = true,
        showLabels,
        showYAxis,
        showXAxis= true,
        showGrid,
        data = dummyData,  
        emptyState,
        emptyMessage = 'empty message',
        bottomDomain = 'auto',
        topDomain = 'auto',
        __juno = {}
      }: LineChartProps) {

    const widthStyles = `w-${width}`;
    // const paddingStyles = padding === 'none' ? 'p-0' : `p-${padding}`;
    // const cornerStyles = corners === 'none' ? '' : `rounded-${corners}`;
    const bgStyles = backgroundColor && backgroundColor != 'none' ? `bg-${backgroundColor}` : ''
    const fontColorStyles = backgroundColor && backgroundColor != 'none' ? `text-base-content` : 'text-inherit'

    const classes = `flex flex-col items-stretch relative ${widthStyles} ${bgStyles} ${fontColorStyles}`
    
    const emptyStyles = `flex flex-col justify-center items-center px-sm text-sm font-medium gap-2 rounded-md`

    function transformData(keys: string[], values: any[][]) {
        return values?.map((values: any[]) => {
            return values?.reduce((obj: any, val: any, index: number) => {
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
                <LineChart data={sampleData} margin={{ top: 20, right: sideMargins, bottom: 0, left: sideMargins }}>
                    {showGrid && <CartesianGrid strokeDasharray="1 3" />}
                    {showXAxis && <XAxis dataKey={data?.keys[0]} tick={{ fontSize: '12px'}}/>}
                    {showYAxis && <YAxis width={20} tick={{ fontSize: '12px'}} domain={[bottomDomain, topDomain]} />}
                    <Tooltip />
                    <Line 
                        type={lineType === 'wavy' ? 'monotone' : 'linear'} 
                        dataKey={data?.keys[1]}
                        stroke={`var(--${lineColor})`} // Configurable line color
                        strokeWidth={lineWidth} // Configurable line width
                        dot={showDots} // Configurable dots visibility
                        activeDot={{ r: 4 }}
                        
                    >
                    {showLabels && <LabelList dataKey={data?.keys[1]} position="top" style={{ fill: `var(--${lineColor})`, fontSize: 10 }} />}
                    </Line>
                </LineChart>
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




