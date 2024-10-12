import { ReactNode, useEffect, useState } from "react";
import {
  RouterProvider,
  useNavigate,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import { PBContext, PocketBaseProvider, usePocketBase } from "./contexts/PocketBase";
import { AppShell, Main, Search, SidebarLink, UserMenu } from "./ui-kit/index.ts"
import Appointments from "./pages/Appointments";
import Surveys from "./pages/Surveys";
import Protocols from "./pages/Protocols";
import Team from "./pages/Team";
import Patients from "./pages/Patients";
import PatientExample from "./pages/PatientExample";
import { IconType } from "./ui-kit/components/iconMap.ts";

type Props = {
  children: ReactNode;
};

// <Route path="*" element={<Error error="NotFound" />} />

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppWrapper />}>
      <Route path="/" element={<Navigate to="/appointments" />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/team" element={<Team />} />
      <Route path="/protocols" element={<Protocols />} />
      <Route path="/surveys" element={<Surveys />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/patient-example" element={<PatientExample />} />
    </Route>
  ),
  { basename: "/protocol" } // Add basename here for GitHub Pages
);

export default function App() {
  return (
    <PocketBaseProvider>
      <RouterProvider router={router} />
    </PocketBaseProvider>
  );
}

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AppShell pageBackground="base-100">
      <Main gap="24px" width="stretch" corners="md" marginX="12px" marginY="12px" paddingX="48px" paddingY="48px" textSize="base" direction="flex-col" selfAlign="center" alignItems="start" background="base-0" justifyContent="start">
        <Outlet />
      </Main>
      <Sidebar />
    </AppShell>
  );
}


function Sidebar() {
  
  const tabs = [
    { name: 'Appointments', icon: 'calendar' as IconType, path: '/appointments' },
    { name: 'My Team', icon: 'people' as IconType, path: '/team' },
    { name: 'Protocols', icon: 'flash' as IconType, path: '/protocols' },
    { name: 'Surveys', icon: 'page' as IconType, path: '/surveys' },
    { name: 'Patients', icon: 'smiley' as IconType, path: '/patients' },
  ]

  const location = useLocation() 
  const navigate = useNavigate();
  const path = location.pathname as string;

    return (
      <div className="flex flex-col relative flex-grow-0 z-40 flex-shrink-0 transition-all px-4 py-4 text-base-content text-base bg-base-50 gap-3 items-stretch justify-start    " style={{ order: '-2', width: '280px', maxWidth: '280px', minWidth: '280px', borderColor: 'color-mix(in srgb, var(--base-content) 12%, transparent)', minHeight: '100%' }}>
  <div className="flex flex-row flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto    ">
    <div className="flex flex-col flex-nowrap w-full self-auto        items-stretch justify-start h-auto    ">
      <UserMenu name="Dr Ramos" size="medium" color="primary" icon="arrows-up-down" />
    </div>
  </div>
  <div className="flex flex-row flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto    ">
    <Search size="medium" width="full" bgColor="base-0" />
  </div>
  <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-full    ">
    <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-auto    ">
      {tabs.map((tab) => (
          <SidebarLink 
              key={tab.name}
              size="medium" 
              text={tab.name} 
              color={path?.startsWith(tab.path) ? 'primary' : null} 
              width="full" 
              leftIcon={tab.icon} 
              isActive={path?.startsWith(tab.path)}
              fontWeight="medium"
              indentLevel="0" 
              onClick={() => navigate(tab.path)}
              
          >
              </SidebarLink>
      ))}
    </div>
    <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-auto    ">
      <div className="flex flex-col flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto    "></div>
    </div>
  </div>
  <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-auto    ">
    <SidebarLink size="medium" text="Settings" color={null} width="full" leftIcon="settings" fontWeight="auto" indentLevel="0" />
    <SidebarLink size="medium" text="Log Out" color={null} width="full" leftIcon="log-out" fontWeight="auto" indentLevel="0" />
  </div>
</div>
  )
}
 