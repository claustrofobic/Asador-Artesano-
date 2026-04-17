<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    //va a usar la tabla categorias
    protected $table = 'categorias';
    //para que no use la columna de created at
    public $timestamps = false;

    //NO uso el fillable porque los datos solo los voy a insertar manualmente desde la bbdd

    //relacion con platos, una categoria puede tener muchos platos
    public function platos()
    {
        return $this->hasMany(Plato::class);
    }
}
