<?php

namespace App\Models;

use App\Models\Shop\Produit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneFacture extends Model
{
    protected $table = 'lignefacture';
    protected $primaryKey = 'idLFac';
    public $timestamps = false;
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'codePro', 'idFac', 'prix', 'qte'
    ];

    // Define relationships
    public function facture()
    {
        return $this->belongsTo(Facture::class, 'idFac');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'codePro');
    }

}
