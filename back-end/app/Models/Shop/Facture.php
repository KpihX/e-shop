<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    protected $table = 'facture';
    protected $primaryKey = 'idFac';
    public $incrementing = true;
    protected $keyType = 'int';

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
