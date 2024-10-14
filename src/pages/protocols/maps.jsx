export const diabetes = {
    nodes: [
    { 
      id: '1', 
      data: { label: 'Patient Screening' }, 
      position: { x: 250, y: 0 }, 
      style: { width: 180, textAlign: 'center' } 
    },
    { 
      id: '2', 
      data: { label: 'Fasting Glucose Test' }, 
      position: { x: 250, y: 120 }, 
      style: { width: 180, textAlign: 'center' } 
    },
    { 
      id: '3', 
      data: { label: 'A1C Test' }, 
      position: { x: 250, y: 240 }, 
      style: { width: 180, textAlign: 'center' } 
    },
    { 
      id: '4', 
      data: { label: 'High Risk: Retinopathy Screening' }, 
      position: { x: 100, y: 360 }, 
      style: { width: 220, textAlign: 'center' } 
    },
    { 
      id: '5', 
      data: { label: 'Low Risk: Lifestyle Changes' }, 
      position: { x: 400, y: 360 }, 
      style: { width: 180, textAlign: 'center' } 
    },
  ], 
  edges: [
    { 
      id: 'e1-2', 
      source: '1', 
      target: '2', 
      animated: true, 
      sourceHandle: 'bottom', 
      targetHandle: 'top' 
    },
    { 
      id: 'e2-3', 
      source: '2', 
      target: '3', 
      animated: true, 
      sourceHandle: 'bottom', 
      targetHandle: 'top' 
    },
    { 
      id: 'e3-4', 
      source: '3', 
      target: '4', 
      label: 'High A1C', 
      animated: true, 
      sourceHandle: 'bottom', 
      targetHandle: 'top' 
    },
    { 
      id: 'e3-5', 
      source: '3', 
      target: '5', 
      label: 'Normal A1C', 
      animated: true, 
      sourceHandle: 'bottom', 
      targetHandle: 'top' 
    },
  ]}

export const complexMap = {
  "nodes": [
    {
      "id": "1",
      "data": { "label": "Patient Screening", "type": "action" },
      "position": { "x": 250, "y": 0 },
      "style": { "backgroundColor": "#A8DADC", "width": 180, "textAlign": "center" }
    },
    {
      "id": "2",
      "data": { "label": "Family History?", "type": "question" },
      "position": { "x": 100, "y": 120 },
      "style": { "backgroundColor": "#F1FAEE", "borderRadius": "10px", "width": 200, "textAlign": "center" }
    },
    {
      "id": "3",
      "data": { "label": "Fasting Glucose Test", "type": "action" },
      "position": { "x": 250, "y": 240 },
      "style": { "backgroundColor": "#A8DADC", "width": 180, "textAlign": "center" }
    },
    {
      "id": "4",
      "data": { "label": "A1C Test", "type": "action" },
      "position": { "x": 250, "y": 360 },
      "style": { "backgroundColor": "#A8DADC", "width": 180, "textAlign": "center" }
    },
    {
      "id": "5",
      "data": { "label": "High A1C (>6.5%)?", "type": "decision" },
      "position": { "x": 100, "y": 480 },
      "style": { "backgroundColor": "#E63946", "borderRadius": "10px", "width": 220, "textAlign": "center", "color": "#FFF" }
    },
    {
      "id": "6",
      "data": { "label": "Retinopathy Screening", "type": "action" },
      "position": { "x": 100, "y": 600 },
      "style": { "backgroundColor": "#457B9D", "width": 220, "textAlign": "center", "color": "#FFF" }
    },
    {
      "id": "7",
      "data": { "label": "Lifestyle Changes", "type": "action" },
      "position": { "x": 400, "y": 480 },
      "style": { "backgroundColor": "#457B9D", "width": 180, "textAlign": "center", "color": "#FFF" }
    },
    {
      "id": "8",
      "data": { "label": "Follow-Up in 3 Months", "type": "action" },
      "position": { "x": 400, "y": 600 },
      "style": { "backgroundColor": "#1D3557", "width": 180, "textAlign": "center", "color": "#FFF" }
    },
    {
      "id": "9",
      "data": { "label": "Monitor Risk Factors", "type": "action" },
      "position": { "x": 250, "y": 720 },
      "style": { "backgroundColor": "#1D3557", "width": 180, "textAlign": "center", "color": "#FFF" }
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2",
      "animated": true,
      "sourceHandle": "bottom",
      "targetHandle": "top",
      "label": "Initial Assessment"
    },
    {
      "id": "e2-3",
      "source": "2",
      "target": "3",
      "animated": true,
      "sourceHandle": "bottom",
      "targetHandle": "top",
      "label": "Family History Positive"
    },
    {
      "id": "e3-4",
      "source": "3",
      "target": "4",
      "animated": true,
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "e4-5",
      "source": "4",
      "target": "5",
      "animated": true,
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "e5-6",
      "source": "5",
      "target": "6",
      "animated": true,
      "label": "Yes",
      "sourceHandle": "left",
      "targetHandle": "top"
    },
    {
      "id": "e5-7",
      "source": "5",
      "target": "7",
      "animated": true,
      "label": "No",
      "sourceHandle": "right",
      "targetHandle": "top"
    },
    {
      "id": "e7-8",
      "source": "7",
      "target": "8",
      "animated": true,
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "e8-9",
      "source": "8",
      "target": "9",
      "animated": true,
      "sourceHandle": "bottom",
      "targetHandle": "top"
    }
  ]
}