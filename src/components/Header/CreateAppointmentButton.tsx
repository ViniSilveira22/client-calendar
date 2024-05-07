import React, { useState } from 'react';
import AppointmentModal from '@/components/AppointmentModal';
import Box from '@mui/material/Box';

export const CreateAppointmentsButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="rounded-lg bg-button py-2 px-4 hover:opacity-80">
        <p className="font-normal text-eventBtn">+ Adicionar consulta</p>
      </button>
      <Box >
        <AppointmentModal open={modalOpen} onClose={closeModal} />
      </Box>
    </>
  );
};
