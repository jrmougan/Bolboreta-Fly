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
  StepFormScreen,
} from '../page';

const routes = [
  { name: 'home', path: '/', component: <HomeScreen /> },
  { name: 'recover', path: '/recover', component: <RecoveryPass /> },
  { name: 'register', path: '/register', component: <RegisterScreen /> },
  { name: 'stepper', path: '/step/', component: <StepFormScreen /> },
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
  { name: 'loginuser', path: '/login', component: <LoginScreen /> },
];

export default routes;
