import { useState } from "react"
import { TableWidget } from "ui-kit/exports/react";
import { Button, TabGroup, Badge, Status } from "ui-kit/exports/react"
import { statusMap } from "./data";

export default function PatientExample({setShowPatient}) {

  
      const tabs = [
        // {"label":"Overview","value":"overview"},
        {"label":"Progress","value":"insights"},
        {"label":"Forms","value":"forms"},
        // {"label":"Treaments","value":"treatments"},

      ]
      const [activeTab, setActiveTab] = useState('insights');

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
                onClick={() => setShowPatient(false)}
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
            {activeTab === 'forms' && <FormsView />}      
            {activeTab === 'insights' && <ProgressView />}

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
      date: '08/10/24',
      status: 'Routine',
      category: 'Weight Gain',
      summary: {
        visitSummary:
          'Initial consultation to discuss weight gain. Patient reports a gradual increase in weight over the last 6 months despite minimal changes to diet or activity levels. No recent medication changes.',
        vitals: {
          weight: { value: '220 lbs', change: '↑ 5', color: 'warning' },
          BMI: { value: '31.6', change: '↑ 0.2' },  // No color, small change
          bloodPressure: { value: '130/85 mmHg', change: '↑ 5/3', color: 'error' },
          heartRate: { value: '72 bpm', change: '↑ 2' }, // No color, small change
        },
        bloodPanel: {
          fastingGlucose: { value: '110 mg/dL', change: '↑ 5', color: 'warning' },
          cholesterol: { value: '190 mg/dL', change: '↑ 10', color: 'warning' },
          ldl: { value: '120 mg/dL', change: '↑ 5', color: 'error' },
          hdl: { value: '40 mg/dL', change: '↓ 2', color: 'error' },
          triglycerides: { value: '180 mg/dL', change: '↑ 8' },  // No color, small change
        },
        hormones: {
          thyroid: 'TSH: 3.0 mIU/L (normal)',
          cortisol: 'AM Cortisol: 15 mcg/dL (normal)',
          insulin: '18 µU/mL (elevated)',
        },
        mentalHealth:
          'Patient reports mild stress but no significant mood disturbances. No signs of depression or anxiety. Sleep quality has been normal.',
      },
    },
    {
      id: 2,
      date: '08/11/24',
      status: 'Observation',
      category: 'Weight Gain',
      summary: {
        visitSummary:
          'Follow-up visit to assess weight loss progress. Patient reports difficulty maintaining recommended dietary changes. Some improvement in physical activity.',
        vitals: {
          weight: { value: '218 lbs', change: '↓ 2', color: 'success' },
          BMI: { value: '31.3', change: '↓ 0.3', color: 'success' },
          bloodPressure: { value: '128/80 mmHg', change: '↓ 2/5' },  // No color, small change
          heartRate: { value: '70 bpm', change: '↓ 2' }, // No color, small change
        },
        bloodPanel: {
          fastingGlucose: { value: '105 mg/dL', change: '↓ 5', color: 'success' },
          cholesterol: { value: '185 mg/dL', change: '↓ 5' },  // No color, small change
          ldl: { value: '115 mg/dL', change: '↓ 5' },  // No color, small change
          hdl: { value: '42 mg/dL', change: '↑ 2', color: 'success' },
          triglycerides: { value: '175 mg/dL', change: '↓ 5' },  // No color, small change
        },
        hormones: {
          thyroid: 'TSH: 2.9 mIU/L (normal)',
          cortisol: 'AM Cortisol: 14 mcg/dL (normal)',
          insulin: '16 µU/mL (slightly elevated)',
        },
        mentalHealth:
          'Patient expresses frustration with slow progress but remains motivated. Stress levels remain stable with no significant mood changes.',
      },
    },
    {
      id: 3,
      date: '08/12/24',
      status: 'Escalation',
      category: 'Weight Gain',
      summary: {
        visitSummary:
          'Patient reports no further weight loss and continued difficulty adhering to the prescribed diet. Complains of increased cravings and fatigue.',
        vitals: {
          weight: { value: '220 lbs', change: '↑ 2', color: 'warning' },
          BMI: { value: '31.6', change: '↑ 0.3' },  // No color, small change
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
          thyroid: 'TSH: 3.1 mIU/L (normal)',
          cortisol: 'AM Cortisol: 16 mcg/dL (normal)',
          insulin: '20 µU/mL (elevated)',
        },
        mentalHealth:
          'Patient reports increased stress and mild irritability, possibly related to lack of progress and weight regain. No signs of depression, but further monitoring may be necessary.',
      },
    },
  ];

  const cellPadding = "px-0 pr-8 py-2";

return (
  <div className="w-full overflow-x-auto text-sm">
    <table className="table-fixed w-full border-separate" style={{ borderSpacing: '0px 0', maxWidth: 1200 }}>
      <thead>
        <tr>
          {visits.map(visit => (
            <th key={visit.id} className={`${cellPadding} text-center`}>
              <div className="flex flex-row justify-between items-center">
                {visit.date}
                <Status 
                  text={visit.status}
                  color={statusMap[visit.status]}
                  size="small"
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Category */}
        <tr>
          {visits.map(visit => (
            <td key={visit.id} className={`${cellPadding} text-center`}>
              <div className="flex flex-row justify-start items-center">
                <Badge text={visit.category} size="small" color="info" style="light" />
              </div>
            </td>
          ))}
        </tr>

        {/* Summary */}
        <tr>
          {visits.map(visit => (
            <td key={visit.id} className={`${cellPadding} text-left items-start align-top`}>
              <div className="flex flex-col h-full w-full gap-4 items-start py-5">
              <p>{visit.summary.visitSummary}</p>
              <Button text="View Details" size="small" />
              </div>
            </td>
          ))}
        </tr>

        {/* Blood Panel Metrics */}
        {Object.keys(visits[0].summary.bloodPanel).map(key => (
          <tr key={key}>
            {visits.map(visit => {
              const panel = visit.summary.bloodPanel[key];
              return (
                <td key={visit.id} className={`${cellPadding} text-center`}>
                  <div className="flex flex-row justify-between items-center">
                  key
                  <span className="flex flex-row gap-2 items-baseline">{panel.value}
                  {panel.change && (
                    <span className={`ml-1 text-${panel.color} text-xs`}>
                      {panel.change}
                    </span>
                  )}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);}