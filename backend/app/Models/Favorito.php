<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    //tabla favoritos
    protected $table = 'favoritos';
    //para q no use el created at ni el updated at
    const UPDATED_AT = null;
    //los datos q puede tocar
    protected $fillable = [
        'user_id', 'plato_id'
    ];

    //relacion con usuario, un favorito pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    //relacion con plato, un favorito pertenece a un plato
    public function plato()
    {
        return $this->belongsTo(Plato::class, 'plato_id');
    }
}
