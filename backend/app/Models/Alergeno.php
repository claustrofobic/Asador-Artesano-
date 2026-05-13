<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;//HACER

class Alergeno extends Model
{
    //va a usar la tabla Alergenos
    protected $table = 'Alergenos';
    //para que no use la columna de created at
    public $timestamps = false;

    protected $fillable = ['nombre'];

    //relacion con platos, una Alergeno puede tener muchos platos
    public function platos()
{
    return $this->belongsToMany(Plato::class, 'plato_alergenos');
}
}
