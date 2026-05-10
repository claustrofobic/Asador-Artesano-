<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class EstadisticasController extends Controller
{
    public function ventasPorPlato()
    {
        $datos = DB::table('pedido_items')
            ->join('platos', 'pedido_items.plato_id', '=', 'platos.id')
            ->selectRaw('platos.id, platos.nombre, SUM(pedido_items.cantidad) as total_vendido')
            ->groupBy('platos.id', 'platos.nombre')
            ->orderByDesc('total_vendido')
            ->get();

        // Calculamos el total global para sacar el porcentaje de cada plato
        $totalGlobal = $datos->sum('total_vendido');

        // Añadimos el porcentaje a cada plato
        $datos = $datos->map(function ($plato) use ($totalGlobal) {
            $plato->porcentaje = $totalGlobal > 0
                ? round(($plato->total_vendido / $totalGlobal) * 100, 1)
                : 0;
            return $plato;
        });

        return response()->json($datos);
    }
}
