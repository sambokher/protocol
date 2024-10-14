import React, { useState, useCallback } from 'react';
import { Button, TextArea } from "../../ui-kit/index.ts";
import { useNavigate } from 'react-router-dom';
import MindMap from './MindMap.jsx';



export default function CreateAutomation({setView}) {



  const navigate = useNavigate()
  const [editable, setEditable] = useState(false)

  return (
    <>
    <div className='flex flex-row justify-between items-end w-full gap-2'>
    <div className="flex flex-col w-full gap-2 justify-start items-start">
              <div className='-ml-2'>
              <Button 
              text="Back to Automations"
              style="link"
              leftIcon="chevron-left"
              size="small"
              width="auto"
              onClick={() => navigate('/protocols')}
              /></div>
              <h1 className="text-3xl font-medium text-left flex gap-2 items-start">Diabetes Diagnosis and Monitoring</h1>
          </div>
          <Button 
          text='Save'
          style='filled'
          onClick={() => setView('list')}
          />
          </div>

    <div className="flex flex-col gap-4 w-full text-sm opacity-80">
    A diagnostic workflow for diabetes screening, including glucose tests, A1C tests, and recommendations based on the results.
    </div>
      
      
      {/* MindMap Area */}
      <MindMap editable={true} />
    </>
  );
}

