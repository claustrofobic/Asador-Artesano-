<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    protected $table = 'platos';

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function alergenos()
    {
        return $this->belongsToMany(Alergeno::class, 'plato_alergenos');
    }
}
