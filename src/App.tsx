import React from 'react';
import LoginPage from './pages/LoginPage';
import './styles/style.css';
import { UserProvider } from './utils/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="App">
        <LoginPage />
      </div>
    </UserProvider>
  );
};

export default App;
