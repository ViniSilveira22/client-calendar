import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation, QueryClient } from 'react-query';
import { IChildren, IAppointments, IAppointmentContext, IAppointmentForm } from '@/core/types';
import { useAddAppointment, useUpdateAppointment, useGetAppointments, useDeleteAppointment } from '@/service/ClinicService';

const defaultAppointment: IAppointmentContext = {
  appointments: [],
  saveAppointment: () => null,
  removeAppointment: () => null,
  updateAppointment: () => null,
  getAppointments: () => null,
};

const AppointmentsContext = createContext<IAppointmentContext>(defaultAppointment);
const useAppointmentsContext = () => useContext(AppointmentsContext);

const AppointmentProvider = ({ children }: IChildren) => {
  const queryClient: QueryClient = useQueryClient();
  const useAddAppointmentMutation = useAddAppointment();
  const useUpdateAppointmentMutation = useUpdateAppointment();
  const useGetAppointmentsQuery = useGetAppointments();
  const useDeleteAppointmentQuery = useDeleteAppointment();

  const saveAppointmentMutation = useMutation(
    async (appointment: IAppointments) => {
      return await saveAppointmentAsync(appointment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appointments');
        toast.success('Consulta adicionada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao adicionar consulta');
      },
    }
  );

  const removeAppointmentMutation = useMutation(
    async (id: string) => {
      return await removeAppointmentAsync(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appointments');
        toast.success('Consulta desmarcada!');
      },
      onError: () => {
        toast.error('Erro ao desmarcar consulta');
      },
    }
  );

  const updateAppointmentMutation = useMutation(
    async (updatedAppointment: IAppointmentForm) => {
      return await updateAppointmentAsync(updatedAppointment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('appointments');
        toast.success('Consulta atualizada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao atualizar consulta');
      },
    }
  );

  const saveAppointmentAsync = async (appointment: IAppointments) => {
    try {
      const response = await useAddAppointmentMutation.mutateAsync(appointment);
      return response;
    } catch (error) {
      throw new Error('Erro ao salvar consulta');
    }
  };

  const removeAppointmentAsync = async (id: string) => {
    try {
      await useDeleteAppointmentQuery.mutateAsync(id);
    } catch (error) {
      throw new Error('Erro ao remover consulta');
    }
  };

  const updateAppointmentAsync = async (updatedAppointment: IAppointmentForm) => {
    try {
      const response = await useUpdateAppointmentMutation.mutateAsync(updatedAppointment);
      return response;
    } catch (error) {
      throw new Error('Erro ao atualizar consulta');
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments: useGetAppointmentsQuery.data || [],
        saveAppointment: saveAppointmentMutation.mutate,
        removeAppointment: removeAppointmentMutation.mutate,
        updateAppointment: updateAppointmentMutation.mutate,
        getAppointments: useGetAppointmentsQuery.data,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export { AppointmentProvider, useAppointmentsContext };
