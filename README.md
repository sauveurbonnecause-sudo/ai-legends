# AI LEGENDS — mise en ligne (tablette Android, 0 €)

## 1. GitHub
1. Compte gratuit sur github.com, puis « New repository » (nom : ai-legends).
2. « Add file > Create new file » : tapez le chemin complet comme nom (ex. `api/auth.js`, les « / » créent les dossiers), collez le contenu, « Commit ». Répétez pour chaque fichier du ZIP : package.json, vercel.json, public/index.html, api/_lib.js, auth.js, chat.js, pay.js, admin.js.
   (Si votre navigateur accepte l'envoi de dossiers : « Add file > Upload files » après avoir extrait le ZIP avec l'appli Fichiers.)

## 2. Vercel
1. vercel.com > « Continue with GitHub » > « Add New… > Project » > importez ai-legends.
2. Framework Preset : **Other**. Ne changez rien d'autre > Deploy.
3. Onglet **Storage** du projet > Marketplace > **Upstash Redis** (offre gratuite) > connectez-le au projet (les variables KV_REST_API_URL / KV_REST_API_TOKEN sont ajoutées automatiquement).
4. Settings > Environment Variables :
   - `ADMIN_EMAIL` : votre email. Le compte créé avec cet email devient administrateur.
   - `PAYPAL_ME` : https://paypal.me/Myo969 (optionnel, c'est la valeur par défaut)
   - IA (optionnel, sinon le chat affiche « aucun modèle connecté ») : `AI_BASE_URL` (API compatible OpenAI, ex. https://api.groq.com/openai/v1), `AI_API_KEY`, `AI_MODEL`. Vérifiez les quotas gratuits du fournisseur avant d'activer.
5. Deployments > Redeploy. Créez votre compte avec ADMIN_EMAIL, puis ouvrez Compte > Administration.

## Paiements (manuel)
L'utilisateur reçoit une référence AL-XXXX et le lien PayPal.Me au bon montant. Vous vérifiez la réception dans PayPal, puis cliquez « Confirmer » : la formule est activée 30 jours. Aucune activation automatique.

## Limites à connaître
- Vercel Hobby (gratuit) est réservé à un usage personnel non commercial ; un site qui encaisse relève en principe du plan Pro (payant).
- Quotas gratuits Upstash et du fournisseur IA limités ; ajustez les limites dans l'admin.
