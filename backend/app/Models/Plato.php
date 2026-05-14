<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    //voy a usar la tabla platos
    protected $table = 'platos';

    //los campos que se pueden rellenar
    protected $fillable = ['categoria_id', 'nombre', 'descripcion', 'precio', 'imagen_url', 'disponible'];
    //para q no use el created at ni el updated at
    const UPDATED_AT = null;

    //relacion con categoria, un plato pertenece a una categoria
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    //relacion con alergenos, un plato puede tener muchos alergenos y un alergeno puede estar en muchos platos
    public function alergenos()
    {
        return $this->belongsToMany(Alergeno::class, 'plato_alergenos');
    }
}
