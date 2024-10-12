import { useNavigate } from "react-router-dom";
import { Search, Button, ButtonIcon, TableWidget  } from "../ui-kit/index.ts"
import { patients, statusMap } from "./data"



export default function PatientsPage() {

    const columns = [
        {"type":"text","width":"40%","header":"Patient","accessor":"name","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
        {"type":"text","width":"30%","header":"Primary Provider","accessor":"office","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":true,"justifyContent":"start"},
        {"type":"arrayOfObjects","width":"20%","header":"Status","accessor":"status","direction":"flex-col","alignItems":"center","isSortable":false,"hideOnMobile":true,"justifyContent":"start"}
    ]
    
    const patientData = patients.map(patient => ({
        ...patient,
        status: {
            component: "Status",
            props: {
                text: patient.status,
                color: statusMap[patient.status],
                size: 'small',
                showIndicator: true
            }
        }
    }));
    
    const navigate = useNavigate();

    return (
        
        <>
          <div className="flex flex-col w-full gap-2">
            <h1 className="text-3xl font-medium text-left">Patients</h1>
        </div>

        <div className="flex flex-row flex-nowrap w-full self-auto     gap-3   items-start justify-between h-auto   undefined undefined">
            <div className="flex flex-row flex-nowrap w-auto self-auto text-base-content  gap-3   items-start justify-start h-auto   undefined undefined">
                <Search width="auto" bgColor="base-0" hasOutline size="medium" placeholder="Search patient name" />
            </div>
            <div className="flex flex-row flex-nowrap w-auto self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
                <ButtonIcon size="medium" icon="filter" style="ghost" />
                {/*<Button style="light" text="Table Action" size="medium" />*/}
                <Button style="filled" text="Add Patient" size="medium" />
            </div>
            </div>


            <TableWidget corners="md" 
            rowData={patientData}
            textSize="sm" 
            columnData={columns}
            onRowClick={() => navigate('/patient-example')}
                //[{"type":"text","width":"40%","header":"Patient","accessor":"patient","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"text","width":"30%","header":"Office","accessor":"office","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":true,"justifyContent":"start"},{"type":"arrayOfObjects","width":"20%","header":"Status","accessor":"status","direction":"flex-col","alignItems":"center","isSortable":false,"hideOnMobile":true,"justifyContent":"start"}]} 
            cellPaddingX="12px" cellPaddingY="8px" 
            //hasRowSelect 
            pagination="mini" />
        </>
    )
}


<TableWidget corners="md" rowData={[{"id":1,"patient":"John Doe","office":"Dr. Smith's Office","status":{"component":"Status","props":{"text":"Healthy","color":"success","size":"small","showIndicator":true}}},{"id":2,"patient":"Apple Doe","office":"Dr. Baker's Office","status":{"component":"Status","props":{"text":"Sick","color":"error","size":"small","showIndicator":true}}},{"id":3,"patient":"Jane Doe","office":"Dr. Johnson's Office","status":{"component":"Status","props":{"text":"Recovering","color":"warning","size":"small","showIndicator":true}}},{"id":4,"patient":"John Doe","office":"Dr. Lee's Office","status":{"component":"Status","props":{"text":"Under Observation","color":"info","size":"small","showIndicator":true}}},{"id":5,"patient":"Robert Roe","office":"Dr. Clark's Office","status":{"component":"Status","props":{"text":"Stable","color":"warning","size":"small","showIndicator":true}}},{"id":6,"patient":"Laura Moe","office":"Dr. Taylor's Office","status":{"component":"Status","props":{"text":"Critical","color":"error","size":"small","showIndicator":true}}},{"id":7,"patient":"Charlie Poe","office":"Dr. Davis's Office","status":{"component":"Status","props":{"text":"Discharged","color":"success","size":"small","showIndicator":true}}},{"id":8,"patient":"Emily Jo","office":"Dr. Wilson's Office","status":{"component":"Status","props":{"text":"Consultation","color":"info","size":"small","showIndicator":true}}},{"id":9,"patient":"Michael Boe","office":"Dr. Murphy's Office","status":{"component":"Status","props":{"text":"Waiting","color":"warning","size":"small","showIndicator":true}}},{"id":10,"patient":"Lisa Fro","office":"Dr. Thompson's Office","status":{"component":"Status","props":{"text":"Testing","color":"info","size":"small","showIndicator":true}}}]} textSize="base" columnData={[{"type":"text","width":"40%","header":"Patient","accessor":"patient","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},{"type":"text","width":"30%","header":"Office","accessor":"office","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":true,"justifyContent":"start"},{"type":"arrayOfObjects","width":"20%","header":"Status","accessor":"status","direction":"flex-col","alignItems":"center","isSortable":false,"hideOnMobile":true,"justifyContent":"start"}]} cellPaddingX="8px" cellPaddingY="6px" hasRowSelect pagination="standard" />