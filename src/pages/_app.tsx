// _app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ModalContent } from '@/components/Modal';
import { AppointmentProvider } from '@/context/AppointmentsContext';
import { PatientProvider } from '@/context/PatientsContext';
import { StateProvider } from '@/context/StateContext';
import 'react-calendar/dist/Calendar.css';
import '@/styles/global.css';
import '@/styles/typography.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider forcedTheme={'light'}>
      <QueryClientProvider client={queryClient}>
        <AppointmentProvider>
          <PatientProvider>
            <StateProvider>
              <Component {...pageProps} />
              <ModalContent />
              <ToastContainer className="text-sm" />
            </StateProvider>
          </PatientProvider>
        </AppointmentProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;
