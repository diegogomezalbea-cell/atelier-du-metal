# n8n Sites Vitrines

Sites vitrines pour petites entreprises, avec des automatisations [n8n](https://n8n.io) branchées dessus : chatbot, formulaires, réservations, emails automatiques.

Réalisé par **Diego Gomez Albea** dans le cadre de [Hastor](https://hastor.agency) : automatisation IA et services web pour les PME françaises.

## Projets

| Projet | Description | Automatisations n8n |
|---|---|---|
| **comptoir-du-chef** | Site d'un restaurant : accueil, menu, chef, contact, réservations | Chatbot, formulaire de contact, réservations |
| **prestige-auto** | Site d'un professionnel de l'automobile : services, galerie, tarifs, contact | Chatbot |
| **demo_newsletter** | Page d'inscription à une newsletter | Séquence d'emails automatique J+0 / J+3 / J+7 via Gmail |
| **l'atelier_du_metal** | Site vitrine d'un artisan métallurgiste | Aucune |

## Stack

- HTML, CSS, JavaScript (sans framework)
- n8n pour les workflows (webhooks, envoi d'emails)

## Lancer un projet

1. Ouvrir le `index.html` du dossier voulu dans un navigateur.
2. Pour les fonctions automatisées, importer les fichiers `n8n-*-workflow.json` dans une instance n8n.
3. Les appels du front pointent vers `http://localhost:5678/webhook/...` : adapter l'URL du webhook et les identifiants (Gmail, etc.) à ton instance.

## Contact

[contact@hastor.agency](mailto:contact@hastor.agency)
