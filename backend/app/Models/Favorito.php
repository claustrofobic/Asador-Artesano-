<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    protected $table = 'favoritos';
    const UPDATED_AT = null;
    protected $fillable = [
        'user_id', 'plato_id'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function plato()
    {
        return $this->belongsTo(Plato::class, 'plato_id');
    }
}
