export const doctors = {
    smith: {
        name: 'Dr Smith', 
        image: "https://images.unsplash.com/photo-1642977195740-1204d9c401b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTQ5NTB8MHwxfHNlYXJjaHw1fHxkb2N0b3IlMjBoZWFkc2hvdHxlbnwwfHx8fDE3Mjg2NjA0MDh8MA&ixlib=rb-4.0.3&q=85",
        isOwner: true,
        category: 'Cardiology',
    },
    baker: {
        name: 'Dr Baker', 
        image: "https://i0.wp.com/oohstloustudios.com/wp-content/uploads/2023/07/Soundhealth2019-0087-Edit-jpg.webp?fit=1000%2C667&ssl=1",
        category: 'Dermatology'
    },
    ramos: {
        name: 'Dr Ramos', 
        image: "https://keck2.usc.edu/wp-content/uploads/2022/12/A4A6851-featured.jpg",
        category: 'Endocrinology'
    
    },
}

export const staff = {
    nurses: {
      johnson: {
        name: 'Nurse Johnson',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3OmvskLm_g-nLHS6TQeUmsRyJkx-Ko8hJw&s',
        role: 'Head Nurse',
        department: 'Cardiology',
      },
      williams: {
        name: 'Nurse Williams',
        image: 'https://media.gettyimages.com/id/1306528459/photo/hispanic-male-nurse-headshot-portrait.jpg?s=612x612&w=gi&k=20&c=eZho2MLVk5ysl5CDbhXmYHa0evaskmcaeX55EMDNmoY=',
        role: 'Nurse Practitioner',
        department: 'Dermatology',
      },
    },
    admin: {
      anderson: {
        name: 'Admin Anderson',
        image: 'https://media.istockphoto.com/id/1345972457/photo/a-female-nurse-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=uQbnJmSUN5bwJiiQdCMzizmW4EHR__NlTULHwjdE3L8=',
        role: 'Office Manager',
      },
      taylor: {
        name: 'Admin Taylor',
        image: 'https://media.istockphoto.com/id/1323990963/photo/a-young-nurse-looking-at-the-camera-in-blue-medical-scrubs.jpg?s=612x612&w=0&k=20&c=hfyRZ3hKYa4pNAYDm2YjUeDsI5b966dnXIHgiXLNlpU=',
        role: 'Front Desk Coordinator',
      },
    },
  };


export const statusMap = {
    'Routine': 'success',
    'Observation': 'error',
    'Escalation': 'warning'
}

export const patients = [
    {"id": 1, name: "David Brown", "office": "Dr. Smith's Office", "status": "Routine"},
    {"id": 2, name: "Sarah Green", "office": "Dr. Baker's Office", "status": "Observation"},
    {"id": 3, name: "Olivia White", "office": "Dr. Johnson's Office", "status": "Observation"},
    {"id": 4, name: "James Black", "office": "Dr. Lee's Office", "status": "Escalation"},
    {"id": 5, name: "Sophia Adams", "office": "Dr. Clark's Office", "status": "Routine"},
    {"id": 6, name: "Matthew Collins", "office": "Dr. Taylor's Office", "status": "Observation"},
    {"id": 7, name: "Emily Harris", "office": "Dr. Davis's Office", "status": "Routine"},
    {"id": 8, name: "Lucas Brown", "office": "Dr. Wilson's Office", "status": "Observation"},
    {"id": 9, name: "Michael Lee", "office": "Dr. Murphy's Office", "status": "Escalation"},
    {"id": 10, name: "Lily Thompson", "office": "Dr. Thompson's Office", "status": "Routine"}
];

export const appointmentsData = [
    { time: '11AM', patient: patients[0], status: 'success', doctor: doctors.smith, reason: 'Routine Checkup' }, // David Brown
    { time: '12PM', patient: patients[4], status: 'success', doctor: doctors.baker, reason: 'Weight Management' }, // Sophia Adams
    { time: '1PM', patient: patients[8], status: 'warning', doctor: doctors.ramos, reason: 'Blood Pressure Review' },  // Michael Lee
    { time: '2PM', patient: patients[7], status: 'error', doctor: doctors.ramos, reason: 'Diabetes Follow-up' },    // Lucas Brown
    { time: '3PM', patient: patients[6], status: 'success', doctor: doctors.smith, reason: 'Routine Physical' },  // Emily Harris
    { time: '4PM', patient: patients[5], status: 'success', doctor: doctors.baker, reason: 'Medication Review' },  // Matthew Collins
    { time: '5PM', patient: patients[1], status: 'success', doctor: doctors.ramos, reason: 'Dietary Consultation' },  // Sarah Green
];


// Compact node styling and meaningful nodes for diabetes diagnosis
