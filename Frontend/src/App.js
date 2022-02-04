import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Routing from './routes/Routing';
import { HomeScreen } from './page';
/*
import HomeRound from './page/HomeRound';
import HomeMultiple from './page/HomeMultiple';
*/

function App() {
  return <Routing />;
}

export default App;
