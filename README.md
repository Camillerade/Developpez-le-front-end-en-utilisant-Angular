# OlympicGamesStarter

Ce projet a été généré avec Angular CLI version 18.0.3.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) sur votre machine.

## Installation

1. Clonez le dépôt sur votre machine :

   ```bash
   git clone https://github.com/<Camillerade>/Developpez-le-front-end-en-utilisant-Angular.git
Accédez au dossier du projet :

 
`cd OlympicGamesStarter`

Installez les dépendances :


Démarrage du Serveur de Développement
Pour lancer l'application en mode développement, exécutez :

`ng serve`

Ensuite, ouvrez votre navigateur et accédez à l'URL suivante :

http://localhost:4200

L'application se rechargera automatiquement si vous apportez des modifications aux fichiers sources.

Construction de l'Application
Pour construire le projet pour la production, exécutez :

`ng build`
Les fichiers de construction seront stockés dans le dossier dist/.

Structure du Projet
Le projet suit une architecture définie qui comprend :

components/ : Contient tous les composants réutilisables.
pages/ : Contient les composants utilisés pour le routage.
core/ : Contient la logique métier (services et modèles).
Démarrer avec le Code
Il est recommandé de commencer par comprendre le code de démarrage. Portez une attention particulière à :

app-routing.module.ts : Gère la configuration du routage de l'application.
olympic.service.ts : Contient la logique pour interagir avec les données olympiques.
Amélioration du Code
Créez les interfaces TypeScript dans le dossier models/. Deux fichiers ont déjà été créés correspondant aux données du fichier olympic.json. Améliorez le code en remplaçant chaque any par l'interface correspondante.

Fonctionnalités
Le projet vous permet de :

Afficher les détails des pays participants aux Jeux Olympiques.
Visualiser les médailles gagnées par pays.
Consulter le nombre total de participations et d'athlètes.
Bonnes Pratiques
Vérifiez toujours votre code avec des outils comme ESLint et Prettier.
Écrivez des tests unitaires pour vos composants et services.
Aide
Si vous avez des questions ou des problèmes, n'hésitez pas à ouvrir une issue sur le dépôt ou à consulter la documentation d'Angular ici.
