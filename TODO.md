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

S'il faut eréser sa branche avec une plus nouvelle il faudra faire:

- git fetch

- git reset --hard origin/master // pour se rebaser avec la branche master en ligne

## Front-end

## Back-end
