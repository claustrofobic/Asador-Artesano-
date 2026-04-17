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
        $plato = Plato::findOrFail($request->plato_id);

        $pedido = Pedido::create([
            'usuario_id'   => auth()->id(),
            'total'        => $plato->precio,
            'hora_recogida'=> now()->addHour(),
            'estado'       => 'recibido',
        ]);

        $pedido->items()->create([
            'plato_id'        => $plato->id,
            'cantidad'        => 1,
            'precio_unitario' => $plato->precio,
        ]);

        return response()->json($pedido, 201);
        //el 201 es el codigo para cuando se crea algo, avisa de q todo correcto
    }
}
