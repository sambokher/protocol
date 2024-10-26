import { TableWidget  } from "../../ui-kit/index.ts"

export default function FormsView() {
    const scheduledForms = [{"id":1,"formName":"6-month Checkin","whenScheduled":"5 Apr, 25","status":{"props":{"size":"small","text":"Scheduled","color":"info","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"Edit","size":"small","style":"light"}},{"component":"Button","props":{"text":"Send Now","size":"small","style":"light"}}]},{"id":2,"formName":"Diabetes Assessment","whenScheduled":"5 Apr, 25","status":{"props":{"size":"small","text":"Scheduled","color":"info","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"Edit","size":"small","style":"light"}},{"component":"Button","props":{"text":"Send Now","size":"small","style":"light"}}]}]
    const collectedForms = [
      
      
      {"id":1,"formName":"Pre-visit Form 10/08/24","whenSent":"1 Aug, 24","whenCompleted":"10 Aug, 24","status":{"props":{"size":"small","text":"Completed","color":"success","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"View","size":"small","style":"light"}}]},
      {"id":2,"formName":"Pre-visit Form 05/05/24","whenSent":"5 May, 24","whenCompleted":"9 May, 24","status":{"props":{"size":"small","text":"Completed","color":"success","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"View","size":"small","style":"light"}}]},
      {"id":3,"formName":"Pre-visit Form 12/01/24","whenSent":"10 Jan, 24","whenCompleted":"11 Jan, 24","status":{"props":{"size":"small","text":"Completed","color":"success","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"View","size":"small","style":"light"}}]},
      {"id":4,"formName":"Treatment Consent Form","whenSent":"10 Jan, 24","whenCompleted":"11 Jan, 24","status":{"props":{"size":"small","text":"Completed","color":"success","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"View","size":"small","style":"light"}}]},
      {"id":5,"formName":"HIPPA Consent Form","whenSent":"10 Jan, 24","whenCompleted":"11 Jan, 24","status":{"props":{"size":"small","text":"Completed","color":"success","showIndicator":true},"component":"Status"},"actions":[{"component":"Button","props":{"text":"View","size":"small","style":"light"}}]},
    ]
    return (
      <>
      <div className="flex flex-col flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
    <h1 className="text-ellipsis text-lg     font-semibold text-left  undefined undefined" style={{ whiteSpace: 'pre-wrap' }}>
      Scheduled
    </h1>
    <TableWidget corners="md" rowData={scheduledForms} textSize="sm" columnData={[
      {"type":"text","width":"40%","header":"Survey","accessor":"formName","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"text","width":"30%","header":"Date Scheduled","accessor":"whenScheduled","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"object","width":"15%","header":"Status","accessor":"status","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"arrayOfObjects","width":"15%","header":"Actions","accessor":"actions","direction":"flex-row","alignItems":"center","justifyContent":"end","displayOnHoverOnly":false,"isSortable":false}]} 
      cellPaddingX="8px" cellPaddingY="6px" />
  </div>
  
  <div className="flex flex-col flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
    <h1 className="text-ellipsis text-lg     font-semibold text-left  undefined undefined" style={{ whiteSpace: 'pre-wrap' }}>
      Completed
    </h1>
    <TableWidget corners="md" rowData={collectedForms} textSize="sm" 
    columnData={[
      {"type":"text","width":"40%","header":"Survey","accessor":"formName","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"text","width":"15%","header":"Sent","accessor":"whenSent","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"text","width":"15%","header":"Completed","accessor":"whenCompleted","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"object","width":"15%","header":"Status","accessor":"status","direction":"flex-row","alignItems":"center","isSortable":true,"hideOnMobile":false,"justifyContent":"start"},
      {"type":"arrayOfObjects","width":"15%","header":"Actions","accessor":"actions","direction":"flex-row","alignItems":"center","justifyContent":"end","displayOnHoverOnly":false,"isSortable":false}]} 
      cellPaddingX="8px" cellPaddingY="6px" />
  </div>
  </>
    )
  }