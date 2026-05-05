# Fair Navigator — POC L’Étudiant

Prototype **mobile-first** pour préparer et vivre un parcours salon : compte local, onboarding, exploration de contenus, **mini quiz** d’orientation, **scan QR** des stands, **favoris** formations, et **tableau de bord** personnalisé. Les données sont stockées **côté navigateur** (localStorage / sessionStorage) — pas de backend réel pour l’authentification.

## Prérequis

- Node.js récent (compatible avec Vite 7)
- `npm install`

## Commandes

| Commande        | Rôle                          |
|----------------|-------------------------------|
| `npm run dev`  | Serveur de développement      |
| `npm run build`| Build client + SSR (Cloudflare) |
| `npm run preview` | Prévisualisation du build  |
| `npm run lint` | ESLint                        |

## Parcours utilisateur

### 1. Accueil connexion (`/welcome`)

- **Se connecter** → `/login`
- **Créer un compte** → `/register` puis onboarding
- **Mode invité (démo)** : réinitialise le profil invité et ouvre **`/journey`**

### 2. Compte et session (`src/lib/session.ts`)

- **Comptes enregistrés** : identifiant + mot de passe stockés en local (POC), profil associé par utilisateur.
- **Invité** : un seul profil « guest » partagé sur l’appareil.
- **Déconnexion** : retour à l’état « non connecté » ; migration possible depuis l’ancienne clé profil unique (`letudiant_profile`).

### 3. Inscription (`/register`) et onboarding (`/onboarding`)

- Formulaire d’inscription puis **parcours guidé en plusieurs étapes** (niveau, spécialités, durée d’études, centres d’intérêt, préférences d’apprentissage, localisation, etc.).
- Profil en attente possible via **sessionStorage** entre les étapes jusqu’à finalisation.

### 4. Connexion (`/login`)

- Connexion avec les identifiants créés localement ; session **registered** avec nom d’utilisateur.

### 5. Page d’accueil exploration (`/`)

- Fil d’**articles** par catégories (données `explore-data`).
- Accès aux catégories **`/explore/$categoryId`**, articles et **formations** liées au catalogue.

### 6. Parcours salon — « Journey » (`/journey`)

Cinq **étapes de badge** (voir `src/lib/journey-state.ts`) :

| Étape      | Condition réussie                          |
|-----------|-----------------------------------------------|
| Compte    | Session **registered** (pas invité seul)     |
| Quiz      | `quizCompletedAt` renseigné                   |
| Favoris   | Au moins **3** formations en favoris           |
| Scan      | Au moins **1** établissement scanné (QR)     |
| Contact   | Action « contacter une école » cochée côté parcours / dashboard |

### 7. Mini quiz (`/quiz`)

- **4 questions** binaires (indices 0 ou 1).
- À la fin : enregistrement de `quizAnswers` + `quizCompletedAt` dans le profil (`patchJourney`) puis redirection vers **`/dashboard`**.

### 8. Scan QR établissement (`/scan`)

- Utilise **html5-qrcode** (caméra).
- Payload attendu : texte **`LETUDIANT:INST:<institutionId>`** (voir `src/lib/qr-payload.ts`).
- Variantes acceptées : URL avec `?inst=` ou `?institution=`, ou identifiant brut alphanumérique.
- Succès : ajout de l’ID dans `scannedInstitutionIds` et navigation vers la fiche **`/institution/$institutionId`** si l’ID existe dans le catalogue.

### 9. Catalogue et contenus

- **`src/lib/fair-catalog.ts`** : établissements, formations, vecteurs de match (`matchVec` : pédagogie, durée, lieu, domaine), frais, etc.
- **`/formation/$formationId`** : fiche formation + bouton favori (**« En ligne de mire »**).
- **`/institution/$institutionId`** : fiche établissement.

### 10. Tableau de bord (`/dashboard`)

- **Recommandations** après quiz : classement des formations via `rankedFormationsForQuiz` (`src/lib/match-scoring.ts`).
- Graphiques (**Recharts**) : barres (frais), **radar** profil reco vs moyenne des favoris (affiché lorsque quiz + favoris disponibles).
- Suivi des **étapes journey**, **visites scannées**, **contact école**.
- Lien sauvegarde / profil : **`/save`**.

### 11. Sauvegarde / profil (`/save`)

- Synthèse et actions liées au profil (selon l’implémentation actuelle).

---

## Logique métier utile à connaître

### Profil et parcours (`src/lib/profile.ts`)

- `getProfile()` / `saveProfile()` : lecture / fusion du profil actif (selon la session).
- `patchJourney()` : met à jour uniquement `journey` (quiz, favoris, scans, contact).

### Scoring quiz → formations (`src/lib/match-scoring.ts`)

- `quizAnswersToUserVec` : convertit les 4 réponses en un **vecteur utilisateur** (échelle 0–100 par dimension).
- `matchScorePercent` : distance moyenne au `matchVec` de chaque formation du catalogue.
- **`matchVec` manquant** : utilisation d’un vecteur **par défaut** (50, 50, 50, 50) pour éviter les plantages sur données incomplètes.

### QR (`src/lib/qr-payload.ts`)

- `encodeInstitutionQr(id)` pour générer un libellé de test du type `LETUDIANT:INST:mon-id`.

---

## Correctifs récents (stabilité quiz / dashboard)

- **Radar du dashboard** : le premier vecteur de recommandation était déjà `formation.matchVec` ; le code accédait par erreur à `.matchVec` une seconde fois, ce qui provoquait l’erreur *Cannot read properties of undefined (reading 'teaching')* après le quiz. Corrigé en lisant directement les clés sur ce vecteur.
- **Favoris dans le radar** : moyennes avec repli si `matchVec` absent sur une formation (`?.` + valeur par défaut).

---

## Structure indicative du code

```
src/
  routes/          # Pages TanStack Router
  lib/
    session.ts     # Session + comptes localStorage
    profile.ts     # Profil actif + patchJourney
    journey-state.ts
    fair-catalog.ts
    match-scoring.ts
    explore-data.ts
    qr-payload.ts
  components/      # UI partagée (AppShell, favoris, etc.)
```

---

## Notes POC

- Mots de passe et comptes sont **non sécurisés** (démonstration locale uniquement).
- Le déploiement cible peut inclure **Cloudflare Workers** (plugin Vite / wrangler selon la config du projet).

Pour le cahier des charges détaillé des évolutions produit, voir **`DEMANDE.md`** à la racine du dépôt.
