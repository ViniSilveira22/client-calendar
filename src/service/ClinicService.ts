import { useQuery, useMutation } from 'react-query';
import { IAppointments, IPatients, IAppointmentForm } from '@/core/types';

export const BASE_URL = 'http://localhost:3002';

export function useGetPatientById(id: string) {
  return useQuery(['patient', id], async () => {
    const response = await fetch(`${BASE_URL}/patient/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }, {
    retry: false 
  });
}

export function useGetPatients() {
  return useQuery('patients', async () => {
    const response = await fetch(`${BASE_URL}/patients`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar pacientes');
    }
    const data = await response.json();
    return data.patients.map((patient: IPatients) => ({ ...patient }));
  }, {
    retry: false 
  });
}



export function useAddPatient() {
  return useMutation((patient: IPatients) =>
    fetch(`${BASE_URL}/patient`, {
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
  );
}

export function useUpdatePatient() {
  return useMutation(({ patient }: { patient: IPatients }) =>
    fetch(`${BASE_URL}/patient/${patient.id}`, {
      method: 'PUT',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
  );
}

export function useDeletePatient() {
  return useMutation((id: string) =>
    fetch(`${BASE_URL}/patient/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
  );
}

export function useGetAppointmentById(id: number) {
  return useQuery(['appointment', id], async () => {
    const response = await fetch(`${BASE_URL}/appointment/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  });
}

export function useGetAppointments() {
  return useQuery('appointments', async () => {
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data.appointments.map((appointmentData: any, index: number) => ({
      ...appointmentData,
      id: index + 1
    }));
  }, {
    retry: false 
  });
}

export function useGetAppointmentByDate(selectedDate: Date) {
  return useQuery(['appointments', selectedDate.toISOString()], async () => {
    const response = await fetch(`${BASE_URL}/appointments/daily?appointment_date=${selectedDate.toISOString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data.appointments.map((appointmentData: any, index: number) => ({
      ...appointmentData,
      id: index + 1
    }));
  }, {
    retry: false 
  });
}

export function useGetAppointmentByMonth(year: number, month: number) {
  return useQuery(['appointments', year, month], async () => {
    const response = await fetch(`${BASE_URL}/appointments/monthly?month=${month}&year=${year}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data.appointments.map((appointmentData: any, index: number) => ({
      ...appointmentData,
      id: index + 1
    }));
  }, {
    retry: false 
  });
}

export function useAddAppointment() {
  return useMutation((appointment: IAppointments) =>
    fetch(`${BASE_URL}/appointment`, {
      method: 'POST',
      body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
  );
}

export function useUpdateAppointment() {
  return useMutation((appointment: IAppointmentForm) =>
    fetch(`${BASE_URL}/appointment/${appointment.patientId}`, {
      method: 'PUT',
      body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
  );
}

export function useDeleteAppointment() {
  return useMutation((id: string) =>
    fetch(`${BASE_URL}/appointment/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
  );
}

export function useLogin() {
  return useMutation(({ email, password }: { email: string, password: string }) =>
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then((res) => res.json())
  );
}
