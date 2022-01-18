import { LoginScreen, RegisterScreen } from '../page';

const routes = [
  { name: 'home', path: '/', component: 'HomeScreen' },
  { name: 'login', path: '/login', component: <LoginScreen /> },
  { name: 'register', path: '/register', component: <RegisterScreen /> },
  { name: 'search', path: '/search', component: 'SearchScreen' },
  { name: 'user', path: '/user/:iduser', component: 'ProfileScreen' },
];

export default routes;
