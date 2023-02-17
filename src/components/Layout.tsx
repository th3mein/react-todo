import { Outlet, useLocation } from 'react-router-dom'
const Layout = () => {
  const location = useLocation()

  return (
    <div className='w-full'>
      {location.pathname !== '/missing' && <>Layout</>}

      <Outlet />
    </div>
  )
}

export default Layout
