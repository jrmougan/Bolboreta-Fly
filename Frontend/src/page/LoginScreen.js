import LoginUser from "../components/LoginUser/LoginUser";
import LoginGoogle from '../components/LoginGoogle/LoginGoogle'

const LoginScreen = () => {
  return (
    <div>
      <h3> Si eres usuario registrado de Bolboreta Flight.
      </h3>
      <h1> Inicia Sesión</h1>
      <LoginUser />
      <LoginGoogle />
    </div>);

};

export default LoginScreen;
