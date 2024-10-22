import { TableWidget  } from "../../ui-kit/index.ts"

export default function FormsView() {
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