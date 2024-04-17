## Prerequis

Avant de faire toute tâche, il faudra faire: (étant dans sa branche)

* `git merge origin/master` // pour fusionner sa branche avec la branche en ligne
* si ça échoue faire:
  * `git merge --abort` // pour annuler le merge
  * puis `git rebase origin/master` // pour écraser le contenu de votre branche actuelle avec le main en ligne
  * si ça echoue, faire:
    * `git rebase origin/master --forced`
* Sinon (rien n'a marché) , envoyer le screenshoot de l'erreur dans le groupe avec une brève explication de ce qui a conduit à l'erreur

Quand une tâche est terminée, il faut: 

* mettre [OK] à la fin
* puisfaire un `git push -u origin [nomVotreBranche]` pour mettre le contenu de votre branche en ligne
* Enfin envoyer un message dans le groupe pour informer de la mise à jour, afin que je fasse le merge

**NB**: Si une erreur survient, il faut envoyer le screenshoot de l'erreur dans le groupe avec une explication suscinte

## Front-end

- [Pavel & Kenfack] arranger le style de la page home
- [Pavel & Kenfack] styliser la page de cart [Maeva & Kenfack]
- [Pavel & Kenfack] rendre le site responsive

## Back-end

* [Isis] Utiliser store comme controller au lieu de command dans CommandeController
* [Isis] Utiliser LigneCommandeController au lieu de tout faire dans CommandeController
* ecrire le necessaire pour l'enregistrement des commandes via la route /shop/command. Renvoyez les erreur avec des response contenant explicitement en fr le message d'erreur  à afficher directement par le front-end
* ecrire les controllers pour l'interface backend
