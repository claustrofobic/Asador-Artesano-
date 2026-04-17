<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PedidoItem extends Model
{
    //va a usar la tabla pedido_items
    protected $table = 'pedido_items';
    //para que no use la columna created at o updated at (pq laravel siempre lo usa por defecto)
    public $timestamps = false;
    //los datos que se pueden rellenar
    protected $fillable = ['pedido_id', 'plato_id', 'cantidad', 'precio_unitario', 'observaciones'];

    //relacion, un item pertenece a un plato
    public function plato()
    {
        return $this->belongsTo(Plato::class);
    }
}
