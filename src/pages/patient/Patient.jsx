import { useState } from "react"
import { Button, TabGroup } from "../../ui-kit/index.ts"
import { useNavigate } from "react-router-dom";
import Overview from "./Overview.jsx";
import FormsView from "./Forms.jsx";
import Trends from "./Trends.jsx";
import Charts from "./Charts.jsx";

export default function PatientExample() {

    const tabs = [
      // {"label":"Overview","value":"overview"},
      {label:"Overview",value:"info"},
      {label:"Progress",value:"visits"},
      {label:"Trends",value:"trends"},
      {label:"Forms",value:"forms"},
    ]
    const [activeTab, setActiveTab] = useState(tabs[1].value)

    const navitate = useNavigate()
    return (
      <>
      
      <div className="flex flex-col w-full gap-2 justify-start items-start">
            <div className='-ml-2'>
                <Button 
                text="Back to Patients"
                style="link"
                leftIcon="chevron-left"
                size="small"
                width="auto"
                onClick={()=> navitate('/patients')}
                /></div>
                <h1 className="text-3xl font-medium text-left flex gap-2 items-start">Matthew Collins</h1>
                <div className="flex flex-row gap-2 w-full justify-between items-end">
                <TabGroup tabs={tabs} value={activeTab} selectColor="primary" onChange={setActiveTab} width='full'/>
                <div className="flex flex-row gap-2">
                  {activeTab === 'forms' && <>
                  <Button text="Schedule Form" leftIcon="none" rightIcon="calendar" size="small" />
                  <Button style="filled" text="Send Form" rightIcon="send"  size="small" />
                  </>
                  }
                </div>
                </div>
            </div>
            {activeTab === 'info' && <Overview />}
            {activeTab === 'forms' && <FormsView />}      
            {activeTab === 'visits' && <Trends />}
            {activeTab === 'trends' &&  <Charts />}
         

      </>
  )
}






