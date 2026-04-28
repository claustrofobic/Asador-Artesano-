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
    //funcion q crea un nuevo pedido
    public function store(\Illuminate\Http\Request $request)
{

    $total = 0;
    $items = [];

    // recorre cada plato_id del array
foreach ($request->items as $item) {
        $plato = Plato::findOrFail($item['plato_id']);
        $total += $plato->precio * $item['cantidad'];
    $items[] = [
    'plato_id'        => $plato->id,
    'cantidad'        => $item['cantidad'],
    'precio_unitario' => $plato->precio,
];
    }

    $pedido = Pedido::create([
    'usuario_id'     => auth()->id(),
    'total'          => $total,
    'hora_recogida'  => $request->hora_recogida,
    'estado'         => 'recibido',
    'medio_pago'     => $request->medio_pago,
]);

    foreach ($items as $item) {
        $pedido->items()->create($item);
    }

    return response()->json($pedido, 201);
}
}
