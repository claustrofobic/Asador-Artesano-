<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoritoController extends Controller
{
    //saca un favorito en concreto
    public function index(){
        $favoritos = auth()->user()->favoritos()->with('plato')->get();
        return response()->json($favoritos);
    }

    //guarda un favorito con un id de plato concreto
    public function store(\Illuminate\Http\Request $request){
        $favorito = auth()->user()->favoritos()->create([
            'plato_id' => $request->plato_id
        ]);
        return response()->json($favorito, 201);
    }

    //función para quitar un favorito
    public function destroy($id){
        $favorito = auth()->user()->favoritos()->where('id', $id)->firstOrFail();
        $favorito->delete();
        return response()->json(null, 204);
    }
}
