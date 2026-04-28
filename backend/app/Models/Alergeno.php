<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;//HACER

class Alergeno extends Model
{
    //va a usar la tabla Alergenos
    protected $table = 'Alergenos';
    //para que no use la columna de created at
    public $timestamps = false;

    //NO uso el fillable porque los datos solo los voy a insertar manualmente desde la bbdd

    //relacion con platos, una Alergeno puede tener muchos platos
    public function platos()
    {
        return $this->hasMany(Plato::class);
    }
}
