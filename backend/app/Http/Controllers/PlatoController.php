<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PlatoController extends Controller
{
    //funcion que muestra un plato en concreto con su categoria y su alergeno
    public function index(Request $request, $id){
        $plato = \App\Models\Plato::with('categoria', 'alergenos')->findOrFail($id);
        return response()->json($plato);
    }

    //funcion para traer las categorias
    public function showCategorias(){
        $categorias = \App\Models\Categoria::with('platos')->get();
        return response()->json($categorias);
    }

    //funcion para traer los alergenos
    public function showAlergenos(){
        $alergenos = \App\Models\Alergeno::with('platos')->get();
        return response()->json($alergenos);
    }

    //funcion para guardar un plato
    public function store(Request $request)
{
    $plato = \App\Models\Plato::create($request->except('alergenos')); // excluye alérgenos
    if ($request->has('alergenos')) { // si tuviera alergenos lo sincroniza aqui con la tabla pivote
        $plato->alergenos()->sync($request->alergenos);
    }
    return response()->json($plato, 201);
}

    //funcion para actualizar un plato
    public function update(Request $request, $id)
{
    $plato = \App\Models\Plato::findOrFail($id);
    $plato->update($request->except('alergenos')); //  excluye alergenos
    if ($request->has('alergenos')) {
        $plato->alergenos()->sync($request->alergenos); // si tuviera lo añade aqui a la tabla pivote
    }
    return response()->json($plato);
}

    //funcion para eliminar un plato
    public function destroy($id)
    {
        $plato = \App\Models\Plato::findOrFail($id);
        $plato->delete();
        return response()->json(null, 204);
    }


}
