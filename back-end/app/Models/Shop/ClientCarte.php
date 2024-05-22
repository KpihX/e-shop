<?php

namespace App\Models\Shop;

use App\Models\Shop\ville;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use LigneCarte;

class ClientCarte extends Model
{
    use HasFactory;

    protected $table = 'clientcarte';
    protected $primaryKey = 'matr';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'sexe',
        'dateNaiss',
        'idVille',
        'mobile',
        'whatsapp',
        // 'creation',
        'point',
        'montantTontine',
    ];

    public function ligneCartes()
    {
        return $this->hasMany(LigneCarte::class, 'idCarte');
    }

    public function ville()
    {
        return $this->belongsTo(ville::class, 'idVille');
    }
}
