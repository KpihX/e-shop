<?php

namespace App\Models\Shop;

use App\Models\Gestionnaire;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Shop\Produit;

class GestionStock extends Model
{
    use HasFactory;
    //
    protected $table = 'gestionStock';
    protected $primaryKey = 'idStock';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'qte',
        'dateStock',
        'operation',
        'idGest',
        'codePro'
    ];
    public $timestamps = false;

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'codePro', 'codePro');
    }

    public function gestionnaire()
    {
        return $this->belongsTo(Gestionnaire::class, 'idGest', 'idGest');
    }

}