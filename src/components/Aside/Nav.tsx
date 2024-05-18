import { controls, systems } from '@/mocks/navItems'
import { useState } from 'react';
import NavButtons from './NavButtons';

const Nav = ({ onSelectComponent }: any) => {
  const [_, setSelectedComponent] = useState(null);

  const handleSelectComponent = (component: any) => {
    setSelectedComponent(component); 
    onSelectComponent(component); 
  };

  return (
    <div className="flex h-screen bg-gray-50">

    <nav className="mt-5 flex w-full flex-col items-start justify-between overflow-y-scroll scrollbar xl:h-full">
      <div className="w-full flex-col justify-center lg:flex">
        <NavButtons item={controls} onSelectComponent={handleSelectComponent} />
      </div>

      <div className="mt-5 flex w-full flex-col justify-between">
        <div className="mt-5 flex w-full flex-col justify-between">
          <div className="w-full flex-col justify-center gap-y-5 lg:flex">
            <NavButtons item={systems} onSelectComponent={handleSelectComponent} />
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Nav;
