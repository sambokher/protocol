import { useState, useRef, useEffect } from "react"
import { AvatarCard, Button, TabGroup, ButtonIcon, Status } from "../../ui-kit/index.ts"
import { useNavigate } from "react-router-dom";
import Overview from "./Overview.jsx";
import FormsView from "./Forms.jsx";
import Trends from "./Trends.jsx";
import Charts from "./Charts.jsx";
import { doctors } from "../data.jsx";

export default function PatientExample() {

    const tabs = [
      // {"label":"Overview","value":"overview"},
      {label:"Profile",value:"info"},
      {label:"Progress",value:"visits"},
      {label:"Trends",value:"trends"},
      {label:"Surveys",value:"forms"},
    ]
    const [activeTab, setActiveTab] = useState(tabs[0].value)

    const navitate = useNavigate()

    const [provider, setProvider] = useState(doctors.ramos)

    return (
      <>
      
      <div className="flex flex-col w-full gap-2 justify-start items-start">
            <div className='-ml-2'>
                <Button 
                text="Patients"
                style="link"
                leftIcon="arrow-left"
                size="small"
                width="auto"
                onClick={()=> navitate('/patients')}
                /></div>
                <div className="flex flex-riw gap-2 w-full items-start justify-between">
                  <h1 className="text-3xl font-medium text-left flex gap-2 items-start">Matthew Collins

                  <Status color="success" size="small" text='Routine' style="bright"/>
                  </h1>
                  <div className="flex flex-row gap-3 items-center">
                        
                        
                        {activeTab === 'forms' && <>
                  <Button style="filled" text="Send Survey" leftIcon="send"  rightIcon='chevron-down' size="small" />
                  </>}
                  {activeTab === 'trends' && <>
                  <ButtonIcon icon="settings"  size="small" />
                  </>}
                  {(activeTab === 'info' || activeTab === 'visits') &&
                  <><span className="hover:underline cursor-pointer mr-0">
                        <AvatarCard name={provider.name} type="image" imageSrc={provider.image} size="small"
                        imageSize="24px" imageColor="primary" imagePosition="left" />
                        </span>
                        <ReAssign setProvider={setProvider} provider={provider} />
                    </>}
                  <AptOptions />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full justify-between items-end">
                <TabGroup tabs={tabs} value={activeTab} selectColor="primary" onChange={setActiveTab} width='full'
                underlineAll
                />
                </div>
            </div>
            {activeTab === 'info' && <Overview />}
            {activeTab === 'forms' && <FormsView />}      
            {activeTab === 'visits' && <Trends />}
            {activeTab === 'trends' &&  <Charts />}
      </>
  )
}








function ReAssign({ setProvider, provider }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
      setShowMenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
      }
  };

  // Add event listener to detect clicks outside the menu
  useEffect(() => {
      if (showMenu) {
          document.addEventListener('mousedown', handleClickOutside);
      } else {
          document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [showMenu]);

  
  function reassign(doctor) {
      setProvider(doctor)
      setShowMenu(false);
  }
  return (
      <div style={{ position: 'relative' }} ref={menuRef}>
          <Button text="Re-Assign" size="small" style="filled" onClick={toggleMenu} rightIcon="chevron-down" />
          {showMenu && (
              <div className="absolute -bottom-2 right-0 p-1 flex flex-col gap-2 rounded-md shadow-md z-10 bg-base-0 translate-y-full
              ring-[0.5px] ring-current-10 
              "
              style={{animation: 'fadeInDown 0.1s ease-in-out'}}
              > 
              {Object.keys(doctors).map((key, index) => (
                  <div
                      key={index}
                      className={`hover:bg-current-10 select-none py-1 px-1 pr-2 rounded-md cursor-pointer
                          ${provider.name === doctors[key].name ? 'bg-current-10' : ''}`}
                      onClick={() => reassign(doctors[key])}
                  >
                      <AvatarCard
                          name={doctors[key].name}
                          type="image"
                          imageSrc={doctors[key].image}
                          imageSize="20px"
                          imageColor="primary"
                          imagePosition="left"
                      />
                  </div>
              ))}
              </div>
          )}
      </div>
  );
};

function AptOptions() {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    // Add event listener to detect clicks outside the menu
    useEffect(() => {
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div style={{ position: 'relative' }} ref={menuRef}>
            <ButtonIcon icon="more-horiz" size="small" onClick={toggleMenu} />
            {showMenu && (
                <div
                    
                    className="absolute bottom-0 right-0 p-1 flex flex-col gap-1 rounded-md shadow-md z-10 bg-base-0 translate-y-full"
                >
                    <Button text="Edit" size="small" width="full" style='ghost' />
                    <Button text="Cancel" color='warning' size="small"  width="full" style='ghost' />
                </div>
            )}
        </div>
    );
};
