import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppointmentsContext } from '@/context/AppointmentsContext';
import { useStateContext } from '@/context/StateContext';
import { IAppointments, IPatients } from '@/core/types';
import { TextField, Button,  Grid } from '@mui/material';

interface IAppointmentForm {
  appointment?: IAppointments;
  patient?: IPatients;
}

export const AppointmentForm = ({ appointment, patient }: IAppointmentForm) => {
  const { saveAppointment, removeAppointment, updateAppointment } = useAppointmentsContext();
  const { setModal } = useStateContext();

  const [currentStep, setCurrentStep] = useState(1);

  const { register: registerAppointments, handleSubmit: handleSubmitAppointments } = useForm<IAppointments>();
  const { register: registerPatients, handleSubmit: handleSubmitPatients } = useForm<IPatients>();

  const onSubmitPatient: SubmitHandler<IPatients> = async () => {
    setCurrentStep(2);
  };

  const onSubmitAppointment: SubmitHandler<IAppointments> = async (data) => {
    try {
      if (appointment) {
        updateAppointment(data);
      } else {
        saveAppointment(data);
      }
      setModal({ open: false });
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }
  };



  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1); // Go back to the previous step
  };

  return (
    <div className="flex flex-col w-full bg-primary p-4">
      {currentStep === 1 ? (
        <form onSubmit={handleSubmitPatients(onSubmitPatient)} className="flex flex-col">
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                {...registerPatients('name', { required: true })}
                type="text"
                defaultValue={patient?.name}
                label="Nome"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('birthDate', { required: true })}
                type="date"
                defaultValue={patient?.birthDate}
                label="Data de Nascimento"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('age', { required: true })}
                type="number"
                defaultValue={patient?.age}
                label="Idade"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...registerPatients('father', { required: true })}
                type="text"
                defaultValue={patient?.father}
                label="Pai"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...registerPatients('mother', { required: true })}
                type="text"
                defaultValue={patient?.mother}
                label="Mãe"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...registerPatients('guardian', { required: true })}
                type="text"
                defaultValue={patient?.guardian}
                label="Responsável"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('address', { required: true })}
                type="text"
                defaultValue={patient?.address}
                label="Endereço"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('phone', { required: true })}
                type="text"
                defaultValue={patient?.phone}
                label="Telefone"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('school', { required: true })}
                type="text"
                defaultValue={patient?.school}
                label="Nome da Escola"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('period', { required: true })}
                type="text"
                defaultValue={patient?.period}
                label="Período"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerPatients('teacher', { required: true })}
                type="text"
                defaultValue={patient?.teacher}
                label="Nome da Professora"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <div className="flex justify-between mt-3">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Continuar
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitAppointments(onSubmitAppointment)} className="flex flex-col">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerAppointments('consultationDate', { required: true })}
                type="date"
                defaultValue={appointment?.consultationDate}
                label="Data da Consulta"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
          </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...registerAppointments('startTime', { required: true })}
                type="time"
                defaultValue={appointment?.startTime}
                label="Hora de Início"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...registerAppointments('endTime', { required: true })}
              type="time"
              defaultValue={appointment?.endTime}
              label="Hora de Término"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
          <div className="flex justify-between mt-3">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePreviousStep}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {appointment ? 'Atualizar' : 'Salvar Consulta'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
