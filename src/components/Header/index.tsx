import { Hamburguer } from '@/components/Hamburguer'
import HeaderDate from './Date'

export const Header = () => {
  return (
    <header className="border-b border-slate-300 p-6">
      <nav className="flex w-full items-center justify-center gap-6 xl:justify-between">
          <Hamburguer />
        <div>
          <HeaderDate />
        </div> 
      </nav>
    </header>
  )
}
