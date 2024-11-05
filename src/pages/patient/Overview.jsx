
import { Button, TabGroup, Badge, Status, Alert, TableWidget, Heading, Image, DataCard, LineChart, Checkbox } from "../../ui-kit/index.ts"
import { statusMap } from "../data.jsx";
import { Calendar, Emoji, EmojiQuite, EmojiSad, MapPin, Pin, Suitcase } from "iconoir-react";

export default function Overview() {
 return (
    <>
    <PatientInfo />
    <Tasks />
    <Appointments />
    </>
 )

}
//<Trends />
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
        medications: ['Lisinopril 10mg', 'Metformin 500mg', 'Atorvastatin 20mg'],
        allergies: ['Penicillin', 'Peanuts', 'Pollen'],
        history: {
            chronic: ['Hypertension', 'Obesity'],
            surgery: ['Appendectomy'],
            family: ['Diabetes', 'Heart Disease', 'Alcoholism'],
        }
    }
    const blockStyles = `flex flex-col flex-nowrap w-1/3 text-base-content bg-base-0 gap-1 h-full rounded-base items-start justify-start`
    const titleProps ={
      textSize: "xs",
      fontWeight: "normal", 
      color: 'base-500', 
      marginTop: '12px',
      fontWeight: 'medium'
    }
    
    const mugshot = "https://storage.googleapis.com/juno-v1.appspot.com/grfnhiohvrpa1.jpg?GoogleAccessId=firebase-adminsdk-ihqnb%40juno-v1.iam.gserviceaccount.com&Expires=4102462800&Signature=crCwkrMQQkE3OV1MelVGhjwTKKJjfaKXzQlmUYEuZ9dgT%2Br%2BuxRt7%2F2fjlhdqOYBTs3Nd9ZPoyDdDYq1JsAux7y4Okgd%2F7bA7GkWCifOqY1WwbOHVZHf0ZKiOZ23h9bYh2rnosov86rzzrJNtvX4lsAXWwOfSMxZNOf2dgY8p5QszGsKT4J%2BmS%2BaRq7f0veTjI86pqA6JKViHx15WyFBOroV1TLv75U5KC367w%2BPaq0uZJWbWyEQmjHcF4qwzWQphFYOyjy9E87gruUKa9oXdXiq09TM3WYPHSHVQcd9bdM%2F06sbjdeMZGEMsvvoQoiL8VJRiRWiNR8Mw0o673n9kA%3D%3D" 
    return (
        <div className="text-sm font-normal flex justify-start items-start">
    
                    <div className="flex flex-row gap-4 w-full items-start justify-between">
                        <div className={`${blockStyles} !flex-row !gap-6`}>
                        <Image 
                            src={mugshot}
                            width="120px" 
                            height="148px" 
                            altText="" 
                            corners="md" 
                            objectFit="cover" 
                        /><div className="flex flex-col w-full gap-3 items-start justify-start">
                            <Heading text={`${patientData.general.preferredName}`} textSize="base" />
                            <span className="flex gap-2 items-center">
                              <Suitcase className="text-xs stroke-[2]"/>
                            {patientData.general.occupation}
                            </span>
                            <span className="flex gap-2 items-center">
                              <Calendar className="text-xs stroke-[2] "/>
                              {patientData.general.dob}
                            </span>
                            <span className="flex gap-2 items-center">
                              <MapPin className="text-xs stroke-[2] "/>
                              {patientData.general.pob}
                            </span>
                            </div>
                        </div>
                        <div  className={`${blockStyles}`}>
                            <Heading text="Conditions" {...titleProps} marginTop={null} />
                            <div className="flex flex-wrap gap-2">
                              {patientData.history.chronic.map((condition, index) => (
                                <Badge key={index} text={condition} color="base-200" size="small" style="outline" />
                              ))}
                            </div>
                            <Heading text="Past Surgeries" {...titleProps}/>
                            <div className="flex flex-wrap gap-2">
                              {patientData.history.surgery.map((surgery, index) => (
                                <Badge key={index} text={surgery} color="base-200" size="small" style="outline" />
                              ))}
                            </div>
                            <Heading text="Family History" {...titleProps}/>
                            <div className="flex flex-wrap gap-2">
                              {patientData.history.family.map((condition, index) => (
                                <Badge key={index} text={condition} color="base-200" size="small" style="outline" />
                              ))}
                            </div>
                        </div>
                        <div  className={blockStyles}>
                            <Heading text="Medications" {...titleProps}  marginTop={null} />
                            <div className="flex flex-wrap gap-2">
                              {patientData.medications.map((medication, index) => (
                                <Badge key={index} text={medication} color="info" size="small"  style="light" isPill />
                              ))}
                            </div>
                            <Heading text="Allergies" {...titleProps}/>
                            <div className="flex flex-wrap gap-2">
                              {patientData.allergies.map((allergy, index) => (
                                <Badge key={index} text={allergy} color="warning" size="small" style="outline" />
                              ))}
                            </div>
                            
                            
                        </div>
                </div>
        </div>
    )
  }
  

  function Tasks() {
    const tasks = [
      { label: 'Insurance Card Needs Update', checked: false },
      { label: 'Consent Form Needs Update', checked: false },
      { label: 'Blood Panel due in 2 months', checked: false },
    ]
    return (
      <div className="w-full gap-2 flex flex-col">
        Tasks
        {tasks.map((task, index) => (
            <Checkbox checked={task.checked} label={task.label} style="button" key={index} />
        ))}
      </div>
    )
  }

  

  function Appointments() {
    const columns = [
      {"type":"text","width":"15%","header":"Date","accessor":"date","direction":"flex-row","alignItems":"center","hideOnMobile":false,"justifyContent":"start"},
      {"type":"text","width":"25%","header":"Doctor","accessor":"doctor","direction":"flex-row","alignItems":"center","hideOnMobile":false,"justifyContent":"start"},
      {"type":"text","width":"35%","header":"Reason","accessor":"reason","direction":"flex-row","alignItems":"center","hideOnMobile":false,"justifyContent":"start"},
      {"type":"arrayOfObjects","width":"25%","header":"Status","accessor":"status","direction":"flex-col","alignItems":"center","hideOnMobile":true,"justifyContent":"start"}]
    const data = [
      {id:1,
        date:"2023-10-01",
        reason:"Routine Check-up",
        doctor:"Dr. Ramos",
        status:[{"component":"Status","props":{"text":"Routine","color":"success","size":"small","showIndicator":true}}]},
      {id:2,
        date:"2023-10-02",
        reason:"Follow-up",
        doctor:"Dr. Ramos",
        status:[{"component":"Status","props":{"text":"Observation","color":"info","size":"small","showIndicator":true}}]},
      {id:3,
        date:"2023-10-03",
        reason:"Consultation",
        doctor:"Dr. Wilson",
        status:[{"component":"Status","props":{"text":"Escalation","color":"warning","size":"small","showIndicator":true}}]
      },
    ]
    return (
      <div className="w-full gap-2 flex flex-col">
        Past Appointments
        <TableWidget corners="md" 
        rowData={data} 
        textSize="sm" columnData={columns} 
        cellPaddingX="8px" cellPaddingY="6px"  />
      </div>
    )
  }

  