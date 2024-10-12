import { useState } from "react"
import { Main, UserMenu, Search, SidebarLink} from "ui-kit/exports/react"
import Sidebar from "./Sidebar"
import Appointments from "./Appointments"
import PatientsPage from "./Patients"
import Automations from "./Automations"
import Forms from "./Forms"
import AppShell from "./AppShell"
import Team from "./Team"

export default function ProtocolApp() {
    const [selectedPage, setSelectedPage] = useState('Appointments')

    const simpleRouter  = {
        "Appointments": <Appointments setSelectedPage={setSelectedPage} />,
        "Patients": <PatientsPage />,
        "Surveys": <Forms />,
        "Protocols": <Automations />,
        "My Team": <Team />
        

    }
    return (
        <AppShell pageBackground="base-50">
        <Main gap="24px" width="stretch" corners="md" marginX="12px" marginY="12px" paddingX="48px" paddingY="48px" textSize="base" direction="flex-col" selfAlign="center" alignItems="start" background="base-0" justifyContent="start">
            {simpleRouter[selectedPage] || <div>Not Found</div>}
        </Main>
        
        
        <Sidebar currentTab={selectedPage} setCurrentTab={setSelectedPage} />
        </AppShell>
    )
}


