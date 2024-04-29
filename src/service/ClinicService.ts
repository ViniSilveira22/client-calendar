import { IAppointments, IPatients } from '@/core/types'; 

class ClinicService {
  static BASE_URL = 'http://localhost:3002';

  static async getPatientById(id: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/patient/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }

  static async getPatients() {
    const response = await fetch(`${this.BASE_URL}/patients`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data.patients.map((patient: IPatients, index: number) => ({ ...patient, id: index + 1 }));
  }

  static async updatePatient(id: number, patient: any): Promise<any> {
    const formData = new FormData();
  
    for (const key of Object.keys(patient)) {
      const value = patient[key];
  
      if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  
    const response = await fetch(`${this.BASE_URL}/patient/${id}`, {
      method: 'PUT',
      body: formData,
    });
  
    const data = await response.json();
    return data;
  }
  

  static async deletePatient(id: number): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/patient/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }

  static async getAppointmentById(id: number): Promise<IAppointments> {
    const response = await fetch(`${this.BASE_URL}/appointment/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }

  static async getAppointments(): Promise<IAppointments[]> {
    const response = await fetch(`${this.BASE_URL}/appointments`, {
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
  }

  static async getAppointmentByDate(selectedDate: Date): Promise<IAppointments[]> {
    const response = await fetch(`${this.BASE_URL}/appointments/daily?appointment_date=${selectedDate.toISOString()}`, {
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
  }

  static async getAppointmentByMonth(year: number, month: number): Promise<IAppointments[]> {
    const response = await fetch(`${this.BASE_URL}/appointments/monthly?month=${month}&year=${year}`, { // Inclui o ano na solicitação
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
  }

  static async addAppointment(appointment: IAppointments): Promise<any> {
    const formData = new FormData();
    Object.entries(appointment).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${this.BASE_URL}/appointment`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  }

  // PRECISA ALTERAR
  static async updateAppointment(appointment: IAppointments): Promise<any> {
    const formData = new FormData();
    Object.entries(appointment).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${this.BASE_URL}/appointment`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  }

  static async deleteAppointment(id: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/appointment/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }

  static async login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${this.BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
}

export default ClinicService;
