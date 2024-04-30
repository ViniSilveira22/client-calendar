import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { AppointmentForm } from '@/components/AppointmentForm';
import { useStateContext } from '@/context/StateContext';

export const CreateAppointmentsButton = () => {
  const { setModal } = useStateContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="rounded-lg bg-button py-2 px-4 hover:opacity-80"
      >
        <p className="font-normal text-eventBtn">
          + Adicionar consulta
        </p>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="custom-modal"
      >
        <div className="modal-content">
          <AppointmentForm />
        </div>
      </Modal>
    </>
  );
};
