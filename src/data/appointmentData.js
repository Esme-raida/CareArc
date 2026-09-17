const today = new Date();
const formatDate = (date) => date.toISOString().split("T")[0];

const tomorrow = new Date(today.getTime() + 86400000);
const yesterday = new Date(today.getTime() - 86400000);
const nextWeek = new Date(today.getTime() + 7 * 86400000);

export const appointmentsData = [
  // PT-001: Amina Yusuf
  {
    id: 1,
    patientId: "PT-001",
    name: "Amina Yusuf",
    type: "Follow-up",
    time: "09:00",
    duration: 30,
    isCompleted: true,
    date: formatDate(today),
  },
  {
    id: 2,
    patientId: "PT-001",
    name: "Amina Yusuf",
    type: "Consultation",
    time: "10:00",
    duration: 45,
    isCompleted: false,
    date: formatDate(tomorrow),
  },

  // PT-002: John Okafor
  {
    id: 3,
    patientId: "PT-002",
    name: "John Okafor",
    type: "Consultation",
    time: "10:30",
    duration: 45,
    isCompleted: true,
    date: formatDate(today),
  },
  {
    id: 4,
    patientId: "PT-002",
    name: "John Okafor",
    type: "Check-up",
    time: "14:00",
    duration: 30,
    isCompleted: false,
    date: formatDate(tomorrow),
  },

  // PT-003: Mary Adebayo
  {
    id: 5,
    patientId: "PT-003",
    name: "Mary Adebayo",
    type: "Check-up",
    time: "12:00",
    duration: 30,
    isCompleted: true,
    date: formatDate(today),
  },
  {
    id: 6,
    patientId: "PT-003",
    name: "Mary Adebayo",
    type: "Follow-up",
    time: "11:00",
    duration: 30,
    isCompleted: false,
    date: formatDate(nextWeek),
  },

  // PT-004: Bello Kasim
  {
    id: 7,
    patientId: "PT-004",
    name: "Bello Kasim",
    type: "Consultation",
    time: "14:00",
    duration: 45,
    isCompleted: false,
    date: formatDate(today),
  },
  {
    id: 8,
    patientId: "PT-004",
    name: "Bello Kasim",
    type: "Follow-up",
    time: "15:30",
    duration: 30,
    isCompleted: false,
    date: formatDate(tomorrow),
  },

  // PT-005: Chidinma Eze
  {
    id: 9,
    patientId: "PT-005",
    name: "Chidinma Eze",
    type: "Follow-up",
    time: "15:30",
    duration: 30,
    isCompleted: false,
    date: formatDate(today),
  },
  {
    id: 10,
    patientId: "PT-005",
    name: "Chidinma Eze",
    type: "Check-up",
    time: "16:30",
    duration: 30,
    isCompleted: false,
    date: formatDate(tomorrow),
  },

  // PT-006: David Adeleke (Outpatient)
  {
    id: 11,
    patientId: "PT-006",
    name: "David Adeleke",
    type: "Check-up",
    time: "11:30",
    duration: 30,
    isCompleted: false,
    date: formatDate(today),
  },

  // PT-007: Fatima Abubakar (Outpatient)
  {
    id: 12,
    patientId: "PT-007",
    name: "Fatima Abubakar",
    type: "Consultation",
    time: "13:00",
    duration: 45,
    isCompleted: false,
    date: formatDate(tomorrow),
  },

  // PT-008: Oluwaseun Bakare (Outpatient)
  {
    id: 13,
    patientId: "PT-008",
    name: "Oluwaseun Bakare",
    type: "Follow-up",
    time: "14:30",
    duration: 30,
    isCompleted: false,
    date: formatDate(nextWeek),
  },
];
