<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AlergenosController extends Controller
{
    //funcion para sacarlos y mostrarlos
    public function show(Request $request)
    {
        //se lo pide al módelo y lo devuelve como json
        $alergenos = \App\Models\Alergeno::all();
        return response()->json($alergenos);
    }

    //funcion para almacenar un nuevo alergeno
    public function store(Request $request)
    {
        //le pide al módelo el método create y con los datos q pide los manda
        $alergeno = \App\Models\Alergeno::create($request->all());
        return response()->json($alergeno, 201);
    }

    //funcion para actualizar un alergeno ya existente
    public function update(Request $request, $id)
    {
        //pide al modelo con su metodo q lo encuentre
        $alergeno = \App\Models\Alergeno::findOrFail($id);
        //lo actualiza con los datos q pide
        $alergeno->update($request->all());
        return response()->json($alergeno);
    }

    //funcion para eliminar un alergeno
    public function destroy(Request $request, $id)
    {
        //pide el metodo del modelo para encontrarlo con su id
        $alergeno = \App\Models\Alergeno::findOrFail($id);
        //lo elimina
        $alergeno->delete();
        return response()->json(null, 204);
    }

    //funcion para buscar un alergeno concreto
    public function index(Request $request, $id)
    {
        $alergeno = \App\Models\Alergeno::findOrFail($id);
        return response()->json($alergeno);
    }
}
