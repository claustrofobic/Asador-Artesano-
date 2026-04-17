<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    //para q funcionen los tokens y sus métodos
    use HasApiTokens;
    //va a usar la tabla usuarios
    protected $table = 'usuarios';
    //no tengo el campo updated_at así q lo deja vacio, pero sí permite el created at pq ese si que lo tengo
    const UPDATED_AT = null;
    //los datos que puede rellenar
    protected $fillable = ['nombre', 'email', 'telefono', 'password_hash'];
    //oculta la constraseña
    protected $hidden = ['password_hash'];

    public function getAuthPassword()
    {
        return $this->password_hash;
    }
    //relacion, un usuario puede tener muchos pedidos
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'usuario_id');
    }
}
