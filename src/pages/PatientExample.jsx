import { useState } from "react"
import { Button, TabGroup, Badge, Status, Alert, TableWidget, Heading, Image, DataCard, LineChart } from "../ui-kit/index.ts"
import { statusMap } from "./data";
import { Emoji, EmojiQuite, EmojiSad } from "iconoir-react";
import { useNavigate } from "react-router-dom";
import Tracker from "./Tracker";

export default function PatientExample() {

    const tabs = [
      // {"label":"Overview","value":"overview"},
      {label:"Info",value:"info"},
      {label:"Visits",value:"visits"},
      {label:"Forms",value:"forms"},

      

    ]
    const [activeTab, setActiveTab] = useState(tabs[0].value)

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
                  <Button text="Schedule Form" leftIcon="none" rightIcon="calendar" />
                  <Button style="filled" text="Send Form" rightIcon="send" />
                  </>
                  }
                </div>
                </div>
            </div>
            {activeTab === 'info' && <>
            <PatientInfo />
            <Trends />
            </>}
            {activeTab === 'forms' && <FormsView />}      
            {activeTab === 'insights' && <ProgressView />}
            {activeTab === 'protocols' && <ProtocolsView />}
            {activeTab === 'visits' && <Tracker />}

      </>
  )
}



function FormsView() {
  const scheduledForms = [{"id":1,"formName":"6-month Checkin","whenScheduled":"2023-10-01","status":{"props":{"size":"small","text":"Scheduled","color":"info","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"Edit","size":"small","style":"light"}},{"component":"Button","props":{"text":"Send Now","size":"small","style":"light"}}]},{"id":2,"formName":"Diabetes Assessment","whenScheduled":"2023-10-15","status":{"props":{"size":"small","text":"Scheduled","color":"info","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"Edit","size":"small","style":"light"}},{"component":"Button","props":{"text":"Send Now","size":"small","style":"light"}}]}]
  const collectedForms = [{"id":1,"formName":"Intake Form","whenSent":"2023-09-25","whenCompleted":"2023-09-30","status":{"props":{"size":"small","text":"Completed","color":"success","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"View","size":"small","style":"light"}}]},{"id":2,"formName":"Health Survey","whenSent":"2023-09-27","whenCompleted":"","status":{"props":{"size":"small","text":"In Progress","color":"warning","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"Send Reminder","size":"small","style":"light"}}]},{"id":3,"formName":"Consent Form","whenSent":"2023-09-28","whenCompleted":"","status":{"props":{"size":"small","text":"Sent","color":"info","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"Send Reminder","size":"small","style":"light"}}]}]
  return (
    <>
    <div className="flex flex-col flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
  <h1 className="text-ellipsis text-lg     font-semibold text-left  undefined undefined" style={{ whiteSpace: 'pre-wrap' }}>
    Scheduled Forms
  </h1>
  <TableWidget corners="md" rowData={scheduledForms} textSize="sm" columnData={[{"type":"text","width":"30%","header":"Form Name","accessor":"formName","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"text","width":"20%","header":"Date Scheduled","accessor":"whenScheduled","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"object","width":"20%","header":"Status","accessor":"status","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"arrayOfObjects","width":"30%","header":"Actions","accessor":"actions","direction":"flex-row","alignItems":"center","justifyContent":"end","displayOnHoverOnly":false,"isSortable":false}]} cellPaddingX="8px" cellPaddingY="6px" />
</div>

<div className="flex flex-col flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
  <h1 className="text-ellipsis text-lg     font-semibold text-left  undefined undefined" style={{ whiteSpace: 'pre-wrap' }}>
    Collected Forms
  </h1>
  <TableWidget corners="md" rowData={collectedForms} textSize="sm" columnData={[{"type":"text","width":"25%","header":"Form Name","accessor":"formName","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"text","width":"15%","header":"Date Sent","accessor":"whenSent","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"text","width":"15%","header":"Date Completed","accessor":"whenCompleted","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"object","width":"15%","header":"Status","accessor":"status","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"arrayOfObjects","width":"30%","header":"Actions","accessor":"actions","direction":"flex-row","alignItems":"center","justifyContent":"end","displayOnHoverOnly":false,"isSortable":false}]} cellPaddingX="8px" cellPaddingY="6px" />
</div>
</>
  )
}

const ProgressView = () => {

  const visits = [
    {
      id: 1,
      date: '8 Oct 24',
      status: 'Routine',
      category: 'Weight Gain',
      summary: {
        visitSummary:
          'Initial consultation to discuss weight gain. Patient reports a gradual increase in weight over the last 6 months despite minimal changes to diet or activity levels. No recent medication changes.',
        vitals: {
          weight: { value: '220 lbs', change: '↑ 5', color: 'warning' },
          BMI: { value: '31.6', change: '↑ 0.2' },
          bloodPressure: { value: '130/85 mmHg', change: '↑ 5/3', color: 'error' },
          heartRate: { value: '72 bpm', change: '↑ 2' },
        },
        bloodPanel: {
          fastingGlucose: { value: '110 mg/dL', change: '↑ 5', color: 'warning' },
          cholesterol: { value: '190 mg/dL', change: '↑ 10', color: 'warning' },
          ldl: { value: '120 mg/dL', change: '↑ 5', color: 'error' },
          hdl: { value: '40 mg/dL', change: '↓ 2', color: 'error' },
          triglycerides: { value: '180 mg/dL', change: '↑ 8' },
        },
        hormones: {
          thyroid: { value: 'TSH: 3.0 mIU/L', change: '(normal)' },
          cortisol: { value: 'AM Cortisol: 15 mcg/dL', change: '(normal)' },
          insulin: { value: '18 µU/mL', change: '(elevated)', color: 'warning' },
        },
        mentalHealth: {
          status: 'good',
          note: 'Patient reports mild stress but no significant mood disturbances. No signs of depression or anxiety. Sleep quality has been normal.',
        },
      },
    },
    {
      id: 2,
      date: '10 May 24',
      status: 'Observation',
      category: 'Weight Gain',
      summary: {
        visitSummary:
          'Follow-up visit to assess weight loss progress. Patient reports difficulty maintaining recommended dietary changes. Some improvement in physical activity.',
        vitals: {
          weight: { value: '218 lbs', change: '↓ 2', color: 'success' },
          BMI: { value: '31.3', change: '↓ 0.3', color: 'success' },
          bloodPressure: { value: '128/80 mmHg', change: '↓ 2/5' },
          heartRate: { value: '70 bpm', change: '↓ 2' },
        },
        bloodPanel: {
          fastingGlucose: { value: '105 mg/dL', change: '↓ 5', color: 'success' },
          cholesterol: { value: '185 mg/dL', change: '↓ 5' },
          ldl: { value: '115 mg/dL', change: '↓ 5' },
          hdl: { value: '42 mg/dL', change: '↑ 2', color: 'success' },
          triglycerides: { value: '175 mg/dL', change: '↓ 5' },
        },
        hormones: {
          thyroid: { value: 'TSH: 2.9 mIU/L', change: '(normal)' },
          cortisol: { value: 'AM Cortisol: 14 mcg/dL', change: '(normal)' },
          insulin: { value: '16 µU/mL', change: '(slightly elevated)' },
        },
        mentalHealth: {
          status: 'stable',
          note: 'Patient expresses frustration with slow progress but remains motivated. Stress levels remain stable with no significant mood changes.',
        },
      },
    },
    {
      id: 3,
      date: '12 Jan 24',
      status: 'Escalation',
      category: 'Weight Gain',
      summary: {
        visitSummary:
          'Patient reports no further weight loss and continued difficulty adhering to the prescribed diet. Complains of increased cravings and fatigue.',
        vitals: {
          weight: { value: '220 lbs', change: '↑ 2', color: 'warning' },
          BMI: { value: '31.6', change: '↑ 0.3' },
          bloodPressure: { value: '132/88 mmHg', change: '↑ 4/8', color: 'warning' },
          heartRate: { value: '75 bpm', change: '↑ 5', color: 'error' },
        },
        bloodPanel: {
          fastingGlucose: { value: '112 mg/dL', change: '↑ 7', color: 'warning' },
          cholesterol: { value: '195 mg/dL', change: '↑ 10', color: 'warning' },
          ldl: { value: '125 mg/dL', change: '↑ 10', color: 'warning' },
          hdl: { value: '38 mg/dL', change: '↓ 4', color: 'error' },
          triglycerides: { value: '190 mg/dL', change: '↑ 15', color: 'warning' },
        },
        hormones: {
          thyroid: { value: 'TSH: 3.1 mIU/L', change: '(normal)' },
          cortisol: { value: 'AM Cortisol: 16 mcg/dL', change: '(normal)' },
          insulin: { value: '20 µU/mL', change: '(elevated)', color: 'warning' },
        },
        mentalHealth: {
          status: 'concern',
          note: 'Patient reports increased stress and mild irritability, possibly related to lack of progress and weight regain. No signs of depression, but further monitoring may be necessary.',
        },
      },
    },
  ];

  return (
    <>
    <Alert
      width="full"
      size="small"
      hasCloseButton
      type="info"
      text="Patient has been struggling with weight gain and difficulty adhering to dietary changes. Blood pressure and cholesterol levels have increased, and stress levels are rising. Further monitoring and intervention may be necessary."
    />
    <div 
      className="grid w-full gap-3 h-auto text-base-content text-sm"
      style={{ alignItems: 'start', gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))' }}
    >
      
      {visits
      .sort((a, b) => b.id - a.id)
      .map(visit => (
      <div 
        key={visit.id} 
        className="flex flex-col gap-5 p-4 rounded-base h-full
        ring-[0.5px] ring-current-10
        "
      >
        {/* Visit Header */}
        <div className="flex flex-row gap-2 items-center w-full justify-between">
          <h1 className="text-lg font-semibold">{visit.date}</h1>
          <Status 
            text={visit.status}
            color={statusMap[visit.status]}
            size="small"
          />
        </div>

        {/* Summary Section */}
        <div className="flex flex-col items-start gap-3 h-[180px]">
          <Badge text={visit.category} size="small" color="info" style="light" />
          <p className="mt-2">{visit.summary.visitSummary}</p>
          <Button text="View Details" size="small" />
        </div>

        {/* Vitals Section */}
        <div className="w-full">
          <h2 className="text-md font-semibold mt-4 mb-2">Vitals</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(visit.summary.vitals).map(([key, vital]) => (
              <div 
                key={key} 
                className="flex flex-row justify-between items-center"
              >
                <span className="capitalize">{key}</span>
                <span className="flex items-center">
                  {vital.value}
                  {vital.change && (
                    <span 
                      className={`ml-2 text-xs ${vital.color ? `text-${vital.color}` : ''}`}
                    >
                      {vital.change}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Blood Panel Section */}
        <div className="w-full">
          <h2 className="text-md font-semibold mt-4 mb-2">Blood Panel</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(visit.summary.bloodPanel).map(([key, panel]) => (
              <div 
                key={key} 
                className="flex flex-row justify-between items-center"
              >
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="flex items-center">
                  {panel.value}
                  {panel.change && (
                    <span 
                      className={`ml-2 text-xs text-${panel.color}`}
                    >
                      {panel.change}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hormones Section */}
          <div className="w-full">
            <h2 className="text-md font-semibold mt-4 mb-2">Hormones</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(visit.summary.hormones).map(([key, hormone]) => (
                <div 
                  key={key} 
                  className="flex flex-row justify-between items-center"
                >
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="flex items-center">
                    {hormone.value}
                    {hormone.change && (
                      <span 
                        className={`ml-2 text-xs ${hormone.color ? `text-${hormone.color}` : ''}`}
                      >
                        {hormone.change}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mental Health Section */}
          <div className="w-full">
            <h2 className="text-md font-semibold mt-4 mb-2">Mental Health</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center text-xl">
                {visit.summary.mentalHealth.status == 'good' && <Emoji className="text-success"/>}
                {visit.summary.mentalHealth.status == 'stable' && <EmojiQuite className=""/>}
                {visit.summary.mentalHealth.status == 'concern' && <EmojiSad className="text-warning"/>}

              </div>
              <div className="mt-2">
                <p>{visit.summary.mentalHealth.note}</p>
              </div>
            </div>
          </div>

      </div>
    ))}
  </div>
  </>
);}


function ProtocolsView() {
  return (
    <div>
      This view will display protocols applied to this patient.
    </div>
  )
}


function PatientInfo() {
  const patientData = {
      general: {
          legalName: 'Matthew Collins',
          preferredName: 'Matthew',
          dob: '12 Jan 1990',
          pob: 'New York, NY',
          occupation: 'Software Engineer',
          age: 34,
      }, 
      allergies: {
          medications: ['Penicillin'],
          food: ['Peanuts'],
          environmental: ['Pollen'],
      },
      history: {
          chronic: ['Astma', 'Hypertension', 'Obesity'],
          surgery: ['Appendectomy'],
          family: ['Diabetes', 'Heart Disease', 'Alcoholism'],
      }
  }
  const blockStyles = `flex flex-col flex-nowrap bg-base-50 w-1/3 text-base-content bg-base-0 gap-1 h-full rounded-base items-start justify-start`
  const titleProps ={
    textSize: "xs",
    fontWeight: "normal", 
    color: 'base-500'
  }
  return (
      <div className="text-sm font-normal flex justify-start items-start">
  
                  <div className="flex flex-row gap-4 w-full items-start justify-between">
                      <div className={`${blockStyles} !flex-row !gap-5`}>
                      <Image 
                          src="https://images.unsplash.com/photo-1696505523865-84c7c9372901?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTQ5NTB8MHwxfHNlYXJjaHwyfHxwYXNzcG9ydCUyMHBob3RvfGVufDB8fHx8MTcyOTYxMDk1N3ww&ixlib=rb-4.0.3&q=85" 
                          width="120px" 
                          height="160px" 
                          altText="" 
                          corners="md" 
                          objectFit="cover" 
                      /><div className="flex flex-col w-full gap-2 items-start justify-start">
                          <Heading text={`${patientData.general.preferredName}`} textSize="base" />
                          <span>
                          {patientData.general.occupation}
                          </span>
                          <span>
                            {patientData.general.dob}
                          </span>
                          <span>
                            {patientData.general.pob}
                          </span>
                          </div>
                      </div>
                      <div  className={blockStyles}>
                          <Heading text="Conditions"  {...titleProps}/>
                          <span>
                            {patientData.history.chronic.join(', ')}
                          </span>
                          <span>
                            {patientData.history.surgery.join(', ')}
                          </span>
                          <Heading text="History" {...titleProps}/>
                          <span>
                            {patientData.history.family.join(', ')}
                          </span>
                      </div>
                      <div  className={blockStyles}>
                          <Heading text="Medications" {...titleProps}/>
                          <span>
                            {patientData.allergies.medications.join(', ')}
                          </span>
                          <Heading text="Allergies" {...titleProps}/>
                          <span>
                            {patientData.allergies.food.join(', ')}
                          </span>
                          
                      </div>
              </div>
      </div>
  )
}

function Trends() {

  const weightData = {
      keys: ["date", "Weight"],
      values: [
          ["Jan '24", 220],
          ["May '24", 210],
          ["Oct '24", 200],
      ]
  }

  const bmiData = {
      keys: ["date", "BMI"],
      values: [
          ["Jan '24", 31.6],
          ["May '24", 30],
          ["Oct '24", 28.7],
      ]
  }

  return (
      <div className="text-xs font-normal flex justify-start items-start w-full mt-8">
          <div className="grid w-full gap-5 text-base-content" style={{ alignItems: 'start', gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))' }}>
          
              <div className="flex flex-col flex-nowrap w-full text-base-content bg-base-0 gap-2 rounded-base items-start justify-start">
                  <span className="inline-flex whitespace-pre-wrap  mb-3 font-bold text-center">
                  BMI
                  </span>
                  <LineChart height="160px" data={bmiData} lineColor="primary" lineType="linear" showLabels  
                  showYAxis bottomDomain={25} topDomain={35} />
              </div>
              <div className="flex flex-col flex-nowrap w-full text-base-content bg-base-0 gap-2 rounded-base items-start justify-start">
                  <span className="inline-flex whitespace-pre-wrap mb-3 font-bold text-center">
                  Weight (lbs)
                  </span>
                  <LineChart height="160px" data={weightData}
                  showLabels  
                   lineColor="primary" lineType="linear"  
                   showYAxis bottomDomain={150} topDomain={300}
                   />
              </div>
              <div className="flex flex-col flex-nowrap w-full text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-full">
                  <DataCard title="Blood Pressure" value="130/85 mmHg" />
                  <DataCard title="Cholesterol" value="190 mg/dL" />
                  <DataCard title="Glucose" value="100 mg/dL" />
              </div>
              </div>
      </div>
  )
}