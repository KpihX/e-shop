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
- [Pavel & Kenfack] styliser la page de cart [Maeva & Kenfack]
- [Kamdem] reset le contenu du Cart après qu'on ait appuyer sur **valider**
- faire le bouton charger plus de produits sur toute la largeur de l'ecran. Et le bouton revenir plus haut doitetre une icon de fleche vers le haut.
- retirer le backgroung des images des produits
- Kenfack qui fera le footer reglera l'affichage centrer des composantes.
- Arranger la barre de recherche pour effectuer la recherche par nomPro et par idCat
- Le bouton definit dans Hero doit ajouter l'element dans le Cart
- Modifier le loader wrapper pour qu'il ait la couleur du site et eviter de recharger la page dès le début.
- La casse des mots sur le site.
- Faire un padding sur le titre "Nos meilleurs Produits"
- combo box pour la couleur et la taille
- bien styliser le cart(l'image à gauche et les autres composants à droite)
- arranger les routes depuis le cart pour le home( cliquer sur une categorie ...)
- A la validation de la commande, afficher un popup de confirmation
- un petit souci de validation dans le popup au niveau de la couleur.
- l'email doit nous renvoyer dans gmail.
## Back-end

* [Isis] Utiliser store comme controller au lieu de command dans CommandeController
* [Isis] Utiliser LigneCommandeController au lieu de tout faire dans CommandeController
* ecrire le necessaire pour l'enregistrement des commandes via la route /shop/command. Renvoyez les erreur avec des response contenant explicitement en fr le message d'erreur  à afficher directement par le front-end
* ecrire les controllers pour l'interface backend
* Isis trier les villes avant l'envoie au frontend.
