<?php

namespace App\Models\Shop;

use App\Models\Shop\LigneFacture;
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
    protected $fillable=[
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
    // public function user(){
    //     $this->belongsTo(User::class, 'idClient');
    // }
    public function items(){
        $this->hasMany(LigneFacture::class);
    }

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

    
}
