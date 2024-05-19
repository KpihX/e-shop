<?php

use App\Models\ClientCarte;
use App\Models\Facture;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCarte extends Model
{
    use HasFactory;

    protected $table = 'lignecarte';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamp = false;

    protected $fillable = [
        'idFac',
        'idCarte',
        'point',
        'dateOpera',
        'montantFac',
    ];

    public function clientCarte()
    {
        return $this->belongsTo(ClientCarte::class, 'idCarte');
    }

    public function facture()
    {
        return $this->belongsTo(Facture::class, 'idFac');
    }
}
