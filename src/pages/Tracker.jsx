import { useState } from "react";
import { Text, LineChart, Badge, Image, Icon, DataCard, Grid, Alert, Button, Link } from "../ui-kit/index.ts"
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
              stress: 'high',
              note: 'High stress levels and fatigue reported.',
            },
            medications: {
              rx: [
                { name: 'Metformin', dose: '500 mg', frequency: 'daily' },
                { name: 'Lisinopril', dose: '10 mg', frequency: 'daily' },
                { name: 'Adderall', dose: '10 mg', frequency: 'daily' },
              ],
              supplements: [
                { name: 'Vitamin D', dose: '1000 IU', frequency: 'daily' },
                { name: 'Omega-3', dose: '1000 mg', frequency: 'daily' },
              ],
            },
            covid: {
              respiratory: ['Shortness of breath', 'Cough', 'Sore throat'],
              neurological: ['Loss of smell', 'Headache'],
              physical: ['Fatigue', 'Muscle pain', 'Body aches'],
              gastrointestinal: [],
              test: 'Positive',
              testDate: '10 Jan 24',
            },
            lifeStyle: {
              diet: ['sweets', 'fast food'],
              exercise: { level: 'low', types: ['walking'] },
              sleep: { quality: 'low', issues: ['insomnia'] },
              caffeine: 'daily',
              alcohol: '3-4 drinks/week',
              stress: 'high',
              smoking: '–',
              cannabis: '–',
              substances: [],
            },
            maleHealth: {
              urination: 'normal',
              prostate: 'normal',
              testosterone: 'normal',
              colonScreen: { status: 'normal', date: '15 Jan 24' },
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
              diagnosis: 'Weight and blood pressure decreased; improvement noted.',
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
                color: 'warning',
                change: '↓ 10/5 mmHg',
                changeColor: 'success',
              },
              heartRate: {
                value: '80 bpm',
                color: 'error',
                change: '↓ 10 bpm',
                changeColor: 'success',
              },
            },
            bloodPanel: {
              fastingGlucose: {
                value: '110 mg/dL',
                color: 'warning',
                change: '↓ 10 mg/dL',
                changeColor: 'success',
              },
              cholesterol: {
                value: '220 mg/dL',
                color: 'warning',
                change: '↓ 20 mg/dL',
                changeColor: 'success',
              },
              ldl: {
                value: '140 mg/dL',
                color: 'warning',
                change: '↓ 20 mg/dL',
                changeColor: 'success',
              },
              hdl: {
                value: '40 mg/dL',
                color: 'warning',
                change: '↑ 5 mg/dL',
                changeColor: 'success',
              },
              triglycerides: {
                value: '200 mg/dL',
                color: 'warning',
                change: '↓ 50 mg/dL',
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
                change: '↓ 1 mcg/dL',
                changeColor: 'base',
              },
              insulin: {
                value: '18 µU/mL',
                color: 'warning',
                change: '↓ 2 µU/mL',
                changeColor: 'success',
              },
            },
            mentalHealth: {
              status: 'stable',
              stress: 'moderate',
              note: 'Stress levels reduced; mood improving.',
            },
            medications: {
              rx: [
                { name: 'Metformin', dose: '500 mg', frequency: 'daily' },
                { name: 'Lisinopril', dose: '10 mg', frequency: 'daily' },
              ],
              supplements: [
                { name: 'Vitamin D', dose: '1000 IU', frequency: 'daily' },
                { name: 'Omega-3', dose: '1000 mg', frequency: 'daily' },
              ],
            },
            covid: {
              respiratory: ['Cough'],
              neurological: [],
              physical: ['Fatigue'],
              gastrointestinal: [],
              test: 'Negative',
              testDate: '5 May 24',
            },
            lifeStyle: {
              diet: ['balanced'],
              exercise: { level: 'moderate', types: ['walking', 'cycling'] },
              sleep: { quality: 'improving', issues: [] },
              caffeine: 'reduced',
              alcohol: '1-2 drinks/week',
              stress: 'moderate',
              smoking: 'none',
              cannabis: 'none',
              substances: [],
            },
            maleHealth: {
              urination: 'normal',
              prostate: 'normal',
              testosterone: 'normal',
              colonScreen: { status: 'normal', date: '15 Jan 24' },
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
              reason: 'Routine check-up; continued progress on lifestyle changes.',
              diagnosis: 'Significant improvements; health parameters approaching normal ranges.',
            },
            vitals: {
              weight: {
                value: '195 lbs',
                color: 'warning',
                change: '↓ 15 lbs',
                changeColor: 'success',
              },
              BMI: {
                value: '28.0',
                color: 'warning',
                change: '↓ 2.0',
                changeColor: 'success',
              },
              bloodPressure: {
                value: '120/80 mmHg',
                color: 'success',
                change: '↓ 10/5 mmHg',
                changeColor: 'success',
              },
              heartRate: {
                value: '70 bpm',
                color: 'success',
                change: '↓ 10 bpm',
                changeColor: 'success',
              },
            },
            bloodPanel: {
              fastingGlucose: {
                value: '95 mg/dL',
                color: 'success',
                change: '↓ 15 mg/dL',
                changeColor: 'success',
              },
              cholesterol: {
                value: '190 mg/dL',
                color: 'success',
                change: '↓ 30 mg/dL',
                changeColor: 'success',
              },
              ldl: {
                value: '120 mg/dL',
                color: 'warning',
                change: '↓ 20 mg/dL',
                changeColor: 'success',
              },
              hdl: {
                value: '50 mg/dL',
                color: 'success',
                change: '↑ 10 mg/dL',
                changeColor: 'success',
              },
              triglycerides: {
                value: '150 mg/dL',
                color: 'success',
                change: '↓ 50 mg/dL',
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
                change: '↓ 1 mcg/dL',
                changeColor: 'base',
              },
              insulin: {
                value: '15 µU/mL',
                color: 'success',
                change: '↓ 3 µU/mL',
                changeColor: 'success',
              },
            },
            mentalHealth: {
              status: 'good',
              stress: 'low',
              note: 'Feeling well; stress levels low.',
            },
            medications: {
              rx: [
                { name: 'Metformin', dose: '500 mg', frequency: 'daily' },
                { name: 'Lisinopril', dose: '10 mg', frequency: 'daily' },
              ],
              supplements: [
                { name: 'Vitamin D', dose: '1000 IU', frequency: 'daily' },
                { name: 'Omega-3', dose: '1000 mg', frequency: 'daily' },
              ],
            },
            covid: {
              respiratory: [],
              neurological: [],
              physical: [],
              gastrointestinal: [],
              test: 'Negative',
              testDate: '5 Oct 24',
            },
            lifeStyle: {
              diet: ['vegetarian', 'low sugar'],
              exercise: { level: 'active', types: ['running', 'cycling'] },
              sleep: { quality: 'good', issues: [] },
              caffeine: 'minimal',
              alcohol: 'occasional',
              stress: 'low',
              smoking: 'none',
              cannabis: 'none',
              substances: [],
            },
            maleHealth: {
              urination: 'normal',
              prostate: 'normal',
              testosterone: 'normal',
              colonScreen: { status: 'normal', date: '15 Jan 24' },
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
          <table className="w-full text-base-content text-sm table-fixed select-none text-xs">
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
    cellStyles,
  }) {
    return (
      <>
        {/* COVID-19 Header */}
        <tr className={rowStyles}>
          <td colSpan={visits.length + 1} className={cellStyles}>
            <div
              className="flex flex-row justify-start items-center gap-2 text-md font-semibold cursor-pointer"
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
  
        {/* COVID-19 Details */}
        {view.covid &&
          Object.keys(visits[0].summary.covid).map((param) => (
            <tr key={param}>
              {/* Parameter Name */}
              <td className={`capitalize ${cellStyles}`}>
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
  
              {/* Parameter Values for Each Visit */}
              {visits
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((visit) => {
                  const answer = visit.summary.covid[param];
  
                  // Handle Arrays (Symptoms)
                  if (Array.isArray(answer)) {
                    return (
                      <td
                        key={visit.id}
                        style={{ textAlign: 'left' }}
                        className={cellStyles}
                      >
                        {answer.length > 0 ? (
                          <ul className="flex flex-wrap gap-1">
                            {answer.map((symptom) => (
                              <Badge
                                key={symptom}
                                text={symptom}
                                size="small"
                                color="base-700"
                                style="light"
                              />
                            ))}
                          </ul>
                        ) : (
                          <span>–</span>
                        )}
                      </td>
                    );
                  }
  
                  // Handle Strings (Test Results, Dates)
                  else if (typeof answer === 'string') {
                    return (
                      <td
                        key={visit.id}
                        style={{ textAlign: 'left' }}
                        className={`${cellStyles} ${answer === 'Positive' && 'text-warning'}`}
                      >
                        {answer || '–'}
                      </td>
                    );
                  }
  
                  // Handle Other Data Types or Null Values
                  else {
                    return (
                      <td
                        key={visit.id}
                        style={{ textAlign: 'left' }}
                        className={cellStyles}
                      >
                        {answer !== undefined && answer !== null ? (
                          <span>{answer}</span>
                        ) : (
                          <span>–</span>
                        )}
                      </td>
                    );
                  }
                })}
            </tr>
          ))}
      </>
    );
  }

