<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AlergenosController extends Controller
{
    public function show(Request $request)
    {
        $alergenos = \App\Models\Alergeno::all();
        return response()->json($alergenos);
    }

    public function store(Request $request)
    {
        $alergeno = \App\Models\Alergeno::create($request->all());
        return response()->json($alergeno, 201);
    }

    public function update(Request $request, $id)
    {
        $alergeno = \App\Models\Alergeno::findOrFail($id);
        $alergeno->update($request->all());
        return response()->json($alergeno);
    }

    public function destroy(Request $request, $id)
    {
        $alergeno = \App\Models\Alergeno::findOrFail($id);
        $alergeno->delete();
        return response()->json(null, 204);
    }

    public function index(Request $request, $id)
    {
        $alergeno = \App\Models\Alergeno::findOrFail($id);
        return response()->json($alergeno);
    }
}
