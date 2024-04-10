<?php

namespace App\Models\Shop;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categorie'; // Nom personnalisé de la table
    protected $primaryKey = 'idCat'; // Clé primaire personnalisée
    public $incrementing = true; // Mettre à false si la clé primaire n'est pas auto-incrémentée
    protected $keyType = 'int'; // Type de la clé primaire
    protected $fillable = ['nomCat'];
    public $timestamps = false; // Mettre à false si la table n'a pas les colonnes timestamps
}
