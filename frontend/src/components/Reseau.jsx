import { useState, useEffect } from 'react';
import { getUser } from '../services/auth';
import { searchProfiles, getConnections, sendConnectionRequest, respondToConnection } from '../services/api';

const Reseau = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [connections, setConnections] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [message, setMessage] = useState('');
    const currentUser = getUser();

    useEffect(() => {
        fetchConnections();
        fetchPending();
    }, []);

    const fetchConnections = async () => {
        const data = await getConnections('accepted');
        setConnections(data.results);
    };

    const fetchPending = async () => {
        const data = await getConnections('pending');
        setPendingRequests(data.results);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        const data = await searchProfiles(searchQuery);
        setSearchResults(data.results.filter(p => p.userId !== currentUser._id));
    };

    const handleSendRequest = async (receiverId) => {
        try {
            await sendConnectionRequest(receiverId);
            setMessage('Demande envoyée');
            fetchPending();
        } catch (err) {
            setMessage(err.error || 'Erreur');
        }
    };

    const handleRespond = async (connectionId, status) => {
        try {
            await respondToConnection(connectionId, status);
            setMessage(status === 'accepted' ? 'Connexion acceptée' : 'Connexion rejetée');
            fetchConnections();
            fetchPending();
        } catch (err) {
            setMessage(err.error || 'Erreur');
        }
    };

    return (
        <div className="reseau-container">
            {/* Recherche */}
            <section className="panel">
                <h2>Rechercher des personnes</h2>
                <div className="panel-content">
                    <div className="search-row">
                        <input
                            type="text"
                            placeholder="Chercher par nom..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button className="btn btn-search" onClick={handleSearch}>🔍 Chercher</button>
                    </div>
                    {message && <p className="success-message">{message}</p>}
                    {searchResults.length > 0 ? (
                        <ul className="profile-list">
                            {searchResults.map((profile, index) => (
                                <li key={index} className="profile-item">
                                    <div className="profile-item-info">
                                        {profile.imageUrl && <img src={profile.imageUrl} alt="" className="profile-thumb" />}
                                        <span>{profile.fullName}</span>
                                    </div>
                                    <button
                                        className="btn btn-small"
                                        onClick={() => handleSendRequest(profile.userId)}
                                    >
                                        ➕ Ajouter
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">Cherchez des personnes pour les ajouter à votre réseau</p>
                    )}
                </div>
            </section>

            {/* Demandes en attente */}
            {pendingRequests.length > 0 && (
                <section className="panel">
                    <h2>Demandes en attente</h2>
                    <div className="panel-content">
                        {pendingRequests
                            .filter(c => c.receiverId === currentUser._id)
                            .map((conn, index) => (
                                <div key={index} className="pending-card">
                                    <span>Demande de {conn.otherUser?.fullName || conn.requesterId}</span>
                                    <div className="button-row">
                                        <button className="btn btn-small btn-accept" onClick={() => handleRespond(conn.id, 'accepted')}>
                                            ✅ Accepter
                                        </button>
                                        <button className="btn btn-small btn-reject" onClick={() => handleRespond(conn.id, 'rejected')}>
                                            ❌ Rejeter
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            )}

            {/* Mon réseau */}
            <section className="panel">
                <h2>Mon Réseau ({connections.length})</h2>
                <div className="panel-content">
                    {connections.length > 0 ? (
                        <ul className="profile-list">
                            {connections.map((conn, index) => {
                                return (
                                    <li key={index} className="profile-item">
                                        <div className="profile-item-info">
                                            {conn.otherUser?.imageUrl && <img src={conn.otherUser.imageUrl} alt="" className="profile-thumb" />}
                                            <span>{conn.otherUser?.fullName || 'Utilisateur inconnu'}</span>
                                        </div>
                                        <span className="status-badge accepted">Connecté</span>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="no-results">Aucune connexion pour l'instant</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Reseau;
