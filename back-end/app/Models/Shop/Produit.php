<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
  
    protected $table = 'produit';
    protected $primaryKey = 'codePro';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'idCategorie',
        'nomPro',
        'prix',
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
    public $timestamps = false;

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'idCategorie', 'idCat');
    }

    public function photos()
    {
        return $this->hasMany(Photo::class, 'codePro', 'codePro');
    }
    public function disponible(int $qte){
        if($this->qte - $qte >= 0){
            $this->actif = 1;
            $this->save();
        }
        else{
            $this->actif = 0;
            $this->save();
        }
    }

}
