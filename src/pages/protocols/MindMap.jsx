import React, { useState } from 'react';
import ReactFlow, { Background, Controls, useNodesState, useEdgesState } from 'react-flow-renderer';
import { mindMap } from '../data.jsx';
import { Button, TextArea } from "../../ui-kit/index.ts";

export default function MindMap({editable=false, setEditable=()=>{}}) {

    const [nodes, setNodes, onNodesChange] = useNodesState(mindMap?.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(mindMap?.edges);
  
    
    const padding = '2'; // Adjust padding for compactness
    return (
        <div className={`w-full bg-base-50 flex flex-col h-full flex-grow rounded-lg relative p-${padding}`}>
          {/* Render CoPilot only if editable */}
          {editable && <CoPilot padding={padding} />}
    
          <ReactFlow
            nodes={nodes}
            edges={edges}
            // Disable node/edge changes if not editable
            onNodesChange={editable ? onNodesChange : undefined}
            onEdgesChange={editable ? onEdgesChange : undefined}
            fitView
            nodesDraggable={editable} // Disable dragging if not editable
            nodesConnectable={editable} // Disable connection if not editable
            elementsSelectable={editable} // Disable selection if not editable
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
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