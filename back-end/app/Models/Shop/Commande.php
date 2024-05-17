<?php

namespace App\Models\Shop;

use App\Models\Facture;
use App\Models\LigneFacture;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Commande extends Model
{
    use HasFactory;
    protected $table = 'commande';
    protected $primaryKey = 'idCommande';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'nomClient',
        'mobile',
        'adresse',
        'idVille',
        'dateCom',
        'montant',
        'livrer'
    ];
    public function ville()
    {
        return $this->belongsTo(Ville::class, 'idVille');
    }

    /**
     * The $data must contain the typeFac, idCaissiere, capital and tva fields
     */
    public function toFactureData(array $data)
    {
        return [
            'idFac' => null, 
            'dateFac' => $this->dateCom,
            'remise' => $this->remise, 
            'montant' => $this->montant,
            'tel' => $this->mobile,
            'typeFac' => $data['typeFac'], 
            'idCaissiere' => $data['idCaissiere'], 
            'capital' => $data['capital'], 
            'tva' => $data['tva'] 
        ];
    }

    public function ligneCommandes()
    {
        $this->hasMany(LigneCommande::class);
    }
}
