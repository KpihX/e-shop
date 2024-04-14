<?php

namespace App\Models\Shop;

use App\Models\Shop\Produit;
use App\Models\Shop\Commande;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    use HasFactory;

    protected $fillable=[
        'idCommande',
        'codePro',
        'quantite'
    ];
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'idCommande');
    }
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'codePro');
    }
}
