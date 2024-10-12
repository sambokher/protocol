import { SidebarLink, UserMenu, Search } from 'ui-kit/exports/react'

function Sidebar({
    currentTab, setCurrentTab
}) {

    
    const tabs = [
        { name: 'Appointments', icon: 'calendar' },
        { name: 'My Team', icon: 'people' },
        { name: 'Protocols', icon: 'flash' },
        { name: 'Surveys', icon: 'page' },
        { name: 'Patients', icon: 'smiley' },
    ]

    console.log(currentTab)
    
    return (
        <div className="flex flex-col relative flex-grow-0 z-40 flex-shrink-0 transition-all
     px-4 py-4 text-base-content text-base bg-base-50 gap-3 items-stretch justify-start   undefined undefined" style={{ order: '-2', width: '280px', maxWidth: '280px', minWidth: '280px', borderColor: 'color-mix(in srgb, var(--base-content) 12%, transparent)', minHeight: '100%' }}>
    <div className="flex flex-row flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
      <div className="flex flex-col flex-nowrap w-full self-auto        items-stretch justify-start h-auto   undefined undefined">
        <UserMenu name="Dr Ramos" size="medium" color="primary" icon="arrows-up-down" />
      </div>
    </div>
    <div className="flex flex-row flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined">
      <Search size="medium" width="full" bgColor="base-0" />
    </div>
    <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-full   undefined undefined">
      <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-auto   undefined undefined">
        {tabs.map((tab) => (
            <SidebarLink 
                key={tab.name}
                size="medium" 
                text={tab.name} 
                color={currentTab === tab.name ? 'primary' : null} 
                width="full" 
                leftIcon={tab.icon} 
                isActive={currentTab === tab.name}
                fontWeight="medium"
                indentLevel="0" 
                onClick={(e) => {e.stopPropagation(); tab.links?.length ? setCurrentTab(tab.links[0].name): setCurrentTab(tab.name)}}
                
            >
                </SidebarLink>
        ))}
      </div>
      <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-auto   undefined undefined">
        <div className="flex flex-col flex-nowrap w-full self-auto     gap-3   items-start justify-start h-auto   undefined undefined"></div>
      </div>
    </div>
    <div className="flex flex-col flex-nowrap w-full self-auto     gap-1.5   items-start justify-start h-auto   undefined undefined">
      <SidebarLink size="medium" text="Settings" color={null} width="full" leftIcon="settings" fontWeight="auto" indentLevel="0" />
      <SidebarLink size="medium" text="Log Out" color={null} width="full" leftIcon="log-out" fontWeight="auto" indentLevel="0" />
    </div>
  </div>
    )
}

export default Sidebar

/*   {tab.links && (currentTab == tab.name || tab.links?.map((link) => link.name)?.includes(currentTab))
                
                && tab.links.map((link) => (
                    <SidebarLink 
                        key={link.name}
                        size="medium" 
                        text={link.name} 
                        color={currentTab === link.name ? 'primary' : null} 
                        width="full" 
                        leftIcon={link.icon} 
                        fontWeight="auto" 
                        indentLevel="1" 
                        onClick={(e) => {e.stopPropagation(); setCurrentTab(link.name)}}
                    />
                ))}*/