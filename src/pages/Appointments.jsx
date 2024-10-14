import { useEffect, useRef, useState } from "react";
import { AvatarCard, Status, MiniCalendar, Button, ButtonIcon, StepperArray, Alert } from "../ui-kit/index.ts"
import { doctors, appointmentsData, statusMap } from "./data";
import { useNavigate } from "react-router-dom";

export default function Appointments(){
  const [selectedApt, setSelectedApt] = useState(appointmentsData[5]);
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-3xl font-medium text-left mb-2">Appointments</h1>
        <div className="flex flex-row w-full gap-8">
          <div className="flex flex-col w-full text-base-content bg-base-0 gap-3">
            <h1 className="text-lg xsfont-medium">October 10, 2024</h1>
            <div className="flex flex-row justify-between w-full gap-2 items-centet">
            <span>Thursday</span>
            <div className="flex flex-row gap-0.5 w-52">
            <StepperArray 
                size="small"
                width="full" 
                options={[
                    {label: 'Yesterday', value: 'yesterday'},
                    {label: 'Today', value: 'today'}, {label: 'Tomorrow', value: 'tomorrow'}]}
                value="today"
            />
            <Calendar />
            </div>
            </div>
            <div className="flex flex-col w-full gap-0">
              {appointmentsData.map((appointment, index) => 
                <Appointment appointment={appointment} index={index} key={index}
                onClick={() => setSelectedApt(appointment)} 
                isSelected={selectedApt === appointment}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-full gap-6">
              <Details selectedApt={selectedApt} />
          </div>
        </div>
      </div>
    </>
  );
};


function Appointment({ appointment, index, onClick, isSelected }) {
    // hover:bg-success/20 hover:bg-warning/20 hover:bg-error/20
    
    
    return (
        <div key={index} className="flex flex-row w-full gap-5 items-start border-t py-1 border-base-50" >
            
                  <div className="flex flex-col flex-shrink-0" style={{ width: '80px' }}>
                    <span className="text-xs opacity-50 lowercase">{appointment.time}</span>
                  </div>
                  <div className={`flex flex-row w-full text-base-content gap-3 
                  px-3 py-2 rounded-md items-start justify-between h-16
                  
                   
                  ${isSelected ? `ring-1 ring-${statusMap[appointment.patient?.status]} bg-${statusMap[appointment.patient?.status]}/20` : `ring-[0.5px] ring-${statusMap[appointment.patient?.status]}/50 bg-${statusMap[appointment.patient?.status]}/10`}
                   shadow-sm hover:shadow-md hover:ring-${statusMap[appointment.patient?.status]}
                  transition-all duration-150 cursor-pointer
                  `}   
                  onClick={onClick}
                  >
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold"
                        >{appointment.patient?.name}</span>
                        <span className="text-xs font-normal"
                        >{appointment.reason}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                    {/*<Status 
                        size="small" 
                        text={appointment.status === 'success' ? 'Green' : appointment.status === 'warning' ? 'Red' : 'Orange'} 
                        color={appointment.status} style="subtle" isPill />*/}
                        {appointment.doctor && <span className="text-xs font-medium">
                            {appointment.doctor?.name}
                            </span>}
                    </div>
                  </div>
                </div>
    );
}


const Calendar = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const toggleCalendar = () => {
        setShowCalendar((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };

    // Add event listener to detect clicks outside the calendar
    useEffect(() => {
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    return (
        <div style={{ position: 'relative' }}>
            <ButtonIcon
                icon="calendar"
                size="small"
                style="ghost"
                onClick={toggleCalendar}
            />
            {showCalendar && (
                <div
                    ref={calendarRef}
                    className="absolute top-0 left-0 p-1 rounded-md shadow-md z-10 bg-base-0"
                >
                    <MiniCalendar 
                        bgColor="base-0"
                        onChange={() => setShowCalendar(false)}
                        />
                </div>
            )}
        </div>
    );
};

function Details({selectedApt}) {
    //<Badge text="Green Badge" size="small" />

    const [provider, setProvider] = useState(selectedApt.doctor);
    useEffect(() => {
        setProvider(selectedApt.doctor);
    }, [selectedApt]);

    const navitate = useNavigate()
    return (
        <div className="flex flex-row w-full gap-6 text-sm">
              <div className="flex flex-col w-full gap-3">
                <div className="flex flex-row items-center justify-between w-full">
                    <h2 className="text-lg font-semibold hover:underline select-none" onClick={()=> navitate('/patient-example')}>{selectedApt.patient.name}</h2>
                    <div className="flex flex-row gap-2 items-center">
                        <span className="hover:underline cursor-pointer mr-3">
                        <AvatarCard name={provider.name} type="image" imageSrc={provider.image} size="small"
                        imageSize="20px" imageColor="primary" imagePosition="left" />
                        </span>
                        <ReAssign setProvider={setProvider} provider={provider} />
                        <AptOptions />
                    </div>
                </div>

                <div className="flex flex-row items-center justify-start w-full gap-3 text-sm font-medium">  
                    <Status size="small" 
                    text={selectedApt.patient.status}
                    color={statusMap[selectedApt.patient.status]}   />
                    
                    

                </div>
                <div className="w-full flex flex-col gap-0.5 mt-3">
                    <span className="text-sm opacity-70">Reason for Visit</span>
                    <p className="">
                        Patient is presenting for a follow-up to evaluate blood pressure control and assess the effectiveness of Lisinopril for hypertension management. Additionally, the patient reports occasional dizziness, which needs further evaluation.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-0.5 mt-3">
                    <span className="text-sm opacity-70">Medications</span>
                    <ul className="list-disc pl-5">
                        <li>Lisinopril 10mg (1/day)</li>
                        <li>Metformin 500mg (2/day)</li>
                        <li>Amlodipine 5mg (1/day)</li>
                    </ul>
                </div>


                <div className="w-full flex flex-col gap-0.5 mt-3 ">
                    <span className="text-sm opacity-70 upp">Recent Labs
                    </span>
                    <ul className="list-disc pl-5 mb-2">
                        <li className="text-warning-focus">Hemoglobin A1c: 7.1%</li>
                        <li className="text-error-focus">Cholesterol (Total): 210 mg/dL</li>
                        <li className="text-warning-focus">LDL Cholesterol: 130 mg/dL (high)</li>
                        <li>Creatinine: 0.9 mg/dL</li>
                        <li className="text-error-focus">Glucose: 145 mg/dL</li>
                    </ul>
                </div>
                
                
              </div>
            </div>
    )
}

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