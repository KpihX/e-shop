<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
  
    protected $table = 'produit';
    
    protected $primaryKey = 'codePro';
    protected $fillable = [
        'nomProd',
        'prix',
        'codeCat',
        'idCategorie',
        'qte',
        'description',
        'codeArrivage',
        'actif',
        'dateInsertion',
        'prixAchat',
        'pourcentage',
        'promo',
        'size1',
        'size2',
        'typeSize'
    ];
    public function category(){
        return $this->belongsTo(Categorie::class, 'idCategorie');
    }
    public function photos(){
        return $this->hasMany(Photo::class, 'codePro');
    }
}
