import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import AppointmentForm from '@/components/AppointmentForm'; // Importe o componente corretamente
import { useStateContext } from '@/context/StateContext';
import Box from '@mui/material/Box';

export const CreateAppointmentsButton = () => {
  const { setModal } = useStateContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAppointment = (appointmentData: { date: string; time: string; selectedPatient: string }) => {
    console.log('Salvando consulta:', appointmentData);
  };

  return (
    <>
      <button onClick={handleOpen} className="rounded-lg bg-button py-2 px-4 hover:opacity-80">
        <p className="font-normal text-eventBtn">+ Adicionar consulta</p>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        className="custom-modal"
      >
        <Box className="modal-content">
          <AppointmentForm  />
        </Box>
      </Modal>
    </>
  );
};