function LifeStyle({
    visits,
    view,
    setView,
    rowStyles,
    cellStyles,
  }) {
    return (
      <>
        {/* Lifestyle Header */}
        <tr className={rowStyles}>
          <td colSpan={visits.length + 1} className={cellStyles}>
            <div
              className="flex flex-row justify-start items-center gap-2 text-md font-semibold cursor-pointer"
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
  
        {/* Lifestyle Details */}
        {view.lifeStyle &&
          Object.keys(visits[0].summary.lifeStyle).map((param) => (
            <tr key={param}>
              {/* Parameter Name */}
              <td className={`capitalize ${cellStyles} align-top`}>
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
  
              {/* Parameter Values for Each Visit */}
              {visits
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((visit) => {
                  const answer = visit.summary.lifeStyle[param];
  
                  // Handle Arrays
                  if (Array.isArray(answer)) {
                    return (
                      <td
                        key={visit.id}
                        style={{ textAlign: 'left' }}
                        className={cellStyles}
                      >
                        {answer.length > 0 ? (
                          <ul className="flex flex-wrap gap-1">
                            {answer.map((item) => (
                              <Badge key={item} text={item} size="small" style="light" color="base-700" />
                            ))}
                          </ul>
                        ) : (
                          <span>–</span>
                        )}
                      </td>
                    );
                  }
  
                  // Handle Objects
                  else if (typeof answer === 'object' && answer !== null) {
                    return (
                      <td
                        key={visit.id}
                        style={{ textAlign: 'left', verticalAlign: 'top' }}
                        className={cellStyles}
                      >
                        {Object.keys(answer).map((subKey) => (
                          <div key={subKey} className="flex items-start mb-1">
                            {Array.isArray(answer[subKey]) ? (
                              <ul className="flex flex-wrap gap-1">
                                {answer[subKey].map((item) => (
                                    <>{item}; </>
                                ))}
                              </ul>
                            ) : (
                              <span>{answer[subKey]}</span>
                            )}
                          </div>
                        ))}
                      </td>
                    );
                  }
  
                  // Handle Strings and Other Types
                  else {
                    return (
                      <td
                        key={visit.id}
                        style={{ textAlign: 'left' }}
                        className={cellStyles}
                      >
                        <div className="flex flex-col gap-2 items-start">
                          <Badge
                            text={answer}
                            size="small"
                            color={
                              ['low', 'none', 'minimal', 'reduced'].includes(
                                answer.toLowerCase()
                              )
                                ? 'success'
                                : ['moderate', 'occasional'].includes(
                                    answer.toLowerCase()
                                  )
                                ? 'warning'
                                : 'error'
                            }
                            style="light"
                          />
                        </div>
                      </td>
                    );
                  }
                })}
            </tr>
          ))}
      </>
    );
  }



