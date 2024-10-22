import { useState } from "react";
import { Text, LineChart, Badge, Image, Icon, DataCard, Grid, Alert, Button, Link, Select, TabsVertical, SidebarLink } from "../../ui-kit/index.ts"


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
        bottomDomain: 180,
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
        <div className="flex flex-col items-start justify-start w-full pr-6 gap-1 pt-3"
        style={{width: '21%'}}
        >
          {chartOptions.map((option) => (
            <SidebarLink 
            key={option.value}
            text={option.label}
            isActive={selectedChart === option.value}
            leftIcon={option.icon}
            size="small"
            width="full"
            hoverEffect={true}
            onClick={() => setSelectedChart(option.value)}
            />
            ))}
          </div>
        <div className="flex flex-col w-full flex-grow">
        
          <LineChart
            height="200px"
            data={selectedChartData.data}
            lineColor={selectedChartData.lineColor}
            lineType="linear"
            showLabels
            showYAxis
            bottomDomain={selectedChartData.bottomDomain}
            topDomain={selectedChartData.topDomain}
          />
        </div>
      </div>
    );
  }