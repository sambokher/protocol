import { useState } from "react";
import { Text, LineChart, AreaChart, Badge, Image, Icon, DataCard, Grid, Alert, Button, Link, Select, TabsVertical, SidebarLink } from "../../ui-kit/index.ts"
import { ArrowDown } from "iconoir-react";


export default function Charts() {
    // Data for each chart
    const weightData = {
      keys: ['date', 'Weight'],
      values: [
        ["Jan '24", 220],
        ["May '24", 210],
        ["Oct '24", 195],
      ],
    };
  
    const bmiData = {
      keys: ['date', 'BMI'],
      values: [
        ["Jan '24", 31.6],
        ["May '24", 30.0],
        ["Oct '24", 28.0],
      ],
    };
  
    const bloodPressureData = {
      keys: ['date', 'Systolic', 'Diastolic'],
      values: [
        ["Jan '24", 140, 90],
        ["May '24", 130, 85],
        ["Oct '24", 120, 80],
      ],
    };
  
    const heartRateData = {
      keys: ['date', 'Heart Rate'],
      values: [
        ["Jan '24", 90],
        ["May '24", 80],
        ["Oct '24", 70],
      ],
    };
  
    // State to track the selected chart
    const [selectedChart, setSelectedChart] = useState('weight');
  
    // Map selected chart to its data and configuration
    const chartDataMap = {
      weight: {
        data: weightData,
        title: 'Weight',
        lineColor: 'primary',
        bottomDomain: 150,
        topDomain: 230,
        
      },
      bmi: {
        data: bmiData,
        title: 'BMI',
        lineColor: 'primary',
        bottomDomain: 25,
        topDomain: 35,

      },
      bloodPressure: {
        data: bloodPressureData,
        title: 'Blood Pressure',
        lineColor: 'primary',
        bottomDomain: 100,
        topDomain: 150,

      },
      heartRate: {
        data: heartRateData,
        title: 'Heart Rate',
        lineColor: 'primary',
        bottomDomain: 60,
        topDomain: 100,
      },
    };
  
    // Options for the chart selection buttons
    const chartOptions = [
      { value: 'weight', label: 'Weight', icon: 'chevron-down' },
      { value: 'bmi', label: 'BMI', icon: 'chart-down' },
      { value: 'bloodPressure', label: 'Blood Pressure', icon: 'heart' },
      { value: 'heartRate', label: 'Heart Rate', icon: 'activity' },
    ];
  
    // Get the data and configuration for the selected chart
    const selectedChartData = chartDataMap[selectedChart];
  
    return (
      <div className="flex flex-row w-full">
        {/* Selected Chart */}
        <div className="grid grid-cols-2 w-full pr-6 gap-5">
          {chartOptions.map((option) => (
            <div key={option.value} className="flex flex-row gap-2 items-start bg-base-50 px-5 pb-2 pt-4 rounded-lg ring-[0.5px] ring-current-10">
              <div className="flex flex-col gap-1 max-w-32 w-full h-full items-start justify-between">
                
                <span className="text-sm text-base-700">{option.label}</span>
                <div className="flex flex-col gap-1 items-start flex-grow justify-end pb-6">
                  <span className="text-3xl font-semibold text-primary-content">
                  {option.value == 'weight' && weightData.values[weightData.values.length - 1][1]}
                  {option.value == 'bmi' && bmiData.values[bmiData.values.length - 1][1]}
                  {option.value == 'bloodPressure' && bloodPressureData.values[bloodPressureData.values.length - 1][1]}
                  {option.value == 'heartRate' && heartRateData.values[heartRateData.values.length - 1][1]}
                  </span>
                  <div className="flex flex-row gap-1.5 items-baseline text-xs font-semibold text-success-content ">
                  ↓ {option.value == 'weight' && - weightData.values[2][1] + weightData.values[1][1]}
                  {option.value === 'bmi' && [parseFloat((-bmiData.values[2][1] + bmiData.values[1][1]).toFixed(1)), 0]}
                  {option.value == 'bloodPressure' && - bloodPressureData.values[2][1] + bloodPressureData.values[1][1]}
                  {option.value == 'heartRate' && - heartRateData.values[2][1] + heartRateData.values[1][1]}
                  <span className="text-base-500 font-normal">in 3 months</span>
                  </div>
                </div>
              </div>
              
            <div className="flex-grow">
            <AreaChart
              key={option.value}
              height="200px"
              data={chartDataMap[option.value].data}
              lineColor={chartDataMap[option.value].lineColor}
              lineType="wavy"
              showLabels={false}
              showDots={true}
              // showYAxis={true}
              showGrid={true}
              bottomDomain={chartDataMap[option.value].bottomDomain}
              topDomain={chartDataMap[option.value].topDomain}
              onClick={() => setSelectedChart(option.value)}
            />
            </div>
            </div>
            ))}
          </div>
      </div>
    );
  }