<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    //voy a estar usando la tabla pedidos
    protected $table = 'pedidos';
    const UPDATED_AT = null;
    //los campos que permito que se rellenen
    protected $fillable = [
        'usuario_id', 'nombre_guest', 'telefono_guest',
        'total', 'hora_recogida', 'estado', 'medio_pago', 'notas'
    ];

    //establece una relación con el modelo de User, un pedido pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    //relacion con pedidoItem, un pedido puede tener muchos items
    public function items()
    {
        return $this->hasMany(PedidoItem::class);
    }

}
