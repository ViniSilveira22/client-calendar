import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useAddPatient, useDeletePatient, useUpdatePatient, useGetPatients } from '@/service/ClinicService';
import { IChildren, IPatients, IPatientContext } from '@/core/types';

const defaultPatient: IPatientContext = {
  patients: [],
  savePatient: () => null,
  removePatient: () => null,
  updatePatient: () => null,
  getPatients: () => null,
};

const PatientsContext = createContext(defaultPatient);
const usePatientsContext = () => useContext(PatientsContext);

const PatientProvider = ({ children }: IChildren) => {
  const queryClient = useQueryClient();

  const savePatientMutation = useAddPatient();
  const deletePatientMutation = useDeletePatient();
  const updatePatientMutation = useUpdatePatient();
  const useGetPatientsQuery = useGetPatients();

  const savePatient = async (patient: IPatients) => {
    try {
      await savePatientMutation.mutateAsync(patient);
      toast.success('Paciente criado com sucesso!');
      queryClient.invalidateQueries('patients');
    } catch (error) {
      toast.error('Erro ao criar paciente. Por favor, tente novamente.');
    }
  };

  const removePatient = async (id: string) => {
    try {
      await deletePatientMutation.mutateAsync(id);
      toast.success('Paciente excluído com sucesso!');
      queryClient.invalidateQueries('patients');
    } catch (error) {
      toast.error('Erro ao excluir paciente. Por favor, tente novamente.');
    }
  };

  const updatePatient = async (updatedPatient: IPatients) => {
    try {
      //await updatePatientMutation.mutateAsync(updatedPatient);
      toast.success('Paciente atualizado com sucesso!');
      queryClient.invalidateQueries('patients');
    } catch (error) {
      toast.error('Erro ao atualizar paciente. Por favor, tente novamente.');
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        patients: useGetPatientsQuery.data || [],
        savePatient,
        removePatient,
        updatePatient,
        getPatients: useGetPatientsQuery.data,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientProvider, usePatientsContext };
