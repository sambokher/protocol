import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main, Button, FlexBox, Icon, ButtonIcon, TabGroup, Badge } from "../ui-kit/index.ts"

export default function Surveys() {
    const [activeTab, setActiveTab] = useState('patient-intake');
    const [forms, setForms] = useState({
      'patient-intake': [
        { name: 'Patient Information', status: 'Completed' },
        { name: 'Medical History', status: 'Pending' },
        { name: 'Medications', status: 'In Progress' },
      ],
      assessments: [
        { name: 'Physical Assessment', status: 'Completed' },
        { name: 'Mental Health Assessment', status: 'Pending' },
      ],
      administrative: [
        { name: 'Insurance Information', status: 'Completed' },
        { name: 'Consent Form', status: 'Pending' },
      ],
      drafts: [
        { name: 'Draft Patient Info', status: 'Draft' },
        { name: 'Draft Medical History', status: 'Draft' },
      ],
    });
  
    const handleTabChange = (value) => {
      setActiveTab(value);
    };
  
    const navigate = useNavigate();
    const typeFormLink = 'https://ijfdpyldqg1.typeform.com/to/BiELCMB4'
    const typeFormEdit = 'https://admin.typeform.com/form/BiELCMB4/create?block=2547b125-d827-4290-810d-9c4e53ac25a1'
    
    return (
      <>
        <div className="flex flex-col w-full gap-2">
            <h1 className="text-3xl font-medium text-left">Surveys</h1>
        </div>
        <div className="flex flex-row flex-nowrap w-full self-auto gap-3 items-center justify-start h-auto">
            <TabGroup 
              tabs={[
                { label: "Patient Intake", value: "patient-intake", icon: "user-check" },
                { label: "Assessments", value: "assessments", icon: "clipboard-check" },
                { label: "Administrative", value: "administrative", icon: "briefcase" },
                { label: "Drafts", value: "drafts" },
              ]}
              selectColor="primary"
              value={activeTab}

              onChange={handleTabChange}
            />
            
            <Button style="filled" text="Add Survey" size="small" onClick={() => window.open(typeFormEdit, '_blank')} />
          </div>
        
        <div className="flex flex-col flex-nowrap w-full self-auto gap-4 items-start justify-start h-auto">
          {forms[activeTab].map(form => (
            <div key={form.name} className="flex items-center justify-between bg-base-50 p-3 rounded-md gap-2
            ring-[0.5px] ring-current-5 shadow-xs relative group w-full
                    hover:ring-[0.5px] hover:ring-current-10 hover:bg-base-100/10 hover:shadow-sm
                    transition-all duration-150 cursor-pointer
            "
            onClick={() => window.open(typeFormLink, '_blank')}
            >
              <div className="flex items-center gap-3">
              <Icon icon="page" className="text-base-content" />
              <span className="text-base font-medium mr-2">{form.name}</span>
              
            </div>

              
              <div className="flex items-center gap-3">
                <ButtonIcon size="small" style="ghost" icon="edit" />
                <Button style="light" text="Preview" size="small" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
