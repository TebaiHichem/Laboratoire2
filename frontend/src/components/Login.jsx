import { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await onLogin(email, password, isRegister);
        } catch (err) {
            setError(err.error || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-panel">
                <h1>{isRegister ? '📝 Inscription' : '🔑 Connexion'}</h1>
                <p>Gestion des Relations</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn btn-login" disabled={loading}>
                        {loading ? '⏳ Chargement...' : isRegister ? "S'inscrire" : 'Se connecter'}
                    </button>
                </form>
                <p className="toggle-text">
                    {isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
                    <button className="btn-toggle" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Se connecter' : "S'inscrire"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
