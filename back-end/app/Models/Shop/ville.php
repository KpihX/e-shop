<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ville extends Model
{
    use HasFactory;
    protected $table = 'ville';
    protected $primaryKey = 'idVille';
    public $incrementing = true;
    protected $fillable =[
        'libelle'
    ];
}
