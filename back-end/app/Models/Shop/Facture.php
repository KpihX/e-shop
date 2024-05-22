<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Gestionnaire;

class Facture extends Model
{
    protected $table = 'facture';
    protected $primaryKey = 'idFac';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'dateFac', 'remise', 'montant', 'tel', 'typeFac', 'idCaissiere', 'capital', 'tva'
    ];

    public function lignes()
    {
        return $this->hasMany(LigneFacture::class, 'idFac');
    }

    // Define relationships
    public function caissiere()
    {
        return $this->belongsTo(Gestionnaire::class, 'idCaissiere');
    }
}
