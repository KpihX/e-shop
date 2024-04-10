<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $table = 'photo';
    protected $primaryKey = 'idPhoto';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = ['lienPhoto', 'codePro'];
    public $timestamps = false;

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'codePro', 'codePro');
    }
}
