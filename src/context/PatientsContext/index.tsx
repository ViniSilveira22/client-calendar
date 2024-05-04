import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import ClinicService from '@/service/ClinicService';
import { IChildren, IPatientContext, IPatients } from '@/core/types'

const defaultPatient: IPatientContext = {
  patients: [],
  setPatients: () => [],
  savePatient: () => null,
  removePatient: () => null,
  updatePatient: () => null
}

const PatientsContext = createContext(defaultPatient)
const usePatientsContext = () => useContext(PatientsContext)
const PatientProvider = ({ children }: IChildren) => {
  const [patients, setPatients] = useState<IPatients[]>([])

  const savePatient = async (patient: IPatients) => {
    try {
      await ClinicService.addPatient(patient);
      toast.success(`Consulta criada!`);
    } catch (error) {
      toast.error('Erro ao criar consulta. Por favor, tente novamente.');
    }
  };
  
  const removePatient = async(id: string) => {
    try {
      await ClinicService.deletePatient(id);
      toast.success(`Consulta excluida!`);
    } catch (error) {
      toast.error('Erro ao excluir consulta. Por favor, tente novamente.');
    }
  }

  const updatePatient = async(patient: IPatients) => {
    try {
      await ClinicService.updatePatient(1, patient);
      toast.success(`Consulta atualizada!`);
    } catch (error) {
      toast.error('Erro ao criar consulta. Por favor, tente novamente.');
    }
  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
        setPatients,
        savePatient,
        removePatient,
        updatePatient
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}

export { PatientProvider, usePatientsContext }
