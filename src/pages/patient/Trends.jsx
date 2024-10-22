import { useState } from "react";
import { Text, LineChart, Badge, Image, Icon, DataCard, Grid, Alert, Button, Link, Select, TabsVertical, SidebarLink } from "../../ui-kit/index.ts"
import { statusMap } from "../data";
import { Activity, Brain, CoolingSquare, Emoji, EmojiQuite, EmojiSad, Heart, List, Running, TestTube, Vials, WeightAlt } from "iconoir-react";
import { visits } from "./visits";

export default function Trends() {
    
    const rowStyles = `h-full align-top border-t border-current-10`;
    const cellStyles = `px-3 py-1.5 text-left`;
    

    const [view, setView] = useState({
        summary: true,
        vitals: true, 
        bloodPanel: true,
        hormones: true,
        mentalHealth: true,
        covid: true, 
        lifeStyle: true
    })

    function EmptyRow() {
        return (
            <tr className=""><td className="h-6" colSpan={4} /></tr>
        )
    }
    const flippedVisits = visits.slice().reverse();
    return (
        <>
          <table className="w-full text-base-content text-sm table-fixed select-none text-xs">
            <TableHeader visits={visits} rowStyles={rowStyles} cellStyles={cellStyles} />
            <tbody>  
            <Summary visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
            <EmptyRow />
            <COVID visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
            <EmptyRow />
            <LifeStyle visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
            <EmptyRow />
            <MentalHealth visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
            <EmptyRow />
            <Vitals  visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
            <EmptyRow />
            <Blood visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
            <EmptyRow />
            <Hormones visits={visits} view={view} setView={setView} rowStyles={rowStyles} cellStyles={cellStyles} />
        
            </tbody>
          </table>
        </>
      );}

