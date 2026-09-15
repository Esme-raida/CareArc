import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import ThresholdProvider from './context/ThresholdContext.jsx';
import PatientsProvider from './context/PatientsContext.jsx';
import VitalsProvider from './context/VitalsContext.jsx';
import NotesProvider from './context/NotesContext.jsx';
import AppointmentsProvider from './context/AppointmentsContext.jsx';
import AuthProvider from './context/AuthContext.jsx';
import FilesProvider from './context/FilesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppointmentsProvider>
      <ThresholdProvider>
        <PatientsProvider>
          <VitalsProvider>
            <NotesProvider>
              <FilesProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </FilesProvider>
            </NotesProvider>
          </VitalsProvider>
        </PatientsProvider>
      </ThresholdProvider>
    </AppointmentsProvider>
  </StrictMode>,
)
