import { AppointmentsCalendar } from '@/components/AppointmentsCalendar'
import { Header } from '@/components/Header'
import Meta from '@/layout'
import Main from '@/template'
import Aside from '@/components/Aside';
import { useState } from 'react';
import  PatientsTable from '@/components/PatientsTable';
import { FinancialDashboard } from '@/components/FinancialDashboard';

const Index = () => {
  const [activeComponent, setActiveComponent] = useState('Consultas');

  const selectComponent = (component: any) => {
    setActiveComponent(component.name);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Consultas':
        return <AppointmentsCalendar />;
      case 'Pacientes':
        return <PatientsTable />;
      case 'Financeiro':
        return <FinancialDashboard />;
    }
  };

  return (
    <Main
      meta={
        <Meta
          title="clinic"
          description="front-end clinic"
        />
      }
    >
      <main className="flex w-full flex-col bg-primary scrollbar">
        <Header />
        <div className="flex w-full flex-1 flex-row bg-primary">
          <Aside onSelectComponent={selectComponent} />
          {renderActiveComponent()}
        </div>
      </main>
    </Main>
  )
}

export default Index
