<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PlatoController extends Controller
{
    public function index(Request $request, $id){
        $plato = \App\Models\Plato::with('categoria', 'alergenos')->findOrFail($id);
        return response()->json($plato);
    }

    public function showCategorias(){
        $categorias = \App\Models\Categoria::with('platos')->get();
        return response()->json($categorias);
    }

    public function showAlergenos(){
        $alergenos = \App\Models\Alergeno::with('platos')->get();
        return response()->json($alergenos);
    }

    public function store(Request $request)
    {
        $plato = \App\Models\Plato::create($request->all());
        if ($request->has('alergenos')) {
            $plato->alergenos()->sync($request->alergenos);
        }
        return response()->json($plato, 201);
    }

    public function update(Request $request, $id)
    {
        $plato = \App\Models\Plato::findOrFail($id);
        $plato->update($request->all());
        if ($request->has('alergenos')) {
            $plato->alergenos()->sync($request->alergenos);
        }
        return response()->json($plato);
    }

    public function destroy($id)
    {
        $plato = \App\Models\Plato::findOrFail($id);
        $plato->delete();
        return response()->json(null, 204);
    }


}
