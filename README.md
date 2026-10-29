# AI LEGENDS — prototype initial

Cette archive contient une première version visuelle et interactive de l'application web AI LEGENDS, préparée pour évoluer en PWA et en application Android via Capacitor.

## Déjà présent
- Page d'accueil responsive avec identité visuelle sombre/violet/or.
- Catalogue de 10 agents spécialisés et filtres.
- Fenêtre de conversation et navigation fonctionnelles côté interface.
- Présentation des cinq formules Basic, Premium, Gold, Diamond et Légende.
- Manifest PWA et service worker de cache.
- Serveur local minimal et endpoint `/health`.
- Configuration de départ pour Capacitor.

## Limites importantes
Cette version est un **prototype**, pas encore une plateforme commerciale :
- Aucun compte n'est réellement créé.
- Les conversations ne sont pas envoyées à un modèle IA.
- Aucun paiement n'est activé ou prélevé.
- Les tarifs sont des exemples à valider.
- Il n'y a pas encore de base de données ni de gestion sécurisée des abonnements.
Ne demande pas aux utilisateurs d'y saisir de vrais mots de passe avant l'ajout d'une authentification serveur sécurisée.

## Lancer sur ordinateur
1. Installer Node.js LTS depuis https://nodejs.org/
2. Extraire l'archive.
3. Ouvrir un terminal dans le dossier `ai-legends`.
4. Exécuter `npm install`
5. Exécuter `npm start`
6. Ouvrir `http://localhost:3000`

## Utiliser depuis une tablette Android
Pour le moment, le plus simple est de publier le site sur un hébergement web qui sert les fichiers statiques, puis de l'ouvrir dans Chrome. Pour installer la PWA, l'hébergement doit être en HTTPS et le navigateur doit proposer « Installer l'application » ou « Ajouter à l'écran d'accueil ».

## Construire une application Android native (étape ultérieure)
Capacitor nécessite Node.js et Android Studio pour générer et compiler l'APK. Ce projet contient une configuration de départ, mais l'APK n'a pas encore été construit ni testé.

Quand tu seras sur un ordinateur avec Node.js et Android Studio :
1. `npm install @capacitor/core @capacitor/cli @capacitor/android`
2. `npx cap add android`
3. `npx cap sync android`
4. `npx cap open android`
5. Compiler l'APK depuis Android Studio.

La compilation Android native ne se fait pas directement dans ce dossier depuis une simple tablette Android sans environnement de développement adapté.

## Prochaines étapes indispensables
1. Choisir un backend et une base de données avec un niveau gratuit adapté.
2. Mettre en place l'inscription, la connexion, la réinitialisation de mot de passe et les droits serveur.
3. Connecter un fournisseur IA réel et appliquer les quotas côté serveur.
4. Ajouter Stripe ou un prestataire compatible, avec webhooks signés et vérification serveur.
5. Ajouter les pages légales et tester sécurité, RGPD et parcours de paiement.
6. Déployer sous HTTPS, configurer les secrets dans l'hébergeur et tester en production.

## Coûts
Le code de ce prototype peut être utilisé gratuitement. L'hébergement, les services de modèles IA, les commissions de paiement et la publication mobile peuvent avoir des limites ou des frais. Une offre gratuite n'est pas une garantie de coût nul à long terme.
