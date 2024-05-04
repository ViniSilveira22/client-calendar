import { Asset } from '@/Images'

export const controls = [
  { name: 'Consultas', href: '/', icon: Asset.Calendar },
  { name: 'Pacientes', href: '/', icon: Asset.Person },
  { name: 'Financeiro', href: '/', icon: Asset.Diagram }
]

export const systems = [
  { name: 'Configurações', href: '/configs', icon: Asset.Settings },
  { name: 'Sair', href: '/logout', icon: Asset.Logout }
]
