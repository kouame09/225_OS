# GitHub Actions Workflows

## Keep Supabase Alive

Ce workflow empêche votre instance Supabase gratuite de se mettre en pause après 7 jours d'inactivité.

### Configuration requise

1. **Ajouter les secrets GitHub** :
   - Allez dans votre repo GitHub : `Settings` → `Secrets and variables` → `Actions`
   - Cliquez sur `New repository secret`
   - Ajoutez ces deux secrets :
     - `VITE_SUPABASE_URL` : Votre URL Supabase (ex: `https://xxxxx.supabase.co`)
     - `VITE_SUPABASE_ANON_KEY` : Votre clé anonyme Supabase

2. **Activer GitHub Actions** :
   - Allez dans l'onglet `Actions` de votre repo
   - Si c'est la première fois, cliquez sur "I understand my workflows, go ahead and enable them"

### Fonctionnement

- ⏰ S'exécute automatiquement **tous les 5 jours** à 3h00 UTC
- 🔧 Peut être déclenché manuellement depuis l'onglet Actions
- 📡 Envoie une simple requête à votre base Supabase pour la garder active

### Test manuel

Pour tester immédiatement :
1. Allez dans `Actions` → `Keep Supabase Alive`
2. Cliquez sur `Run workflow` → `Run workflow`
3. Vérifiez les logs pour confirmer que ça fonctionne

### Dépannage

Si le workflow échoue :
- Vérifiez que les secrets sont correctement configurés
- Vérifiez que votre URL Supabase est correcte (sans `/` à la fin)
- Le message "function may not exist" est normal - la connexion suffit à garder l'instance active
