import logo from './logo.svg';
import './App.css';
import AuthProvider from './context/authcontext';
import Rotas from './rotas/rotas';

function App() {
  return (
    <>
      <AuthProvider>
        <Rotas/>
      </AuthProvider>
    </>
  );
}

export default App;
