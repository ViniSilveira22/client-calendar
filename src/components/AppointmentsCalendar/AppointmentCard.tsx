import React, { useState } from 'react';
import moment from 'moment';
import { AppointmentModal } from '@/components/AppointmentModal';
import { IAppointments } from '@/core/types';
import { Clock } from '@/Images';

export const AppointmentCard = (appointment: IAppointments) => {
  const formatDate = moment(appointment.consultationDate).format('DD MMM, YYYY');
  const formatStart = moment(appointment.startTime, 'HH:mm A').format('HH:mm A');
  const formatEnd = moment(appointment.endTime, 'HH:mm A').format('HH:mm A');
  const patientName = appointment.patient.name;

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <article
        className="mt-3 flex w-full cursor-pointer flex-col rounded-lg border border-slate-300 p-2 transition-all hover:animate-pulse"
        onClick={openModal}
      >
        <p className="text-sm">{patientName}</p> 
        <p className="text-xs">{formatDate}</p>
        <span className="mt-3 flex flex-row items-center gap-x-2">
          <Clock />
          <p className="text-xs text-tertiary">
            {formatStart} - {formatEnd}
          </p>
        </span>
      </article>
      {modalOpen && (
        <AppointmentModal
          appointment={appointment}
          open={modalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};
