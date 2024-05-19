<?php

namespace App\Models\Shop;

use App\Models\Facture;
use App\Models\LigneFacture;


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
     * The $data must contain the idCaissiere and tva fields
     */
    public function toFactureData(array $data)
    {
        return [
            'idFac' => null,
            'dateFac' => $this->dateCom,
            'remise' => $this->remise,
            'montant' => $this->montant,
            'tel' => $this->mobile,
            'typeFac' => 0,
            'idCaissiere' => $data['idCaissiere'],
            'capital' => 0,
            'tva' => $data['tva']
        ];
    }

    public function ligneCommandes()
    {
        $this->hasMany(LigneCommande::class, 'idCommande');

    }
}
