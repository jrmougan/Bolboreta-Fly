import FormPassenger from "../components/FormaPassenger/FormPassenger";
import { ProfileScreen } from "../page";
import { HomeScreen, LoginScreen, RecoveryPass, EditPass, ResetPassScreen } from "../page";


const routes = [
  { name: "home", path: "/", component: <HomeScreen /> },
  { name: 'recoverypass', path: '/recover', component: <RecoveryPass /> },
  { name: "register", path: "/register", component: "RegisterScreen" },
  { name: "search", path: "/search", component: "SearchScreen" },
  { name: "user", path: "/user", component: <ProfileScreen /> },
  { name: "passenger", path: "/passenger", component: <FormPassenger /> },
  { name: 'editpass', path: '/user/:iduser/editpass', component: <EditPass /> },
  { name: 'resetpass', path: '/resetpass', component: <ResetPassScreen /> }

];

export default routes;
