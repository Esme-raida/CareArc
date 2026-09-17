// CareArc — Clinical notes seed data
// Notes match each patient's vitals trajectory to create a coherent clinical narrative
// Types: "observation" | "treatment" | "review" | "handover"

export const notesData = [

  // ═══════════════════════════════════════════
  // PT-001 — Amina Yusuf (WORSENING)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-001",
    patientId: "PT-001",
    timestamp: "2026-07-26T08:30:00",
    content: "Patient admitted with dry cough and low-grade fever. Vitals within normal limits on admission. Started on oral antibiotics.",
    type: "observation",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-002",
    patientId: "PT-001",
    timestamp: "2026-07-27T09:00:00",
    content: "Fever persisting despite antibiotics. Patient reports worsening cough, now productive. Heart rate trending upward. Ordered chest X-ray and blood cultures.",
    type: "review",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-003",
    patientId: "PT-001",
    timestamp: "2026-07-27T15:00:00",
    content: "Switched from oral to IV antibiotics. Supplemental oxygen started at 2L via nasal cannula.",
    type: "treatment",
    author: "Nurse Fatima",
  },
  {
    id: "NOTE-004",
    patientId: "PT-001",
    timestamp: "2026-07-28T08:30:00",
    content: "Patient reports increasing shortness of breath overnight. SpO₂ declining despite supplemental oxygen. Escalated to senior registrar for review.",
    type: "observation",
    author: "Nurse Fatima",
  },

  // ═══════════════════════════════════════════
  // PT-002 — John Okafor (FLUCTUATING)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-005",
    patientId: "PT-002",
    timestamp: "2026-07-26T09:00:00",
    content: "Patient under observation for recurrent palpitations. Baseline ECG shows irregular rhythm. Cardiology consult requested.",
    type: "observation",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-006",
    patientId: "PT-002",
    timestamp: "2026-07-26T14:30:00",
    content: "Episode of rapid heart rate recorded at 110 bpm during routine check. Patient reports feeling lightheaded. Resolved spontaneously after 20 minutes.",
    type: "observation",
    author: "Nurse Fatima",
  },
  {
    id: "NOTE-007",
    patientId: "PT-002",
    timestamp: "2026-07-27T15:00:00",
    content: "Another tachycardic episode — HR peaked at 120 bpm. Cardiology reviewed. Started on beta-blocker. Monitor response over 24 hours.",
    type: "treatment",
    author: "Dr. Sarah Chen",
  },

  // ═══════════════════════════════════════════
  // PT-003 — Mary Adebayo (IMPROVING)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-008",
    patientId: "PT-003",
    timestamp: "2026-07-22T10:00:00",
    content: "Post-operative day 0. Patient returned from surgery (appendectomy). Vitals elevated as expected post-anaesthesia. Pain managed with IV paracetamol.",
    type: "observation",
    author: "Nurse James",
  },
  {
    id: "NOTE-009",
    patientId: "PT-003",
    timestamp: "2026-07-23T09:00:00",
    content: "Post-op day 1. Patient mobilising with assistance. Wound site clean, no signs of infection. Vitals improving. Transitioned to oral pain relief.",
    type: "review",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-010",
    patientId: "PT-003",
    timestamp: "2026-07-25T08:30:00",
    content: "Post-op day 3. Steady improvement. Patient eating well, mobilising independently. Vitals approaching baseline. Discharge planning initiated.",
    type: "review",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-011",
    patientId: "PT-003",
    timestamp: "2026-07-28T09:00:00",
    content: "Post-op day 6. All vitals within normal range. Wound healing well. Cleared for discharge tomorrow pending final review.",
    type: "review",
    author: "Dr. Sarah Chen",
  },

  // ═══════════════════════════════════════════
  // PT-004 — Bello Kasim (NEW PATIENT)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-012",
    patientId: "PT-004",
    timestamp: "2026-07-28T14:30:00",
    content: "Patient presented to A&E with acute chest pain radiating to left arm. Onset 2 hours ago during physical activity. No prior cardiac history. ECG and troponin ordered. Admitted for observation.",
    type: "observation",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-013",
    patientId: "PT-004",
    timestamp: "2026-07-28T21:00:00",
    content: "Initial troponin result negative. ECG shows no acute ST changes. Pain subsided after rest. Continue monitoring. Repeat troponin at 6 hours.",
    type: "review",
    author: "Nurse James",
  },

  // ═══════════════════════════════════════════
  // PT-005 — Chidinma Eze (STABLE — chronic)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-014",
    patientId: "PT-005",
    timestamp: "2026-07-15T09:00:00",
    content: "Patient admitted for hypertensive crisis. BP 180/110 on arrival. IV antihypertensives administered. Blood glucose elevated at 14.2 mmol/L — diabetes medication adjusted.",
    type: "observation",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-015",
    patientId: "PT-005",
    timestamp: "2026-07-18T08:00:00",
    content: "BP stabilising around 148/92. Still above target but significant improvement from admission. Oral antihypertensives adjusted. Dietitian referral made.",
    type: "review",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-016",
    patientId: "PT-005",
    timestamp: "2026-07-24T08:00:00",
    content: "BP remains consistently around 145-150/90-94. Medication compliance confirmed. Blood glucose well-controlled on current regimen. Continue current management, review in 3 days.",
    type: "review",
    author: "Dr. Sarah Chen",
  },
  {
    id: "NOTE-017",
    patientId: "PT-005",
    timestamp: "2026-07-28T08:30:00",
    content: "Stable. BP 145/90, glucose 7.8 mmol/L. Patient comfortable. Discussed discharge plan — pending home BP monitoring arrangement.",
    type: "handover",
    author: "Nurse Fatima",
  },

  // ═══════════════════════════════════════════
  // PT-006 — David Adeleke (OUTPATIENT)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-018",
    patientId: "PT-006",
    timestamp: "2026-07-28T10:00:00",
    content: "Routine executive wellness examination. Physical examination unremarkable. Cardiovascular and respiratory parameters optimal. Cleared with healthy lifestyle recommendations.",
    type: "review",
    author: "Dr. Sarah Chen",
  },

  // ═══════════════════════════════════════════
  // PT-007 — Fatima Abubakar (OUTPATIENT)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-019",
    patientId: "PT-007",
    timestamp: "2026-07-28T10:45:00",
    content: "Second-trimester routine antenatal visit. Fundal height corresponds with dates. Fetal heart sounds clear at 140 BPM. Urine dipstick clear. Routine supplements refilled.",
    type: "observation",
    author: "Dr. Sarah Chen",
  },

  // ═══════════════════════════════════════════
  // PT-008 — Oluwaseun Bakare (OUTPATIENT)
  // ═══════════════════════════════════════════
  {
    id: "NOTE-020",
    patientId: "PT-008",
    timestamp: "2026-07-28T11:30:00",
    content: "Hypertension outpatient follow-up. Blood pressure demonstrates adequate control on current regimen. Patient advised on low-sodium dietary adherence. Follow-up booked in 6 weeks.",
    type: "treatment",
    author: "Dr. Sarah Chen",
  },
];
