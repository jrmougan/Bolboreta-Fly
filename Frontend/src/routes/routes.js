import {
  AdvancedSearchScreen,
  DatosUsuario,
  ProfileScreen,
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
  GetBookingsScreen,
} from '../page';
import ItineraryScreen from '../page/ItineraryScreen';

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
  { name: 'step', path: '/step', component: <StepFormScreen /> },
  {
    name: 'itinerary',
    path: '/:idBooking/itinerary',
    component: <ItineraryScreen />,
  },
  {
    name: 'activeuser',
    path: '/register/validate/:registration_code',
    component: <ActiveUserScreen />,
  },
  {
    name: 'getBookings',
    path: '/user/:idUser/getBookings',
    component: <GetBookingsScreen />,
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
