import { useState, useEffect } from 'react';
import { getMyProfile, createProfile, updateProfile } from '../services/api';

const Profil = () => {
    const [profile, setProfile] = useState(null);
    const [fullName, setFullName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getMyProfile();
            if (data.profile) {
                setProfile(data.profile);
                setFullName(data.profile.fullName);
                setImageUrl(data.profile.imageUrl || '');
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            if (profile) {
                // mettre a jour le profile
                const data = await updateProfile(fullName, imageUrl);
                setProfile(data.profile);
                setMessage('Profil mis à jour');
            } else {
                // creer le profile
                const data = await createProfile(fullName, imageUrl);
                setProfile(data.profile);
                setMessage('Profil créé');
            }
            setEditing(false);
        } catch (err) {
            setMessage(err.error || 'Erreur');
        }
    };

    if (!profile && !editing) {
        return (
            <section className="panel">
                <h2>Mon Profil</h2>
                <div className="panel-content">
                    <p className="no-results">Aucun profil créé</p>
                    <button className="btn btn-search" onClick={() => setEditing(true)}>
                        Créer mon profil
                    </button>
                </div>
            </section>
        );
    }

    if (editing) {
        return (
            <section className="panel">
                <h2>{profile ? 'Modifier mon profil' : 'Créer mon profil'}</h2>
                <div className="panel-content">
                    <div className="input-group">
                        <label>Nom complet</label>
                        <input
                            type="text"
                            placeholder="Jean Dupont"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>URL de l'image</label>
                        <input
                            type="text"
                            placeholder="https://example.com/photo.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    {message && <p className="error-message">{message}</p>}
                    <div className="button-row">
                        <button className="btn btn-save" onClick={handleSave}>💾 Sauvegarder</button>
                        {profile && <button className="btn btn-generate" onClick={() => setEditing(false)}>Annuler</button>}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="panel">
            <h2>Mon Profil</h2>
            <div className="panel-content">
                <div className="profile-card">
                    {profile.imageUrl && (
                        <img src={profile.imageUrl} alt={profile.fullName} className="profile-image" />
                    )}
                    <div className="profile-info">
                        <h3>{profile.fullName}</h3>
                        <p>{profile.email}</p>
                    </div>
                </div>
                {message && <p style={{ color: '#10b981', textAlign: 'center', marginTop: '0.5rem' }}>{message}</p>}
                <button className="btn btn-search" onClick={() => setEditing(true)} style={{ marginTop: '1rem' }}>
                    ✏️ Modifier
                </button>
            </div>
        </section>
    );
};

export default Profil;
