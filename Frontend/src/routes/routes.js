import UltimasReservas from '../components/UltimasReservas.js/UltimasReservas';
import {
  AdvancedSearchScreen,
  DatosUsuario,
  ProfileScreen,
  HomeRound,
  HomeScreen,
  RecoveryPass,
  RegisterScreen,
  EditPass,
  ResetPassScreen,
  ActiveUserScreen,
  LoginScreen,
  PrivacidadScreen,
  TerminosScreen,
StepFormScreen,
  getBookingsScreen,
} from '../page';




const routes = [
  { name: 'home', path: '/', component: <HomeScreen /> },
  { name: 'recover', path: '/recover', component: <RecoveryPass /> },
  { name: 'register', path: '/register', component: <RegisterScreen /> },
  {
    name: 'search',
    path: '/search',
    component: <AdvancedSearchScreen />,
  },

  { name: 'user', path: '/user', component: <ProfileScreen /> },
  { name: 'editpass', path: '/user/:iduser/editpass', component: <EditPass /> },
  { name: 'resetpass', path: '/resetpass', component: <ResetPassScreen /> },
  { name: 'edit', path: '/user/:iduser/edit', component: <DatosUsuario /> },
  { name: 'return', path: '/return', component: <HomeRound /> },

  {
    name: 'activeuser',
    path: '/register/validate/:registration_code',
    component: <ActiveUserScreen />,
  },
  {
    name: 'getBookings',
    path: '/user/:idUser/getBookings',
    component: <UltimasReservas />,
  },
  { name: 'loginuser', path: '/login', component: <LoginScreen /> },
  { name: 'privacidad', path: '/privacidad', component: <PrivacidadScreen /> },
  {
    name: 'terminos',
    path: '/terminosycondiciones',
    component: <TerminosScreen />,
  },
];

export default routes;
