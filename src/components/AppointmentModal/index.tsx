import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete } from '@mui/lab';
import { useGetPatients } from '@/service/ClinicService';
import { useAppointmentsContext } from '@/context/AppointmentsContext';
import { IPatients, IAppointments } from '@/core/types';

interface IAppointmentModal {
  open: boolean;
  onClose: () => void;
  appointment?: IAppointments;
}

export const AppointmentModal = ({ appointment, open, onClose }: IAppointmentModal) => {
  const [selectedPatient, setSelectedPatient] = useState<IPatients | null>(null);
  const [showCancelButton, setShowCancelButton] = useState(false); 
  const { register, handleSubmit, setValue } = useForm<IAppointments>();
  const { saveAppointment, updateAppointment, removeAppointment } = useAppointmentsContext();

  const { data: patients, isLoading } = useGetPatients();

  useEffect(() => {
    if (appointment) {
      setValue('consultationDate', appointment.consultationDate);
      setValue('startTime', appointment.startTime);
      setValue('endTime', appointment.endTime);
      setSelectedPatient(appointment.patient);
      setShowCancelButton(true);
    } else {
      setShowCancelButton(false);
    }
  }, [appointment, setValue]);

  const onSubmitForm: SubmitHandler<IAppointments> = async (data) => {
    if (!selectedPatient) {
      alert("Por favor, selecione um paciente.");
      return;
    }

    const appointmentData = {
      ...data,
      patientId: selectedPatient.id
    };

    if (appointment) {
      updateAppointment(appointmentData);
    } else {
      saveAppointment(appointmentData);
    }
    setValue('consultationDate', "");
    setValue('startTime', "");
    setValue('endTime', "");
    setSelectedPatient(null);

    onClose();
  };

  const handleCancelAppointment = () => {
    if (window.confirm("Você tem certeza que deseja desmarcar a consulta?")) {
      removeAppointment(appointment!.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{appointment ? 'Editar Consulta' : 'Agendar Consulta'}</DialogTitle>
      <DialogContent style={{ paddingTop: '20px' }}>
        <FormControl className="flex flex-col space-y-4">
          <Autocomplete
            className="w-full"
            getOptionLabel={(patient) => patient.name}
            options={patients || []}
            loading={isLoading}
            value={selectedPatient}
            onChange={(_, newValue) => {
              setSelectedPatient(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paciente"
                required
                variant="outlined"
                size="small"
              />
            )}
          />
          <TextField
            className="w-full"
            type="date"
            label="Data da Consulta"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("consultationDate")}
            required
          />
          <TextField
            className="w-full"
            type="time"
            label="Hora de Início"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("startTime")}
            required
          />
          <TextField
            className="w-full"
            type="time"
            label="Hora de Término"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("endTime")}
            required
          />
        </FormControl>
      </DialogContent>
      <DialogActions className="justify-between">
        {showCancelButton && (
          <Button onClick={handleCancelAppointment} variant="contained" color="error">
            Desmarcar Consulta
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmitForm)} variant="contained" color="primary" className='save-button'>
          {appointment ? 'Atualizar Consulta' : 'Agendar Consulta'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
