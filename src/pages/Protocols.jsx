import React, { useState } from 'react';
import { Button, Badge, Icon, Search, ButtonIcon } from "../ui-kit/index.ts"

export default function Automations() {
  const [selectedAutomation, setSelectedAutomation] = useState(false);

  return (
    <>
      {selectedAutomation ? 
      <SingleView 
      setSelectedAutomation={setSelectedAutomation}
      
      /> : <ListView setSelectedAutomation={setSelectedAutomation} />}
    </>
  );
};



function ListView({ setSelectedAutomation }) {
  // Set up automations data
  const automations = [
    { id: 1, name: 'Hyperglycemia Detection', status: 'Active', type: 'Manual' },
    { id: 2, name: 'Hypoglycemia Alert System', status: 'Active', type: 'AI' },
    { id: 3, name: 'Complex Diabetes Risk Monitoring', status: 'Active', type: 'Manual' },
    { id: 4, name: 'HbA1c Management Review', status: 'Active', type: 'Manual' },
    { id: 5, name: 'Hypertension & Diabetes Control', status: 'Active', type: 'AI' },
    { id: 6, name: 'Ketone Risk Alert', status: 'Draft', type: 'Manual' },
    { id: 7, name: 'Sudden Weight Fluctuation Monitoring', status: 'Draft', type: 'Manual' },
    { id: 8, name: 'Fatigue & Vision Symptom Checker', status: 'Draft', type: 'AI' },
  ];

  // Create groups array for different categories
  const groups = [
    { title: 'Active', filter: automation => automation.status === 'Active' },
    { title: 'AI Sugestions', filter: automation => automation.type === 'AI' && automation.status !== 'Active' },
    { title: 'Drafts', filter: automation => automation.status !== 'Active' && automation.type === 'Manual' },

  ];

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-3xl font-medium text-left">Protocols</h1>
      </div>

      <div className="flex flex-row flex-nowrap w-full gap-3 items-start justify-between h-auto">
        <div className="flex flex-row w-auto gap-3 items-start">
          <Search width="auto" bgColor="base-0" hasOutline size="medium" placeholder="Search protocols" />
        </div>
        <div className="flex flex-row w-auto gap-3 items-start">
          <Button style="filled" text="Create Protocol" size="medium" rightIcon="plus" />
        </div>
      </div>

      {/* Map through the groups */}
      {groups.map(group => {
        const filteredAutomations = automations.filter(group.filter);
        return (
          <div key={group.title} className="flex flex-col gap-4 w-full text-base mt-4">
            <h2 className="text-xl font-semibold">{group.title}</h2>
            {filteredAutomations.map(automation => (
              <div key={automation.id} className="flex items-center justify-between bg-base-50 p-3 rounded-md gap-2 ring-[0.5px] ring-current-5 shadow-xs group hover:ring-current-10 hover:bg-base-100/10 hover:shadow-sm transition-all duration-150 cursor-pointer"
                onClick={() => setSelectedAutomation(true)}>
                <div className="flex items-center gap-2">
                  <Icon icon={automation.type === 'AI' ? 'flare' : 'arrow-right'}

                  className={`text-xs ${automation.type === 'AI' ? 'text-primary' : ''}`} />
                  <span className="text-base font-medium">{automation.name}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                  <ButtonIcon icon="chevron-right" style="ghost" size="small" />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}


function SingleView({ setSelectedAutomation }) {
  
  const [isEditing, setIsEditing] = useState(false);

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
              onClick={() => setSelectedAutomation(false)}
              /></div>
              <h1 className="text-3xl font-medium text-left flex gap-2 items-start">Impending Diabetic Complications
            <Badge text='active' color='success' size='small' showIndicator={true}/>

              </h1>
          </div>
    {isEditing ? 
    <div className='flex flex-row gap-4'>
    <ButtonIcon icon="trash" style="ghost" color='warning' onClick={() => setSelectedAutomation(false)} />
    <Button text='Save'  style='filled' onClick={() => setIsEditing(false)} />
    </div> :
    <ButtonIcon icon='edit' onClick={() => setIsEditing(true)} style='ghost'/>}
    </div>

    <div className="flex flex-col gap-4 w-full text-sm opacity-80">
    High-risk alert for potential diabetic complications (e.g., retinopathy, nephropathy, or cardiovascular issues). 
    </div>

    <MiroEmbed isEditing={isEditing} />
  </>

  )

}

function MiroEmbed({ isEditing }) {
  // Define the view-only and edit URLs
  const viewUrl = "https://miro.com/app/live-embed/uXjVLTvQ5ZU=/?moveToViewport=155,-123,1459,823&embedId=98038948726&embedAutoplay=true";
  const editUrl = "https://miro.com/app/live-embed/uXjVLTvQ5ZU=/?moveToViewport=155,-123,1459,823&embedId=98038948726&embedAutoplay=true";

  return (
    <div className="flex flex-col gap-4 w-full text-base h-full">
      <iframe
        width="100%"
        height="100%"
        src={isEditing ? editUrl : viewUrl}
        allowFullScreen
        allow={isEditing ? "fullscreen; clipboard-read; clipboard-write" : "fullscreen"}
      ></iframe>
    </div>
  );
}

function FigJamEmbed({ isEditing }) {
  // Define the view-only and edit URLs
  
  return (
    <iframe style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} width="100%" height="100%" className='rounded-md'
    src="https://embed.figma.com/board/P1MEiSQT2tS7Zcsp5ZiEXy/Protocol-%2F-Naples?node-id=0-1&embed-host=share" 
    allowFullScreen>

    </iframe>
  );
}