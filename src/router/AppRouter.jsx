
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const status = useCheckAuth()

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      // * Tipo de proteccion de Rutas Usando Ternarios
      {
        (status === 'authenticated')
        ?<Route path='/*' element={<JournalRoutes />} />
        :<Route path='auth/*' element={<AuthRoutes />} />
      }

      <Route path='/*' element={<Navigate to='/auth/login' />} />

    </Routes>
  )
}
