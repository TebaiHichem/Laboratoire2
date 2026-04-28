import { useState } from 'react';
import { login, register, logout, isAuthenticated } from './services/auth';
import Login from './components/Login';
import Profil from './components/Profil';
import Reseau from './components/Reseau';
import './components/Accueil.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [tab, setTab] = useState('profil');

    const handleLogin = async (email, password, isRegister) => {
        if (isRegister) {
            await register(email, password);
        } else {
            await login(email, password);
        }
        setLoggedIn(true);
    };

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
    };

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="accueil-container">
            <header className="accueil-header">
                <div className="header-top">
                    <button className="btn-logout" onClick={handleLogout}>🚪 Déconnexion</button>
                </div>
                <h1>👥 Relations</h1>
                <p>Gérez votre réseau de contacts</p>
            </header>

            <div className="main-content">
                <div className="tab-toggle">
                    <button
                        className={`toggle-btn ${tab === 'profil' ? 'active' : ''}`}
                        onClick={() => setTab('profil')}
                    >
                        👤 Profil
                    </button>
                    <button
                        className={`toggle-btn ${tab === 'reseau' ? 'active' : ''}`}
                        onClick={() => setTab('reseau')}
                    >
                        🌐 Réseau
                    </button>
                </div>

                {tab === 'profil' ? <Profil /> : <Reseau />}
            </div>
        </div>
    );
}

export default App;
