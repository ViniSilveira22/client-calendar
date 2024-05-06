import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { IAppointments, IPatients } from '@/core/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete } from '@mui/lab';
import { usePatientsContext } from '@/context/PatientsContext';
import { useAppointmentsContext } from '@/context/AppointmentsContext';
import ClinicService from '@/service/ClinicService';

interface IAppointmentForm {
  appointment?: IAppointments;
  patient?: IPatients;
}

export const AppointmentForm = ({ appointment }: IAppointmentForm) => {
  const [selectedPatient, setSelectedPatient] = useState<IPatients | null>(null);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const { register, handleSubmit } = useForm<IAppointmentForm>();
  
  const [patientName, setPatientName] = useState<string>('');
  const [patients, setPatients] = useState<IPatients[] >([]);
  const [patientId, setPatientId] = useState<string>('');

  
  const { saveAppointment } = useAppointmentsContext();
  const { savePatient } = usePatientsContext();

  const handleCreateNewPatient = () => {
    setShowNewPatientForm(true);
  };

  const handleUsePatient = () => {
    setShowNewPatientForm(false);
  };

  const onSubmitPatient: SubmitHandler<IPatients> = async(data) => {
    const patientId = savePatient(data);
    console.log(patientId)
    setPatientId(patientId!);
  };

  const onSubmitAppointment: SubmitHandler<IAppointments> = async(data) => {
    const appointmentData = {
      ...data,
      patientId: selectedPatient!.id,
      name: selectedPatient!.name
    };
    saveAppointment(appointmentData);
  };

  const onSubmitForm = async (data: any) => {
    if(showNewPatientForm)
      await onSubmitPatient(data.patient);
    await onSubmitAppointment(data.appointment);
  };

  const loadPacientes = async () => {
    try {
      const fetchedPatients = await ClinicService.getPatients();
      if (fetchedPatients) {
        setPatients(fetchedPatients);
      }
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <Box marginBottom={2}>
        {!showNewPatientForm && (
          <Box 
            onClick={handleCreateNewPatient} 
            style={{ cursor: 'pointer', fontSize: 'small', color: 'blue', textDecoration: 'underline' }}
          >
            + Adicionar novo paciente
          </Box>        
        )}
        {showNewPatientForm && (
          <FormControl className="custom-form-control" fullWidth onSubmit={handleSubmit(onSubmitForm)} >
              <TextField
                className="custom-text-field"
                type="text"
                label="Nome"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.name")}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <TextField
                type="date"
                className="custom-text-field"
                label="Data de nascimento"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.birthDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                disabled
                type="number"
                className="custom-text-field"
                label="Idade"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.age")}
                InputLabelProps={{
                  shrink: true,
                }}
              /> 
              <TextField
                className="custom-text-field"
                type="text"
                label="Nome do pai"
                variant="outlined"
                fullWidth
                {...register("patient.father")}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Nome da mãe"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.mother")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Responsável"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.guardian")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Endereço"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.address")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Telefone"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.phone")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Nome da Escola"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.school")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Período"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.period")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className="custom-text-field"
                type="text"
                label="Nome da Professora"
                variant="outlined"
                fullWidth
                size="small"
                {...register("patient.teacher")}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
          </FormControl>
        )}
      </Box>
      <FormControl className="custom-form-control" fullWidth onSubmit={handleSubmit(onSubmitForm)} >
      {!showNewPatientForm && (
          <Select
            className="custom-text-field"
            labelId="patient-select-label"
            id="patient-select"
            value={selectedPatient ? selectedPatient.id : ''}
            onChange={(event) => {
              const selectedId = event.target.value as string;
              const patient = patients.find((p) => p.id === selectedId);
              setSelectedPatient(patient || null);
            }}
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.name}
              </MenuItem>
            ))}
          </Select>
      )}
      {showNewPatientForm && (
        <Box 
          onClick={handleUsePatient} 
          style={{ cursor: 'pointer', fontSize: 'small', color: 'blue', textDecoration: 'underline' }}
        >
          Cancelar
        </Box>        
      )}
        <TextField
          className="custom-text-field"
          type="date"
          label="Data da Consulta"
          variant="outlined"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("appointment.consultationDate")}
          required
        />
        <TextField
          className="custom-text-field"
          type="time"
          label="Hora de Início"
          variant="outlined"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("appointment.startTime")}
          required
        />
        <TextField
          className="custom-text-field"
          type="time"
          label="Hora de Término"
          variant="outlined"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("appointment.endTime")}
          required
        />
      </FormControl>
      <Box>
        <Button onClick={handleSubmit(onSubmitForm)} variant="contained" color="primary"> Marcar consulta </Button>
      </Box>
    </Box>
  );
};

export default AppointmentForm;
