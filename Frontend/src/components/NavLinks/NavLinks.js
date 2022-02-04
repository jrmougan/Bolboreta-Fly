import { Link, NavLink, Outlet } from 'react-router-dom';

const NavLinks = () => {
  return (
    <div className='searchTabs'>
      <NavLink to='/' className='tab tab-1'>
        Ida
      </NavLink>
      <NavLink to='/return' className='tab tab-2'>
        Ida y vuelta
      </NavLink>
      <NavLink to='/multiple' className='tab tab-3'>
        {' '}
        Múltiples destinos
      </NavLink>
      <Outlet />
    </div>
  );
};
export default NavLinks;
