<?php
namespace App\Http\Controllers;

use App\Models\Categoria;

class MenuController extends Controller
{
    public function index()
    {
        // trae categorías con sus platos disponibles
        $categorias = Categoria::with(['platos' => function($q) {
            $q->where('disponible', true) ->with('alergenos');
        }])->orderBy('orden')->get();//y los ordena por el campo orden en la tabla

        return response()->json($categorias);
    }
}
