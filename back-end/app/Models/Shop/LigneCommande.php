<?php

namespace App\Models\Shop;

use App\Models\Shop\Produit;
use App\Models\Shop\Commande;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
class LigneCommande extends Model
{
    use HasFactory;

    protected $table = 'lignecommande';
    protected $primaryKey = 'idLignCom';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable=[
        'idCommande',
        'codePro',
        'quantite',
        'couleur',
        'taille',
        'disponible'
    ];

    public function toLigneFacture(string $idFacture){
        return [
            'codePro' => $this->codePro,
            'idFac' => $idFacture,
            'prix' => $this->produit->prix,
            'qte' => $this->quantite
        ];
    }
    
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'idCommande');
    }
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'codePro');
    }
}
