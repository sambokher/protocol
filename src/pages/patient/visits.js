export const visits = [
    {
      id: 1,
      date: '12 Jan, 24',
      status: 'Escalation',
      category: 'Weight Gain',
      summary: {
        visitSummary: {
          reason: 'Weight gain; elevated blood pressure.',
          diagnosis: ['obesity', 'pre-diabetes', 'covid-19'],
        },
        vitals: {
          weight: { value: '220 lbs', color: '' },
          BMI: { value: '31.6', color: 'warning' },
          bloodPressure: { value: '140/90 mmHg', color: 'error' },
          heartRate: { value: '90 bpm', color: 'warning' },
        },
        bloodPanel: {
          fastingGlucose: { value: '120 mg/dL', color: 'warning' },
          cholesterol: { value: '240 mg/dL', color: 'warning' },
          ldl: { value: '160 mg/dL', color: 'warning' },
          hdl: { value: '35 mg/dL', color: 'warning' },
          triglycerides: { value: '250 mg/dL', color: 'warning' },
        },
        hormones: {
          thyroid: { value: '3.0 mIU/L', color: '' },
          cortisol: { value: '15 mcg/dL', color: '' },
          insulin: { value: '20 µU/mL', color: 'warning' },
        },
        mentalHealth: {
          status: 'concern',
          stress: 'high',
          note: 'High stress levels and fatigue reported.',
        },
        medications: {
          rx: [
            { name: 'Metformin', dose: '500 mg', frequency: 'daily' },
            { name: 'Lisinopril', dose: '10 mg', frequency: 'daily' },
            { name: 'Adderall', dose: '10 mg', frequency: 'daily' },
          ],
          supplements: [
            { name: 'Vitamin D', dose: '1000 IU', frequency: 'daily' },
            { name: 'Omega-3', dose: '1000 mg', frequency: 'daily' },
          ],
        },
        covid: {
          test: 'positive (1/12/24)',
          respiratory: ['Shortness of breath', 'Cough', 'Sore throat'],
          neurological: ['Loss of smell', 'Headache'],
          physical: ['Fatigue', 'Muscle pain', 'Body aches'],
          gastrointestinal: [],
          
        },
        lifeStyle: {
          diet: {quality: 'poor', attributes: ['sweets', 'fast food']},
          exercise: { level: 'low', attributes: ['walking'] },
          sleep: { quality: 'low', attributes: ['insomnia'] },
          caffeine: 'daily',
          alcohol: '1-2 drinks/week',
          smoking: '–',
          cannabis: '–',
          substances: [],
        },
        maleHealth: {
          urination: 'normal',
          prostate: 'normal',
          testosterone: 'normal',
          colonScreen: { status: 'normal', date: '15 Jan 24' },
        },
      },
    },
    {
      id: 2,
      date: '10 May, 24',
      status: 'Observation',
      category: 'Weight Gain',
      summary: {
        visitSummary: {
          reason: 'Follow-up after lifestyle modifications.',
          diagnosis: ['obesity', 'pre-diabetes'],
        },
        vitals: {
          weight: {
            value: '210 lbs',
            color: '',
            change: '↓10',
            changeColor: 'success',
          },
          BMI: {
            value: '30.0',
            color: '',
            change: '↓1.6',
            changeColor: 'success',
          },
          bloodPressure: {
            value: '130/85 mmHg',
            color: '',
            change: '↓10 / ↓5',
            changeColor: 'success',
          },
          heartRate: {
            value: '80 bpm',
            color: '',
            change: '↓10',
            changeColor: 'success',
          },
        },
        bloodPanel: {
          fastingGlucose: {
            value: '110 mg/dL',
            color: 'error',
            change: '↓10',
            changeColor: 'success',
          },
          cholesterol: {
            value: '220 mg/dL',
            color: 'error',
            change: '↓20',
            changeColor: 'success',
          },
          ldl: {
            value: '140 mg/dL',
            color: 'error',
            change: '↓20',
            changeColor: 'success',
          },
          hdl: {
            value: '40 mg/dL',
            color: 'error',
            change: '↑5',
            changeColor: 'success',
          },
          triglycerides: {
            value: '200 mg/dL',
            color: 'error',
            change: '↓50',
            changeColor: 'success',
          },
        },
        hormones: {
          thyroid: {
            value: '3.0 mIU/L',
            color: '',
            change: '',
            changeColor: 'base',
          },
          cortisol: {
            value: '14 mcg/dL',
            color: '',
            change: '↓1',
            changeColor: 'base',
          },
          insulin: {
            value: '18 µU/mL',
            color: 'error',
            change: '↓2',
            changeColor: 'success',
          },
        },
        mentalHealth: {
          status: 'stable',
          stress: 'moderate',
          note: 'Stress levels reduced; mood improving.',
        },
        medications: {
          rx: [
            { name: 'Metformin', dose: '500 mg', frequency: 'daily' },
            { name: 'Lisinopril', dose: '10 mg', frequency: 'daily' },
          ],
          supplements: [
            { name: 'Vitamin D', dose: '1000 IU', frequency: 'daily' },
            { name: 'Omega-3', dose: '1000 mg', frequency: 'daily' },
          ],
        },
        covid: {
            test: 'negative (5/5/24)',
          respiratory: ['Cough'],
          neurological: [],
          physical: ['Fatigue'],
          gastrointestinal: [],
          
        },
        lifeStyle: {
          diet: {quality: 'balanced', attributes: ['low sugar', 'low carb']},
          exercise: { level: 'low', attributes: ['walking'] },
          sleep: { quality: 'good', attributes: [] },
          caffeine: 'daily',
          alcohol: '1-2 drinks/week',
          smoking: '–',
          cannabis: '–',
          substances: [],
        },
        maleHealth: {
          urination: 'normal',
          prostate: 'normal',
          testosterone: 'normal',
          colonScreen: { status: 'normal', date: '15 Jan 24' },
        },
      },
    },
    {
      id: 3,
      date: '8 Oct, 24',
      status: 'Routine',
      category: 'Weight Gain',
      summary: {
        visitSummary: {
          reason: 'Routine check-up;',
          diagnosis: []
        },
        vitals: {
          weight: {
            value: '195 lbs',
            color: '',
            change: '↓15',
            changeColor: 'success',
          },
          BMI: {
            value: '28.0',
            color: '',
            change: '↓2.0',
            changeColor: 'success',
          },
          bloodPressure: {
            value: '120/80 mmHg',
            color: '',
            change: '↓10 / ↓5',
            changeColor: 'success',
          },
          heartRate: {
            value: '70 bpm',
            color: '',
            change: '↓10',
            changeColor: 'success',
          },
        },
        bloodPanel: {
          fastingGlucose: {
            value: '95 mg/dL',
            color: '',
            change: '↓15',
            changeColor: 'success',
          },
          cholesterol: {
            value: '190 mg/dL',
            color: '',
            change: '↓30',
            changeColor: 'success',
          },
          ldl: {
            value: '120 mg/dL',
            color: 'error',
            change: '↓20',
            changeColor: 'success',
          },
          hdl: {
            value: '50 mg/dL',
            color: '',
            change: '↑10',
            changeColor: 'success',
          },
          triglycerides: {
            value: '150 mg/dL',
            color: '',
            change: '↓50',
            changeColor: 'success',
          },
        },
        hormones: {
          thyroid: {
            value: '3.0 mIU/L',
            color: '',
            change: '—',
            changeColor: 'base',
          },
          cortisol: {
            value: '13 mcg/dL',
            color: '',
            change: '↓1',
            changeColor: '',
          },
          insulin: {
            value: '15 µU/mL',
            color: '',
            change: '↓3',
            changeColor: 'success',
          },
        },
        mentalHealth: {
          status: 'good',
          stress: 'low',
          note: 'Feeling well; stress levels low.',
        },
        medications: {
          rx: [
            { name: 'Metformin', dose: '500 mg', frequency: 'daily' },
            { name: 'Lisinopril', dose: '10 mg', frequency: 'daily' },
          ],
          supplements: [
            { name: 'Vitamin D', dose: '1000 IU', frequency: 'daily' },
            { name: 'Omega-3', dose: '1000 mg', frequency: 'daily' },
          ],
        },
        covid: {
            test: 'negative (10/5/24)',
          respiratory: [],
          neurological: [],
          physical: [],
          gastrointestinal: [],
          
        },
        lifeStyle: {
          diet: {quality: 'balanced', attributes: ['vegetarian', 'low sugar']},
          exercise: { level: 'moderate', attributes: ['walking', 'cycling'] },
          sleep: { quality: 'good', attributes: [] },
          caffeine: 'daily',
          alcohol: '1-2 drinks/week',
          smoking: '–',
          cannabis: '–',
          substances: ['psilocybin (microdosing)'],
        },
        maleHealth: {
          urination: 'normal',
          prostate: 'normal',
          testosterone: 'normal',
          colonScreen: { status: 'normal', date: '15 Jan 24' },
        },
      },
    },
  ];