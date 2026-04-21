<?php
namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Plato;

class OrderController extends Controller
{
    //funcion que muestra los pedidos
    public function index()
{
    $pedidos = auth()->user()
        ->pedidos()
        ->with(['items.plato']) // carga los items y el plato de cada item
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($pedidos);
}

    public function store(\Illuminate\Http\Request $request)
{

    $total = 0;
    $items = [];

    // recorre cada plato_id del array
    foreach ($request->platos_ids as $plato_id) {
        $plato = Plato::findOrFail($plato_id);
        $total += $plato->precio;
        $items[] = [
            'plato_id'        => $plato->id,
            'cantidad'        => 1,
            'precio_unitario' => $plato->precio,
        ];
    }

    $pedido = Pedido::create([
        'usuario_id'    => auth()->id(),
        'total'         => $total,
        'hora_recogida' => now()->addHour(),
        'estado'        => 'recibido',
    ]);

    foreach ($items as $item) {
        $pedido->items()->create($item);
    }

    return response()->json($pedido, 201);
}
}
