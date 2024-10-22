import { useState } from "react";
import { Button, TabGroup, Badge, Status, Alert, TableWidget, Icon, Tag, Link } from "../ui-kit/index.ts"
import { statusMap } from "./data";
import { Emoji, EmojiQuite, EmojiSad } from "iconoir-react";

export default function Tracker() {

    const visits = [
        {
          id: 1,
          date: '8 Oct 24',
          status: 'Routine',
          category: 'Weight Gain',
          summary: {
            visitSummary:
            {
                reason: 'Initial consultation to discuss weight gain. Patient reports a gradual increase in weight over the last 6 months despite minimal changes to diet or activity levels. No recent medication changes.',
                diagnosis: 'Patient is overweight with a BMI of 31.6. Blood pressure and cholesterol levels are elevated. Blood glucose levels are borderline high. Hormone levels are within normal range. Mental health is stable with no signs of depression or anxiety.',
            },
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
              thyroid: { value: 'TSH: 3.0 mIU/L'},
              cortisol: { value: 'AM Cortisol: 15 mcg/dL'},
              insulin: { value: '18 µU/mL',  color: 'warning' },
            },
            mentalHealth: {
              status: 'good',
              note: 'Patient reports mild stress but no significant mood disturbances. No signs of depression or anxiety. Sleep quality has been normal.',
            },
            covid: {
                symptoms: []
            }, 
            lifeStyle: {
                diet: 'balanced',
                exercise: 'active',
                sleepIssues: [],
                caffeineUse: 'low',
                alcoholUse: 'low',
                sleepDuration: 'normal',
                stress: 'low',
                smokingUse: 'none',
              }
          },
        },
        {
          id: 2,
          date: '10 May 24',
          status: 'Observation',
          category: 'Weight Gain',
          summary: {
            visitSummary:
            {
                reason: 'Follow-up visit to assess weight loss progress. Patient reports difficulty maintaining recommended dietary changes. Some improvement in physical activity.',
                diagnosis: 'Patient has lost 2 lbs since last visit. Blood pressure and cholesterol levels have improved but remain elevated. Blood glucose levels have decreased. Hormone levels are within normal range. Mental health is stable with no significant mood changes.',
            },
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
              thyroid: { value: 'TSH: 2.9 mIU/L'},
              cortisol: { value: 'AM Cortisol: 14 mcg/dL'},
              insulin: { value: '16 µU/mL'}
            },
            mentalHealth: {
              status: 'stable',
              note: 'Patient expresses frustration with slow progress but remains motivated. Stress levels remain stable with no significant mood changes.',
            },
            covid: {
                symptoms: ['Fatigue', 'Brain fog'],
            },
            lifeStyle: {
                exercise: 'active',
                caffeineUse: 'low',
                alcoholUse: 'low',
                sleepIssues: ['insomnia', 'waking up tired'],
                sleepDuration: 'normal',
                stress: 'moderate',
                smokingUse: 'none',
              }
          },
        },
        {
          id: 3,
          date: '12 Jan 24',
          status: 'Escalation',
          category: 'Weight Gain',
          summary: {
            visitSummary:{
                reason:'Patient reports no further weight loss and continued difficulty adhering to the prescribed diet. Complains of increased cravings and fatigue.',
                diagnosis: 'Patient has regained 2 lbs since last visit. Blood pressure and cholesterol levels have increased. Blood glucose levels are elevated. Hormone levels are within normal range. Mental health is stable with no signs of depression or anxiety.',
            },
            vitals: {
              weight: { value: '220 lbs'},
              BMI: { value: '31.6' },
              bloodPressure: { value: '132/88 mmHg'},
              heartRate: { value: '75 bpm'},
            },
            bloodPanel: {
              fastingGlucose: { value: '112 mg/dL'},
              cholesterol: { value: '195 mg/dL'},
              ldl: { value: '125 mg/dL'},
              hdl: { value: '38 mg/dL'},
              triglycerides: { value: '190 mg/dL', },
            },
            hormones: {
              thyroid: { value: 'TSH: 3.1 mIU/L' },
              cortisol: { value: 'AM Cortisol: 16 mcg/dL'},
              insulin: { value: '20 µU/mL'},
            },
            mentalHealth: {
              status: 'concern',
              note: 'Patient reports increased stress and mild irritability, possibly related to lack of progress and weight regain. No signs of depression, but further monitoring may be necessary.',
            },
            covid: {
                symptoms: ['Fatigue', 'Headache', 'Cravings'],
              },
            lifeStyle: {
                diet: 'high sugar',
                exercise: 'low',
                sleepIssues: ['insomnia'],
                caffeineUse: 'high',
                alcoholUse: 'moderate',
                sleepDuration: 'low',
                stress: 'high',
                smokingUse: 'none',
            }
          },
          
        },
      ];
  
    const rowStyles = `border-t border-current-10 h-full`

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
          <table className="w-full text-base-content text-sm table-fixed border select-none ">
            <thead>
              <tr>
                <th style={{width: '19%'}}></th>
                {visits
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => (
                    <th key={visit.id} scope="col" style={{width: '27%'}}>
                    <div className="flex flex-row gap-2 py-1 items-center">
                      {visit.date}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
                
            <Summary visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        <COVID visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        <LifeStyle visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        <MentalHealth visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        <Vitals  visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        <Blood visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        <Hormones visits={visits} view={view} setView={setView} rowStyles={rowStyles} />
        
            </tbody>
          </table>
        </>
      );}


