import FormPassenger from '../components/FormaPassenger/FormPassenger';
import {
  AdvancedSearchScreen,
  DatosUsuario,
  ProfileScreen,
  HomeRound,
  HomeScreen,
  RecoveryPass,
  RegisterScreen,
  HomeMultiple,
  EditPass,
  ResetPassScreen,
} from '../page';

const routes = [
  { name: 'home', path: '/', component: <HomeScreen /> },
  { name: 'recover', path: '/recover', component: <RecoveryPass /> },
  { name: 'register', path: '/register', component: <RegisterScreen /> },
  {
    name: 'search',
    path: '/search/:origin/:destination/:departureDate/:adults',
    component: <AdvancedSearchScreen />,
  },
  {
    name: 'searchAdvance',
    path: '/return/search/:origin/:destination/:departureDate/:returnDate/:adults',
    component: <AdvancedSearchScreen />,
  },
  { name: 'user', path: '/user', component: <ProfileScreen /> },
  { name: 'passenger', path: '/passenger', component: <FormPassenger /> },
  { name: 'editpass', path: '/user/:iduser/editpass', component: <EditPass /> },
  { name: 'resetpass', path: '/resetpass', component: <ResetPassScreen /> },
  { name: 'edit', path: '/user/:iduser/edit', component: <DatosUsuario /> },
  { name: 'return', path: '/return', component: <HomeRound /> },
  { name: 'multiple', path: '/multiple', component: <HomeMultiple /> },
];

export default routes;
