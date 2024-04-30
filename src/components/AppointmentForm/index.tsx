import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { IAppointments, IPatients } from '@/core/types';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useAppointmentsContext } from '@/context/AppointmentsContext';
import { usePatientsContext } from '@/context/PatientsContext';

interface IAppointmentForm {
  appointment?: IAppointments;
  patient?: IPatients;
}

export const AppointmentForm = ({ appointment }: IAppointmentForm) => {
  const { saveAppointment } = useAppointmentsContext();
  const { savePatient } = usePatientsContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [modalTitle, setModalTitle] = useState('Informações');
  const { register, handleSubmit } = useForm<IAppointmentForm>()
   const onSubmit: SubmitHandler<IAppointmentForm> = async(data) => {
      if(appointment){ 
      } else {
        console.log('teste');
        savePatient(data.patient!);
        console.log('teste2');

        //saveAppointment(data.appointment!);
      }

  };
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 1) {
      setModalTitle('Instituição');
    } else if (currentStep === 2) {
      setModalTitle('Consulta');
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    if (currentStep === 2) {
      setModalTitle('Informações');
    } else if (currentStep === 3) {
      setModalTitle('Instituição');
    }
  };

  return (
    <Box className="bg-primary p-6">
      <Typography>{modalTitle}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.name")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  label="Data de nascimento"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("patient.birthDate")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Idade"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.age")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Nome do pai"
                  variant="outlined"
                  fullWidth
                  {...register("patient.father")}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Nome da mãe"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.mother")}
                />
              </Grid>
            </Grid>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Responsável"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.guardian")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.address")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.phone")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Nome da Escola"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.school")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Período"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.period")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Nome da Professora"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("patient.teacher")}
                />
              </Grid>
            </Grid>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Data da Consulta"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("appointment.consultationDate")}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="time"
                  label="Hora de Início"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("appointment.startTime")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="time"
                  label="Hora de Término"
                  variant="outlined"
                  fullWidth
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("appointment.endTime")}
                />
              </Grid>
            </Grid>
          </div>
        )}
        <div className="flex justify-between mt-3">
          {currentStep !== 1 && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handlePreviousStep}
            >
              Voltar
            </Button>
          )}
          {currentStep !== 3 && (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleNextStep}
            >
              Continuar
            </Button>
          )}
          {currentStep === 3 && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {appointment ? 'Atualizar' : 'Salvar Consulta'}
            </Button>
          )}
        </div>
      </form>
    </Box>
  );
};
