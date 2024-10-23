# OlympicGamesStarter

Ce projet a été généré avec Angular CLI version 18.0.3.

## Prérequis

Installation de Node.js et npm
Avant de commencer à travailler avec ce projet, assurez-vous que Node.js et npm sont installés sur votre machine.  
Vous pouvez les installer à partir des sources officielles, en suivant les étapes ci-dessous.

## 1. Installation de Node.js et npm  
_Sur Windows ou macOS :_  

Allez sur le site officiel de Node.js.  
Téléchargez la dernière version LTS (Long-Term Support) recommandée pour la production.  
Suivez les instructions d'installation.  

_Sur Linux (Ubuntu/Debian) :_  
Utilisez les commandes suivantes dans le terminal pour installer Node.js et npm.  


_Mettez à jour vos paquets_   

`sudo apt update`

_Installez Node.js (y compris npm)_  

`sudo apt install nodejs npm`

## 2. Vérification de l'installation  
Une fois l'installation terminée, vous pouvez vérifier que Node.js et npm sont correctement installés en exécutant les commandes suivantes dans un terminal ou un invite de commande :


Vérifier la version de Node.js : 

`node -v`

Vérifier la version de npm :  

`npm -v`  

Ces commandes doivent afficher les versions respectives de Node.js et npm. Si ces commandes ne fonctionnent pas ou si les versions ne s'affichent pas correctement, cela signifie que l'installation a échoué ou que le chemin d'accès n'est pas configuré correctement.

## 3. Installation des dépendances du projet

Une fois Node.js et npm installés, vous pouvez installer les dépendances du projet en exécutant la commande suivante dans le répertoire racine du projet :

`npm install`

Cela va installer tous les paquets listés dans le fichier package.json nécessaire au bon fonctionnement du projet.

## Installation

1. Clonez le dépôt sur votre machine :

   ```bash
   git clone https://github.com/Camillerade/Developpez-le-front-end-en-utilisant-Angular.git
   
Accédez au dossier du projet :
 
`cd OlympicGamesStarter`

### Démarrage du Serveur de Développement
Pour lancer l'application en mode développement, exécutez :

`ng serve`

Ensuite, ouvrez votre navigateur et accédez à l'URL suivante :

http://localhost:4200

L'application se rechargera automatiquement si vous apportez des modifications aux fichiers sources.

Construction de l'Application
Pour construire le projet pour la production, exécutez :

`ng build`

Les fichiers de construction seront stockés dans le dossier dist/.

## Structure du Projet

Le projet suit une architecture définie qui comprend :

components/ : Contient tous les composants réutilisables.  
pages/ : Contient les composants utilisés pour le routage.  
core/ : Contient la logique métier (services et modèles).  

## Démarrer avec le Code

Il est recommandé de commencer par comprendre le code de démarrage.  

Portez une attention particulière à :  

app-routing.module.ts : Gère la configuration du routage de l'application.  
olympic.service.ts : Contient la logique pour interagir avec les données olympiques.  

## Amélioration du Code

Créez les interfaces TypeScript dans le dossier models/. Deux fichiers ont déjà été créés correspondant aux données du fichier olympic.json. Améliorez le code en remplaçant chaque any par l'interface correspondante.

## Fonctionnalités

Le projet vous permet de :

Afficher les détails des pays participants aux Jeux Olympiques.  
Visualiser les médailles gagnées par pays.  
Consulter le nombre total de participations et d'athlètes.  

