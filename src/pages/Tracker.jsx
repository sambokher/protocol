import { useState } from "react";
import { Button, LineChart, Badge, Status, Alert, TableWidget, Icon, Tag, Link, DataCard } from "../ui-kit/index.ts"
import { statusMap } from "./data";
import { Emoji, EmojiQuite, EmojiSad } from "iconoir-react";

export default function Tracker() {
    const visits = [
        {
          id: 1,
          date: '12 Jan 24',
          status: 'Escalation',
          category: 'Weight Gain',
          summary: {
            visitSummary: {
              reason: 'Weight gain; elevated blood pressure.',
              diagnosis: 'Diagnosed with obesity and hypertension.',
            },
            vitals: {
              weight: { value: '220 lbs', color: 'error' },
              BMI: { value: '31.6', color: 'error' },
              bloodPressure: { value: '140/90 mmHg', color: 'warning' },
              heartRate: { value: '90 bpm', color: 'warning' },
            },
            bloodPanel: {
              fastingGlucose: { value: '120 mg/dL', color: 'warning' },
              cholesterol: { value: '240 mg/dL', color: 'warning' },
              ldl: { value: '160 mg/dL', color: 'warning' },
              hdl: { value: '35 mg/dL', color: 'warning' },
              triglycerides: { value: '250 mg/dL', color: 'warning' },
            },
            hormones: {
              thyroid: { value: '3.0 mIU/L', color: 'success' },
              cortisol: { value: '15 mcg/dL', color: 'success' },
              insulin: { value: '20 µU/mL', color: 'warning' },
            },
            mentalHealth: {
              status: 'concern',
              note: 'High stress levels and fatigue reported.',
            },
            covid: {
              symptoms: ['Fatigue'],
            },
            lifeStyle: {
              diet: 'high sugar',
              exercise: 'sedentary',
              sleepIssues: ['insomnia'],
              caffeineUse: 'high',
              alcohol: 'moderate',
              sleepDuration: 'low',
              stress: 'high',
              smoking: 'none',
            },
          },
        },
        {
          id: 2,
          date: '10 May 24',
          status: 'Observation',
          category: 'Weight Gain',
          summary: {
            visitSummary: {
              reason: 'Follow-up after lifestyle modifications.',
              diagnosis: 'Weight and blood pressure slightly decreased.',
            },
            vitals: {
              weight: {
                value: '210 lbs',
                color: 'error',
                change: '↓ 10 lbs',
                changeColor: 'success',
              },
              BMI: {
                value: '30.0',
                color: 'error',
                change: '↓ 1.6',
                changeColor: 'success',
              },
              bloodPressure: {
                value: '130/85 mmHg',
                color: 'error',
                change: '↓ 10/5',
                changeColor: 'success',
              },
              heartRate: {
                value: '80 bpm',
                color: 'error',
                change: '↓ 10',
                changeColor: 'success',
              },
            },
            bloodPanel: {
              fastingGlucose: {
                value: '110 mg/dL',
                color: 'warning',
                change: '↓ 10',
                changeColor: 'success',
              },
              cholesterol: {
                value: '220 mg/dL',
                color: 'warning',
                change: '↓ 20',
                changeColor: 'success',
              },
              ldl: {
                value: '140 mg/dL',
                color: 'warning',
                change: '↓ 20',
                changeColor: 'success',
              },
              hdl: {
                value: '40 mg/dL',
                color: 'warning',
                change: '↑ 5',
                changeColor: 'success',
              },
              triglycerides: {
                value: '200 mg/dL',
                color: 'warning',
                change: '↓ 50',
                changeColor: 'success',
              },
            },
            hormones: {
              thyroid: {
                value: '3.0 mIU/L',
                color: 'success',
                change: '—',
                changeColor: 'base',
              },
              cortisol: {
                value: '14 mcg/dL',
                color: 'success',
                change: '↓ 1',
                changeColor: 'base',
              },
              insulin: {
                value: '18 µU/mL',
                color: 'warning',
                change: '↓ 2',
                changeColor: 'success',
              },
            },
            mentalHealth: {
              status: 'stable',
              note: 'Slight improvement; stress levels reduced.',
            },
            covid: {
              symptoms: [],
            },
            lifeStyle: {
              diet: 'improving',
              exercise: 'moderate',
              sleepIssues: [],
              caffeineUse: 'moderate',
              alcohol: 'low',
              sleepDuration: 'normal',
              stress: 'moderate',
              smoking: 'none',
            },
          },
        },
        {
          id: 3,
          date: '8 Oct 24',
          status: 'Routine',
          category: 'Weight Gain',
          summary: {
            visitSummary: {
              reason: 'Routine check-up; continued lifestyle changes.',
              diagnosis: 'Significant improvements observed.',
            },
            vitals: {
              weight: {
                value: '200 lbs',
                color: 'warning',
                change: '↓ 10 lbs',
                changeColor: 'success',
              },
              BMI: {
                value: '28.7',
                color: 'warning',
                change: '↓ 1.3',
                changeColor: 'success',
              },
              bloodPressure: {
                value: '125/80 mmHg',
                color: 'error',
                change: '↓ 5/5',
                changeColor: 'success',
              },
              heartRate: {
                value: '70 bpm',
                color: 'success',
                change: '↓ 10',
                changeColor: 'success',
              },
            },
            bloodPanel: {
              fastingGlucose: {
                value: '95 mg/dL',
                color: 'success',
                change: '↓ 15',
                changeColor: 'success',
              },
              cholesterol: {
                value: '190 mg/dL',
                color: 'success',
                change: '↓ 30',
                changeColor: 'success',
              },
              ldl: {
                value: '120 mg/dL',
                color: 'error',
                change: '↓ 20',
                changeColor: 'success',
              },
              hdl: {
                value: '50 mg/dL',
                color: 'success',
                change: '↑ 10',
                changeColor: 'success',
              },
              triglycerides: {
                value: '150 mg/dL',
                color: 'success',
                change: '↓ 50',
                changeColor: 'success',
              },
            },
            hormones: {
              thyroid: {
                value: '3.0 mIU/L',
                color: 'success',
                change: '—',
                changeColor: 'base',
              },
              cortisol: {
                value: '13 mcg/dL',
                color: 'success',
                change: '↓ 1',
                changeColor: 'base',
              },
              insulin: {
                value: '15 µU/mL',
                color: 'success',
                change: '↓ 3',
                changeColor: 'success',
              },
            },
            mentalHealth: {
              status: 'good',
              note: 'Feeling well; stress levels low.',
            },
            covid: {
              symptoms: [],
            },
            lifeStyle: {
              diet: 'balanced',
              exercise: 'active',
              sleepIssues: [],
              caffeineUse: 'low',
              alcohol: 'minimal',
              sleepDuration: 'normal',
              stress: 'low',
              smoking: 'none',
            },
          },
        },
      ];
    const rowStyles = `h-full align-top`;
    const cellStyles = `pr-3 py-1 text-left`;
    

    const [view, setView] = useState({
        summary: true,
        vitals: true, 
        bloodPanel: true,
        hormones: true,
        mentalHealth: true,
        covid: true, 
        lifeStyle: true
    })

    return (
        <>
            <PatientInfo />
            <Trends />
          <table className="w-full text-base-content text-sm table-fixed select-none text-xs mt-10">
            <thead>
              <tr className="border-b" >
                <th style={{width: '19%'}} className={cellStyles}>Visits</th>
                {visits
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => (
                    <th key={visit.id} scope="col" style={{width: '27%'}} className={cellStyles}>
                    <div className="flex flex-row gap-2 py-1 items-center font-normal opacity-80">
                      {visit.date}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
                
            <Summary visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        <COVID visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        <LifeStyle visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        <MentalHealth visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        <Vitals  visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        <Blood visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        <Hormones visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        
            </tbody>
          </table>
        </>
      );}


function Summary({ visits, view, setView, rowStyles, cellStyles }) {
    return (
        <>
        <tr className={rowStyles}>
          <td className={cellStyles}>
            <div
              className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
              onClick={() => setView({ ...view, summary: !view.summary })}
            >
              Summary
              <div
                className={`${
                  view.mentalHealth ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>
            </div>
          </td>
          {visits
                  
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => (
                    <td key={visit.id} 
                    className={cellStyles}
                    style={{ textAlign: "left", verticalAlign: "top" }}>
                        <div className="flex flex-col gap-2 items-start justify-start">
                        <div className={`text-xs font-medium px-2 py-0.5 rounded-full bg-${statusMap[visit.status]}/20 text-${statusMap[visit.status]}-content`}>
                            {visit.status}</div>
                        
                        </div>
                    </td>
                    ))}
        </tr>
        
        {view.summary && Object.keys(visits[0].summary.visitSummary).map((param) => (
            <tr key={param}>

                <td className={`capitalize align-top text-xs ${cellStyles}`}
                >{param.replace(/([A-Z])/g, ' $1')}</td>
                {visits
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => {
                    const summary = visit.summary.visitSummary[param];
                    return (
                      <td key={visit.id} style={{ textAlign: 'left', verticalAlign: 'top' }} className={cellStyles}>
                        <div className="flex flex-col gap-2 items-start w-full justify-start text-xs">
                        {summary}
                        </div>
                      </td>
                    );
                  })}   
            </tr>
            ))}
            
                
                </>
    )
}

function MentalHealth({ visits, view, setView, rowStyles, cellStyles }) {
    return (
        <>
<tr className={rowStyles}>
          <td className={cellStyles}>
            <div
              className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
              onClick={() => setView({ ...view, mentalHealth: !view.mentalHealth })}
            >
              Mental Health
              <div
                className={`${
                  view.mentalHealth ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>
            </div>
          </td>
        
        
        {visits
                  
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => (
                    <td key={visit.id} style={{ textAlign: "left", verticalAlign: "top" }} className={cellStyles}>
                        <div className={`flex flex-col gap-2 items-start justify-start`}>
                      {visit.summary.mentalHealth.status === "good" && (
                        <Emoji className="text-success-content" />
                      )}
                      {visit.summary.mentalHealth.status === "stable" && (
                        <EmojiQuite />
                      )}
                      {visit.summary.mentalHealth.status === "concern" && (
                        <EmojiSad className="text-warning-content" />
                      )}
                      
                      </div>
                    </td>
                  ))}
              </tr>
              {view.mentalHealth &&
                            <tr>
                <td></td>
              {visits
                  
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => (
                <td key={visit.id} style={{ textAlign: "left", verticalAlign: "top" }} className={cellStyles}>
                {visit.summary.mentalHealth.note}
                </td>
                ))}
              </tr>}

              </>
    )
}
function Vitals({ visits, view, setView, rowStyles, cellStyles }) {
    return (
        <><tr className={rowStyles}>
        <td colSpan={visits.length + 1} className={cellStyles}>
          <div className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
          onClick={() => setView({...view, vitals: !view.vitals})}
          >
            Vitals
        <div className={`${view.vitals ? 'transform rotate-90' : ''} transition-all`}>
          <Icon icon="chevron-right" size="16px" />
          </div>
            </div>
        </td>
      </tr>
      {Object.keys(visits[0].summary.vitals).map((param) => (
        <tr key={param} className={`${view.vitals ? '' : 'hidden'} transition-all`}>
          <td className={`capitalize ${cellStyles}`}>{param}</td>
          {visits
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((visit) => {
              const vital = visit.summary.vitals[param];
              return (
                <td key={visit.id} 
                style={{ textAlign: "left" }}
                className={`bg-${vital.color}-surface text-${vital.color}-content ${cellStyles}`}
                >
                  <div className="flex flex-row gap-2 items-center w-full justify-start">
                  {vital.value}
                  <span className={`text-xs ${vital.changeColor ? `text-${vital.changeColor}-content` : ""}`}>
                            {vital.change}
                          </span>
                  </div>
                </td>
              );
            })}
        </tr>
      ))}
      </>
    )
}



function Blood({
    visits,
    view,
    setView,
    rowStyles, 
    cellStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
                <td colSpan={visits.length + 1} className={cellStyles}>
                  <div className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
                  onClick={() => setView({...view, bloodPanel: !view.bloodPanel})}
                  >
                    Blood Panel
                <div className={`${view.bloodPanel ? 'transform rotate-90' : ''} transition-all`}>
                  <Icon icon="chevron-right" size="16px" />
                  </div>
                    </div>
                </td>
              </tr>
              {view.bloodPanel &&
              Object.keys(visits[0].summary.bloodPanel).map((param) => (
                <tr key={param}>
                  <td className={`capitalize ${cellStyles}`}>{param.replace(/([A-Z])/g, " $1")}</td>
                  {visits
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((visit) => {
                      const panel = visit.summary.bloodPanel[param];
                      return (
                        <td key={visit.id} style={{ textAlign: "left" }}
                        className={`bg-${panel.color}-surface text-${panel.color}-content  ${cellStyles}`}>
                            <div className="flex flex-row gap-2 items-center w-full justify-start">
                          {panel.value}
                          <span className={`text-xs ${panel.changeColor ? `text-${panel.changeColor}-content` : ""}`}>
                            {panel.change}
                          </span>
                            </div>
                        </td>
                      );
                    })}
                </tr>
              ))}
              </>
    )
}


function Hormones({
    visits,
    view,
    setView,
    rowStyles, 
    cellStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
                <td colSpan={visits.length + 1} className={cellStyles}>
                  <div className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
                  onClick={() => setView({...view, hormones: !view.hormones})}
                  >
                    Hormones
                <div className={`${view.hormones ? 'transform rotate-90' : ''} transition-all`}>
                  <Icon icon="chevron-right" size="16px" />
                  </div>
                    </div>
                </td>
              </tr>
              {view.hormones && Object.keys(visits[0].summary.hormones).map((param) => (
                <tr key={param}>
                  <td className={`capitalize ${cellStyles}`}>{param}</td>
                  {visits
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((visit) => {
                      const hormone = visit.summary.hormones[param];
                      return (
                        <td key={visit.id} style={{ textAlign: "left" }}
                        className={`bg-${hormone.color}-surface text-${hormone.color}-content ${cellStyles}`}>
                          {hormone.value}
                          {hormone.change && (
                            <span
                              className={`ml-2 text-xs ${
                                hormone.color ? `text-${hormone.color}-content` : ""
                              }`}
                            >
                              {hormone.change}
                            </span>
                          )}
                        </td>
                      );
                    })}
                </tr>
              ))}</>
    )
}

function COVID({
    visits,
    view,
    setView,
    rowStyles, 
    cellStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
          <td colSpan={visits.length + 1} className={cellStyles}>
            <div
              className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
              onClick={() => setView({ ...view, covid: !view.covid })}
            >
              COVID-19
              <div
                className={`${
                  view.covid ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>
            </div>
          </td>
        </tr>
        {view.covid &&
          Object.keys(visits[0].summary.covid).map((param) => (
            <tr key={param}>
              <td className={`capitalize ${cellStyles}`}>
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
              {visits
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((visit) => {
                  const answer = visit.summary.covid[param];
                  if (Array.isArray(answer)) {
                    return (
                      <td key={visit.id} style={{ textAlign: 'left' }} className={cellStyles}>
                        <ul className="flex flex-wrap gap-1">
                          {answer.map((symptom) => (
                            <Badge key={symptom} text={symptom} size="small" />
                          ))}
                        </ul>
                      </td>
                    );
                  }
                  return (
                    <td key={visit.id} style={{ textAlign: 'left' }} className={cellStyles}>
                      {answer}
                    </td>
                  );
                })}
            </tr>
          ))}</>
    )
}

function LifeStyle({
    visits,
    view,
    setView,
    rowStyles, 
    cellStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
          <td colSpan={visits.length + 1} className={cellStyles}>
            <div
              className="flex flex-row justify-start items-center gap-2 text-md font-semibold"
              onClick={() => setView({ ...view, lifeStyle: !view.lifeStyle })}
            >
              Lifestyle
              <div
                className={`${
                  view.lifeStyle ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>
            </div>
          </td>
        </tr>
        {view.lifeStyle &&
          Object.keys(visits[0].summary.lifeStyle).map((param) => (
            <tr key={param}>
              <td className={`capitalize ${cellStyles}`}>
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
              {visits
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((visit) => {
                  const answer = visit.summary.lifeStyle[param];
                  if (Array.isArray(answer)) {
                    return (
                      <td key={visit.id} style={{ textAlign: 'left' }} className={cellStyles}>
                        <ul className="flex flex-wrap gap-1">
                          {answer.map((symptom) => (
                            <Badge key={symptom} text={symptom} size="small" />
                          ))}
                        </ul>
                      </td>
                    );
                  }
                  return (
                    <td key={visit.id} style={{ textAlign: 'left' }} className={cellStyles}>
                        <div className="flex flex-col gap-2 items-start">
                      <Badge text={answer} size="small" 
                      color={answer === 'low' ? 'success' : answer === 'moderate' ? 'warning' : 'error'}
                      style="light"
                      /></div>
                    </td>
                  );
                })}
            </tr>
          ))}</>
    )
}

function PatientInfo() {
    return (
        <div className="bg-base-50 text-xs font-normal flex justify-start items-start rounded-lg p-4">
            static patient details: photo, name, age, history, etc.
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
            <div className="grid w-full gap-3 text-base-content" style={{ alignItems: 'start', gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))' }}>
            <div className="flex flex-col flex-nowrap w-full text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-full">
                    <DataCard title="Blood Pressure" value="130/85 mmHg" />
                    <DataCard title="Cholesterol" value="190 mg/dL" />
                    <DataCard title="Glucose" value="100 mg/dL" />
                </div>
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
                
                </div>
        </div>
    )
}