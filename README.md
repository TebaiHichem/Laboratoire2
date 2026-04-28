# Laboratoire 2 — Application de Gestion des Relations

Application web full-stack permettant de gérer un réseau de contacts : inscription, connexion, gestion du profil et envoi/réception de demandes de connexion.

## Architecture

```
Laboratoire2/
├── frontend/          # Application React (port 3001)
└── backend/           # Services backend (archive)
```

Le backend expose deux services :
- **Auth Service** — `http://localhost:5003` : inscription, connexion, vérification JWT
- **API Service** — `http://localhost:5001` : gestion des profils et des connexions

## Fonctionnalités

- Inscription et connexion par email/mot de passe (JWT)
- Création et modification du profil (nom, photo)
- Recherche d'autres utilisateurs
- Envoi, acceptation et rejet de demandes de connexion
- Visualisation du réseau de contacts

## Technologies

| Couche | Technologie |
|--------|-------------|
| Frontend | React 19, Axios |
| Authentification | JWT (JSON Web Tokens) |
| Stockage session | localStorage |

## Lancer le projet

### Prérequis

- Node.js >= 18
- Backend démarré (services sur les ports 5001 et 5003)

### Frontend

```bash
cd frontend
npm install
npm start
```

L'application s'ouvre sur [http://localhost:3001](http://localhost:3001).

## Structure du frontend

```
frontend/src/
├── App.js                  # Composant racine, gestion de la session
├── components/
│   ├── Login.jsx           # Formulaire connexion / inscription
│   ├── Profil.jsx          # Affichage et édition du profil
│   ├── Reseau.jsx          # Réseau, recherche et connexions
│   ├── Login.css
│   └── Accueil.css
└── services/
    ├── auth.js             # login, register, logout, token
    └── api.js              # profils et connexions (appels HTTP)
```

## Variables d'environnement

Les URLs des services sont définies directement dans `frontend/src/services/` :

| Variable | Valeur par défaut |
|----------|-------------------|
| Auth URL | `http://localhost:5003/auth` |
| API URL  | `http://localhost:5001` |

Pour modifier les URLs, éditer les fichiers `auth.js` et `api.js` dans `frontend/src/services/`.