function Summary({ visits, view, setView, rowStyles }) {
    return (
        <>
        <tr className={rowStyles}>
          <td>
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
                    <td key={visit.id} style={{ textAlign: "left", verticalAlign: "top" }}>
                        <div className="flex flex-col gap-2 items-start justify-start">
                        <Status text={visit.status} size="small" color={statusMap[visit.status]} />
                        </div>
                    </td>
                    ))}
        </tr>
        
        {view.summary && Object.keys(visits[0].summary.visitSummary).map((param) => (
            <tr key={param}>

                <td className="capitalize align-top">{param.replace(/([A-Z])/g, ' $1')}</td>
                {visits
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((visit) => {
                    const summary = visit.summary.visitSummary[param];
                    return (
                      <td key={visit.id} style={{ textAlign: 'left', verticalAlign: 'top' }}>
                        <div className="flex flex-col gap-2 items-start w-full justify-start">
                        {summary}
                        {param === 'diagnosis' && <Link text="details" textSize="sm" />}
                        </div>
                      </td>
                    );
                  })}   
            </tr>
            ))}
            
                
                </>
    )
}

function MentalHealth({ visits, view, setView, rowStyles }) {
    return (
        <>
<tr className={rowStyles}>
          <td>
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
                    <td key={visit.id} style={{ textAlign: "left", verticalAlign: "top" }}>
                        <div className="flex flex-col gap-2 items-start justify-start">
                      {visit.summary.mentalHealth.status === "good" && (
                        <Emoji className="text-success" />
                      )}
                      {visit.summary.mentalHealth.status === "stable" && (
                        <EmojiQuite />
                      )}
                      {visit.summary.mentalHealth.status === "concern" && (
                        <EmojiSad className="text-warning" />
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
                <td>
                {visit.summary.mentalHealth.note}
                </td>
                ))}
              </tr>}

              </>
    )
}
function Vitals({ visits, view, setView, rowStyles }) {
    return (
        <><tr className={rowStyles}>
        <td colSpan={visits.length + 1}>
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
          <td className="capitalize">{param}</td>
          {visits
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((visit) => {
              const vital = visit.summary.vitals[param];
              return (
                <td key={visit.id} style={{ textAlign: "left" }}>
                  <div className="flex flex-row gap-2 items-center w-full justify-between">
                  {vital.value}
                  {vital.change && <Badge text={vital.change} size="small" color={vital.color} style="light" />}
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
    rowStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
                <td colSpan={visits.length + 1}>
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
                  <td className="capitalize">{param.replace(/([A-Z])/g, " $1")}</td>
                  {visits
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((visit) => {
                      const panel = visit.summary.bloodPanel[param];
                      return (
                        <td key={visit.id} style={{ textAlign: "left" }}>
                            <div className="flex flex-row gap-2 items-center w-full justify-between">
                          {panel.value}
                          {panel.change && <Badge text={panel.change} size="small" color={panel.color} style="light" />}
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
    rowStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
                <td colSpan={visits.length + 1}>
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
                  <td className="capitalize">{param.replace(/([A-Z])/g, " $1")}</td>
                  {visits
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((visit) => {
                      const hormone = visit.summary.hormones[param];
                      return (
                        <td key={visit.id} style={{ textAlign: "left" }}>
                          {hormone.value}
                          {hormone.change && (
                            <span
                              className={`ml-2 text-xs ${
                                hormone.color ? `text-${hormone.color}` : ""
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
    rowStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
          <td colSpan={visits.length + 1}>
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
              <td className="capitalize">
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
              {visits
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((visit) => {
                  const answer = visit.summary.covid[param];
                  if (Array.isArray(answer)) {
                    return (
                      <td key={visit.id} style={{ textAlign: 'left' }}>
                        <ul className="flex flex-wrap gap-1">
                          {answer.map((symptom) => (
                            <Tag key={symptom} text={symptom} size="small" />
                          ))}
                        </ul>
                      </td>
                    );
                  }
                  return (
                    <td key={visit.id} style={{ textAlign: 'left' }}>
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
    rowStyles
}) {
    return (
        <>
        <tr className={rowStyles}>
          <td colSpan={visits.length + 1}>
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
              <td className="capitalize">
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
              {visits
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((visit) => {
                  const answer = visit.summary.lifeStyle[param];
                  if (Array.isArray(answer)) {
                    return (
                      <td key={visit.id} style={{ textAlign: 'left' }}>
                        <ul className="flex flex-wrap gap-1">
                          {answer.map((symptom) => (
                            <Tag key={symptom} text={symptom} size="small" />
                          ))}
                        </ul>
                      </td>
                    );
                  }
                  return (
                    <td key={visit.id} style={{ textAlign: 'left' }}>
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