# TodoList_fastapi_postgre_react

### Pour lancer l'application :
* clone le projet dans un répertoire local avec la commande : git clone https://github.com/cai-i/TodoList_fastapi_postgre_react (utiliser le projet présent sur la branche deployment_fixed afin d'avoir la version qui marche avec docker)
* ouvrir docker desktop
* aller à l'aide du terminal dans le répertoire où vous avez clone le projet
* faire : docker-compose build
* puis : docker-compose up
* attendre un peu, cela peut prendre un certain temps
* puis une fois que tout (db, front, backend) est lancé (regarder dans docker desktop, s'il le faut, appuyer sur le bouton start manuellement), aller à http://localhost:3000 à l'aide d'un navigateur
* l'application est alors censé s'afficher

### Concernant l'application
Il s'agit là d'une application où les utilisateurs peuvent mettre leur todo list (malheureusement, pour l'instant, l'application ne prend en compte que les paramètres "title" et "unit").

Cette application a été imaginée pour un usage plutôt scolaire, ainsi le paramètre "title" correspondrait à la tâche que l'étudiant aimerais faire, et "unit" correspond à la matière pour laquelle l'étudiant doit réaliser sa tâche.

Sur l'entête de l'application, nous retrouvons un badge en bleu qui chiffre le nombre de tâche qu'il reste à faire, un bouton "home" qui nous renvoie à chaque fois à la page d'accueil où l'utilisateur peut retrouver toutes ses tâches.

Puis arrive le bouton "Add ToDo", qui permet à l'utilisateur d'ajouter une tâche en remplissant les paramètres correspondants. Une fois ces champs remplis, l'utilisateur doit appuyer sur le bouton submit qui le renverra à la page d'accueil ave sa nouvelle tâche ajouté à la fin du table.

Il est également possible pour l'utilisateur de filtrer ses tâches :
* par "title" en rentrant un text dans le champ correspondant ("Search by Title"). L'application renverra alors les tâches dont les "titles" comprennent le text fourni.
* par "unit", en choisissant l'unité parmi ceux proposés (qui existent déjà dans la base de données.

Enfin, pour chaque tâche, l'utilisateur pourra le modifier en appuyant sur le bouton "Update" ou le supprimer du tableau en appuyant sur le bouton "Delete".

### Bibliographie :
* https://github.com/DataTrainingOrg/fullstack-data-application
* https://josephmin.medium.com/react-app-with-fastapi-sqlalchemy-postgresql-and-docker-compose-a-tutorial-part-1-setup-5e3c26fcbdf0
* https://testdriven.io/blog/fastapi-react/
* https://christophergs.com/tutorials/ultimate-fastapi-tutorial-pt-1-hello-world/
* https://www.youtube.com/watch?v=kBbKf9wliuc&list=PLU7aW4OZeUzwYXbC_mbQJdAU7JUu81RZo&index=1
