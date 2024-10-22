
import { Button, TabGroup, Badge, Status, Alert, TableWidget, Heading, Image, DataCard, LineChart } from "../../ui-kit/index.ts"
import { statusMap } from "../data.jsx";
import { Calendar, Emoji, EmojiQuite, EmojiSad, MapPin, Pin, Suitcase } from "iconoir-react";

export default function Overview() {
 return (
    <>
    <PatientInfo />
    <Trends />
    </>
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
    const blockStyles = `flex flex-col flex-nowrap w-1/3 text-base-content bg-base-0 gap-1 h-full rounded-base items-start justify-start`
    const titleProps ={
      textSize: "xs",
      fontWeight: "normal", 
      color: 'base-500'
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
  
  function Appointments() {
    return (
      <div className="w-full bg-base-50 rounded-lg p-4">
        Appointments table
      </div>
    )
  }

  /*<div className="flex flex-col flex-nowrap w-full text-base-content bg-base-0 gap-4 rounded-base items-start justify-start h-full">
                    <DataCard title="Blood Pressure" value="130/85 mmHg" />
                    <DataCard title="Cholesterol" value="190 mg/dL" />
                    <DataCard title="Glucose" value="100 mg/dL" />
                </div>*/