function TableHeader({ visits, rowStyles, cellStyles }) {
    return (
        <thead>
              <tr className="" >
                <th style={{width: '19%'}} className={`${cellStyles} pl-0`}>Visits</th>
                {visits
                  .slice()
                  .sort((a, b) => a.id - b.id)
                  .map((visit) => (
                    <th key={visit.id} scope="col" style={{width: '27%'}} className={cellStyles}>
                    <div className="flex flex-row gap-2 py-1 items-center font-normal opacity-80">
                      {visit.date}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
    )
}


function Summary({ visits, view, setView, rowStyles, cellStyles }) {
    return (
        <>
        <tr className={rowStyles}>
        <td className={`${cellStyles} pl-0`}>
            <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
              // onClick={() => setView({ ...view, summary: !view.summary })}
            >
              <WeightAlt className="text-xs stroke-[2]"/>
              Summary
              {/*<div
                className={`${
                  view.mentalHealth ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>*/}
            </div>
          </td>
          {visits
                  
                  .sort((a, b) => a.id - b.id)
                  .map((visit) => (
                    <td key={visit.id} 
                    className={cellStyles}
                    style={{ textAlign: "left", verticalAlign: "top" }}>
                        <div className="flex flex-col gap-2 items-start justify-start">
                        <div className={`text-xs font-normal px-2 py-px rounded bg-${statusMap[visit.status]}/10
                        ring-[0.5px] ring-${statusMap[visit.status]}
                        text-${statusMap[visit.status]}-content`}>
                            {visit.status}</div>
                        </div>
                    </td>
                    ))}
        </tr>
        
        {view.summary && Object.keys(visits[0].summary.visitSummary).map((param) => (
            <tr key={param}>

                <td className={`capitalize align-top text-xs ${cellStyles} opacity-80 !font-normal pl-0`}
                >{param.replace(/([A-Z])/g, ' $1')}</td>
                {visits
                  .slice()
                  .sort((a, b) => a.id - b.id)
                  .map((visit) => {
                    const summary = visit.summary.visitSummary[param];
                    if (Array.isArray(summary)) {
                      return (
                        <td key={visit.id} style={{ textAlign: 'left', verticalAlign: 'top' }} className={cellStyles}>
                          <div className="flex flex-wrap gap-1">
                            {summary.map((item) => (
                                <Badge text={item} size="small" style="outline" color="base-200"
                                />
                            ))}
                          </div>
                        </td>
                      );
                    }
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
          <td className={`${cellStyles} pl-0`}>
            <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
              // onClick={() => setView({ ...view, mentalHealth: !view.mentalHealth })}
            >
              <Brain className="text-xs stroke-[2]"/>
              Mental Health
              {/*<div
                className={`${
                  view.mentalHealth ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>*/}
            </div>
          </td>
        
        
        {visits
                  
                  .sort((a, b) => a.id - b.id)
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
                  
                  .sort((a, b) => a.id - b.id)
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
        <><tr className={`${rowStyles}`}>
        <td colSpan={visits.length + 1} className={`${cellStyles} pl-0`}>
          <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
          // onClick={() => setView({...view, vitals: !view.vitals})}
          >
            <Activity className="text-xs stroke-[2]"/>
            Vitals
        {/* <div className={`${view.vitals ? 'transform rotate-90' : ''} transition-all`}>
          <Icon icon="chevron-right" size="16px" />
          </div>*/}
        
            </div>
        </td>
      </tr>
      {Object.keys(visits[0].summary.vitals).map((param) => (
        <tr key={param} className={`${view.vitals ? '' : 'hidden'} transition-all`}>
          <td className={`capitalize ${cellStyles} opacity-80 !font-normal pl-0`}>{param}</td>
          {visits
            .slice()
            .sort((a, b) => a.id - b.id)
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
                <td colSpan={visits.length + 1} className={`${cellStyles} pl-0`}>
                  <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
                  // onClick={() => setView({...view, bloodPanel: !view.bloodPanel})}
                  >
                    <TestTube className="text-xs stroke-[2]"/>
                    Blood Panel
                {/*<div className={`${view.bloodPanel ? 'transform rotate-90' : ''} transition-all`}>
                  <Icon icon="chevron-right" size="16px" />
                  </div>*/}
                    </div>
                </td>
              </tr>
              {view.bloodPanel &&
              Object.keys(visits[0].summary.bloodPanel).map((param) => (
                <tr key={param}>
                  <td className={`capitalize ${cellStyles} opacity-80 !font-normal pl-0`}>{param.replace(/([A-Z])/g, " $1")}</td>
                  {visits
                    .slice()
                    .sort((a, b) => a.id - b.id)
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
                <td colSpan={visits.length + 1} className={`${cellStyles} pl-0`}>
                  <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
                  // onClick={() => setView({...view, hormones: !view.hormones})}
                  >
                    <Vials className="text-xs stroke-[2]"/>
                    Hormones
                {/*<div className={`${view.hormones ? 'transform rotate-90' : ''} transition-all`}>
                  <Icon icon="chevron-right" size="16px" />
                  </div>*/}
                    </div>
                </td>
              </tr>
              {view.hormones && Object.keys(visits[0].summary.hormones).map((param) => (
                <tr key={param}>
                  <td className={`capitalize ${cellStyles} opacity-80 !font-normal pl-0`}>{param}</td>
                  {visits
                    .slice()
                    .sort((a, b) => a.id - b.id)
                    .map((visit) => {
                      const hormone = visit.summary.hormones[param];
                      return (
                        <td key={visit.id} style={{ textAlign: "left" }}
                        className={`bg-${hormone.color}-surface text-${hormone.color}-content ${cellStyles}`}>
                          {hormone.value}
                          {hormone.change && (
                            <span className={`ml-2 text-xs ${hormone.changeColor ? `text-${hormone.changeColor}-content` : ""}`}>
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
          <td colSpan={visits.length + 1} className={`${cellStyles} pl-0`}>
            <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
              //onClick={() => setView({ ...view, covid: !view.covid })}
            >
              <CoolingSquare className="text-xs stroke-[2]"/>
              COVID
              <div
                className={`hidden ${
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
              <td className={`capitalize ${cellStyles} opacity-80 !font-normal pl-0`}>
                {param.replace(/([A-Z])/g, ' $1')}
              </td>
  
              {/* Parameter Values for Each Visit */}
              {visits
                .slice()
                .sort((a, b) => a.id - b.id)
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
                                color="base-200"
                                style="outline"
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
                        className={`${cellStyles} ${answer?.includes('positive') && 'text-warning'} lowercase`}
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
          <td colSpan={visits.length + 1} className={`${cellStyles} pl-0`}>
            <div className="flex flex-row justify-start items-center gap-2 font-medium opacity-80"
              // onClick={() => setView({ ...view, lifeStyle: !view.lifeStyle })}
            >
              <Running className="text-xs stroke-[2]"/>
              Lifestyle
              <div
                className={`hidden ${
                  view.lifeStyle ? 'transform rotate-90' : ''
                } transition-all`}
              >
                <Icon icon="chevron-right" size="16px" />
              </div>
            </div>
          </td>
        </tr>
  
        {/*Exercise */}
        <tr>
            <td style={{ textAlign: 'left' }} className={`${cellStyles} align-top  opacity-80 !font-normal pl-0`}>Exercise</td>
            {visits.map((visit) => (
                <td key={visit.id} style={{ textAlign: 'left' }} className={`${cellStyles}`}>
                    
                    <div className="flex flex-wrap gap-1 items-center">
                    <Badge text={visit.summary.lifeStyle.exercise.level} size="small" style="light" color={visit.summary.lifeStyle.exercise.level === 'moderate' ? 'success' : 'error'} />
                    {visit.summary.lifeStyle.exercise.attributes.length  > 0  && <span className="text-base-200 mx-1">|</span>}
                    {visit.summary.lifeStyle.exercise.attributes.map((type) => (
                        <Badge key={type} text={type} size="small" style="outline" color="base-200" />
                    ))}
                    </div>
                </td>
                ))}   
         </tr>

         {/*Diet */}
            <tr>
                <td style={{ textAlign: 'left' }} className={`${cellStyles} align-top  opacity-80 !font-normal pl-0`}>Diet</td>
                {visits.map((visit) => (
                    <td key={visit.id} style={{ textAlign: 'left' }} className={`${cellStyles}`}>
                        
                        <div className="flex flex-wrap gap-1 items-center">
                    <Badge text={visit.summary.lifeStyle.diet.quality} size="small" style="light" color={visit.summary.lifeStyle.diet.quality === 'balanced' ? 'success' : 'error'} />
                    {visit.summary.lifeStyle.diet.attributes.length  > 0 && <span className="text-base-200 mx-1">|</span>}
                    {visit.summary.lifeStyle.diet.attributes.map((type) => (
                        <Badge key={type} text={type} size="small" style="outline" color="base-200" />
                    ))}
                    </div>
                    </td>
                    ))}
            </tr>
            {/*Sleep */}
            <tr>
                <td style={{ textAlign: 'left' }} className={`${cellStyles} align-top  opacity-80 !font-normal pl-0`}>Sleep</td>
                {visits.map((visit) => (
                    <td key={visit.id} style={{ textAlign: 'left' }} className={`${cellStyles}`}>
                        
                    <div className="flex flex-wrap gap-1 items-center">
                <Badge text={visit.summary.lifeStyle.sleep.quality} size="small" style="light" color={visit.summary.lifeStyle.diet.quality === 'balanced' ? 'success' : 'error'} />
                {visit.summary.lifeStyle.sleep.attributes.length > 0 && <span className="text-base-200 mx-1">|</span>}
                {visit.summary.lifeStyle.sleep.attributes.map((type) => (
                    <Badge key={type} text={type} size="small" style="outline" color="base-200" />
                ))}
                </div>
                </td>
                    ))}
            </tr>
            {visits[0]?.summary?.lifeStyle &&
            Object.keys(visits[0].summary.lifeStyle)
                .filter(key => !['exercise', 'diet', 'sleep', 'substances'].includes(key))  // Filter out exercise, diet, and sleep
                .map(key => (
                    <tr key={key}>
                        <td style={{ textAlign: 'left' }} className={`${cellStyles} align-top opacity-80 !font-normal pl-0`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}  {/* Capitalize the key for display */}
                        </td>
                        {visits.map((visit, index) => (
                            <td key={index} style={{ textAlign: 'left' }} className={`${cellStyles}`}>
                                {Array.isArray(visit.summary.lifeStyle[key]) && visit.summary.lifeStyle[key].length > 0 ? (
                                    visit.summary.lifeStyle[key].join(', ')  // Join array values with a comma if it's an array
                                ) : (
                                    visit.summary.lifeStyle[key] || '–'  // If not an array, display the value or placeholder '–'
                                )}
                            </td>
                        ))}
                    </tr>
                ))
        }

        {/*Substances */}
        <tr>
            <td style={{ textAlign: 'left' }} className={`${cellStyles} align-top  opacity-80 !font-normal pl-0`}>Substances</td>
            {visits.map((visit) => (
                <td key={visit.id} style={{ textAlign: 'left' }} className={`${cellStyles}`}>
                    
                    <div className="flex flex-wrap gap-1 items-center">
                {visit.summary.lifeStyle.substances.length > 0 ? (
                    visit.summary.lifeStyle.substances.join(', ')
                ) : (
                    '–'
                )}
                </div>
                </td>
                ))}
        </tr>
      </>
    );
  }




  