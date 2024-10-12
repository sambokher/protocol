import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, LabelList, Line } from 'recharts';
import { Icon } from '../';

const dummyData = {
    keys: ['name', 'temperature', 'humidity', 'pressure'], // Keys for each series
    colors: ['primary', 'accent', 'base-500'], // Colors for each series
    values: [
      ['Aug 12', 45, 30, 52],
      ['Aug 19', 34, 40, 48],
      ['Aug 26', 52, 35, 15],
      ['Sep 2', 51, 50, 80],
      ['Sep 9', 52, 45, 73],
      ['Sep 16', 60, 55, 75],
      ['Sep 23', 80, 60, 80],
    ],
    
  };


type MultiBarChartProps = {
    width?: 'auto' | 'full' | '1/2',
    height?: '92px' | '120px' | '160px' | '200px' | '240px' | '360px',
    barWidth?: number,
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
        keys: string[];
        values: any[][];
        colors: string[];
      };
    
      __juno?: any
}

type DataPoint = {
    [key: string]: string | number;
  }

  function transformData(keys: string[], values: (string | number)[][]): DataPoint[] {
    return values.map((values) =>
      values.reduce<DataPoint>((obj, val, index) => {      
        obj[keys[index]] = val;
        return obj;
      }, {}),
    );
  }

export default function MultiBarChart({
        
    data = dummyData,

        backgroundColor,
        width = 'full',
        height = '120px',
        barWidth = 32,
        barCorners = 'sm',
        
        showDots = true,
        showLabels = true,
        showYAxis = true,
        showXAxis = true,
        showGrid = true,
        
        
        emptyState = false,
        emptyMessage = 'Data may take up to 24 hrs to show',

        __juno = {}
      }: MultiBarChartProps) {
    
    const barColor = 'primary' // fallback color
    const widthStyles = `w-${width}`;
    const bgStyles = backgroundColor && backgroundColor != 'none' ? `bg-${backgroundColor}` : ''
    const fontColorStyles = backgroundColor && backgroundColor != 'none' ? `text-base-content` : 'text-inherit'

    const classes = `flex flex-col items-stretch relative ${widthStyles} ${bgStyles} ${fontColorStyles}`
    
    const emptyStyles = `flex flex-col justify-center items-center px-sm text-sm font-medium gap-2 rounded-md`
    
    function transformData(keys, values) {
        if (!keys || !values) return [];

        return values?.map((values) =>
          values?.reduce((obj, val, index) => {
            obj[keys?.[index]] = val;
            return obj;
          }, {})
        );
      }

    const sampleData = transformData(data?.keys, data?.values);
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
                <ResponsiveContainer width={"100%"} height="100%">
            <BarChart
              data={sampleData}
              barSize={barWidth}
              margin={{ top: 20, right: sideMargins, bottom: 0, left: sideMargins }}
            >
              {showGrid && <CartesianGrid strokeDasharray="1 3" />}
              {showXAxis && <XAxis dataKey={data.keys[0]} tick={{ fontSize: "12px" }} />}
              {showYAxis && <YAxis width={20} tick={{ fontSize: "12px" }} />}
              <Tooltip />
              {/* Dynamically generate <Bar> components for each key in keys */}
              {data.keys.slice(1).map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={data.colors[index] ? `var(--${data.colors[index]}` : `var(--${barColor})`}
                  style={{
                    clipPath: barCorners !== "none" ? `inset(0 0 0 0 round var(--border-radius-${barCorners}))` : "",
                  }}
                >
                  {showLabels && <LabelList dataKey={key} position="top" style={{ fontSize: 10 }} />}
                </Bar>
              ))}
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


