import React, { useState } from 'react';
import { Button, TextArea, InputText, FileUpload, Select, ToggleSwitch } from 'junokit';
import { useNavigate } from 'react-router-dom';

export default function AddAIAgent({setView}) {

  const [name, setName] = useState('Protocol Name');
  const [description, setDescription] = useState('Brief protocol description');
  const [learning, setLearning] = useState(false);
  // w-1/2
  return (
    <>
    <div className='flex flex-row justify-between items-end w-full gap-2'>
    <div className="flex flex-col w-full gap-2 justify-start items-start">
              <div className='-ml-2'>
          <Button 
          text="Back to Protocols"
          style="link"
          leftIcon="chevron-left"
          size="small"
          width="auto"
          onClick={() => setView('list')}
          /></div>
              <h1 className="text-3xl font-medium text-left flex gap-2 items-start appearance-none">
              Create AI Protocol
              </h1>
          </div>
          <Button 
          text='Save'
          style='filled'
          onClick={() => setView('list')}
          />
          </div>

        
      
        <div className="flex flex-col flex-nowrap w-full gap-4 items-start justify-start">
          <InputText placeholder="Protocol Name" width="1/2" label="Name" />
          <TextArea 
             width="1/2" 
            label="Instructions" placeholder="Give AI instructions on how to perform the protocol"
            rows={12}
            />
          <FileUpload 
            label="Files" 
            width="1/2" 
            size="small" 
            dropAreaText="Add any useful files" 
            corners="md"
            />
          <Select 
            placeholder="Select a model"
            label="Model"
            width="1/2"
            options={[
              {value: 'openai', label: 'OpenAI'},
              {value: 'claude', label: 'Claude'}
            ]}
          />
          <ToggleSwitch 
            label="Enable learning" 
            width="1/2" 
            checked={learning}
            style="rectangle"
            onChange={() => setLearning(!learning)}
          />
      </div>

      
    </>
  );
}

