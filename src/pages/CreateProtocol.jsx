import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState, 
  Position 
} from 'react-flow-renderer';
import { Button, TextArea } from "../ui-kit/index.ts";

// Compact node styling and meaningful nodes for diabetes diagnosis
const initialNodes = [
  { 
    id: '1', 
    data: { label: 'Patient Screening' }, 
    position: { x: 250, y: 0 }, 
    style: { width: 180, textAlign: 'center' } 
  },
  { 
    id: '2', 
    data: { label: 'Fasting Glucose Test' }, 
    position: { x: 250, y: 120 }, 
    style: { width: 180, textAlign: 'center' } 
  },
  { 
    id: '3', 
    data: { label: 'A1C Test' }, 
    position: { x: 250, y: 240 }, 
    style: { width: 180, textAlign: 'center' } 
  },
  { 
    id: '4', 
    data: { label: 'High Risk: Retinopathy Screening' }, 
    position: { x: 100, y: 360 }, 
    style: { width: 220, textAlign: 'center' } 
  },
  { 
    id: '5', 
    data: { label: 'Low Risk: Lifestyle Changes' }, 
    position: { x: 400, y: 360 }, 
    style: { width: 180, textAlign: 'center' } 
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true, 
    sourceHandle: 'bottom', 
    targetHandle: 'top' 
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true, 
    sourceHandle: 'bottom', 
    targetHandle: 'top' 
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    label: 'High A1C', 
    animated: true, 
    sourceHandle: 'bottom', 
    targetHandle: 'top' 
  },
  { 
    id: 'e3-5', 
    source: '3', 
    target: '5', 
    label: 'Normal A1C', 
    animated: true, 
    sourceHandle: 'bottom', 
    targetHandle: 'top' 
  },
];

export default function CreateAutomation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const padding = '2'; // Adjust padding for compactness

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-3xl font-medium text-left">Diabetes Diagnosis and Monitoring</h1>
      </div>
      <div className="flex flex-col gap-4 w-full text-sm opacity-80">
        A diagnostic workflow for diabetes screening, including glucose tests, A1C tests, and recommendations based on the results.
      </div>

      {/* MindMap Area */}
      <div className={`w-full bg-base-50 flex flex-col h-full flex-grow rounded-lg relative p-${padding}`}>
        <CoPilot padding={padding} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
}

function CoPilot({ padding }) {
  const [isOpen, setIsOpen] = useState(false);
  // top-4 left-4 bottom-4 p-4 top-3 left-3 bottom-3 p-3
  return (
    <div className={`
      absolute top-${padding} left-${padding} bottom-${padding} p-0 flex flex-col gap-2 p-1 z-10
      ${isOpen ? 'w-[240px] h-[320px] ring-[0.5px] ring-current-10 shadow-sm'
         : 'w-[240px] h-[36px]'}
      
      bg-base-0 rounded-md
      transition-all duration-150 ease-in-out`}
      
      >
        <div className='flex-shrink-0 w-full flex'>
      <Button
        leftIcon='flare'
        rightIcon={isOpen ? 'chevron-up' : 'chevron-down'}
        width='full'
        text='CoPilot'
        size='small'
        style={!isOpen ? 'filled' : 'light'}
        onClick={() => setIsOpen(!isOpen)}
      />
      </div>

      {isOpen && <>
      <TextArea 
        placeholder='Describe your automation here'
        bgColor='base-0'
        hasOutline
        size='small'
        width='full'
        rows={12}
      />
      
      <Button 
        text='Upload File'
        size='small'
        width='full'
        rightIcon='upload'
      />
      <Button 
        text='Generate'
        size='small'
        width='full'
        style='filled'
        rightIcon='chevron-right'
      />
      </>}
      </div>
  )
}