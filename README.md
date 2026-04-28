# Laboratoire 2 — Application de Gestion des Relations

Application web full-stack permettant de gérer un réseau de contacts : inscription, connexion, gestion du profil et envoi/réception de demandes de connexion.

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

 Frontend : React 19, Axios 
 Authentification : JWT (JSON Web Tokens) 
 Stockage session : localStorage 

## Lancer le projet

### Frontend

```bash
cd frontend
npm install
npm start
```


