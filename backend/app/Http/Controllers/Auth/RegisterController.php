<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{

    //procesa el registro
    public function register(Request $request)
    {   //valida los datos
        $request->validate([
            'nombre'   => 'required|string|max:120',
            'email'    => 'required|email|unique:usuarios,email',
            'telefono' => 'nullable|string|max:30',
            'password' => 'required|min:8|confirmed',
        ]);
        //crea el usuario
        $usuario = User::create([
            'rol' => 'user', //asignamos el rol de usuario por defecto
            'nombre'        => $request->nombre,
            'email'         => $request->email,
            'telefono'      => $request->telefono,
            'password_hash' => Hash::make($request->password),
        ]);

        //genera un nuevo token para este usuario
        $token = $usuario->createToken('auth_token')->plainTextToken;

        //devuelve el token y los datos del usuario a React
        return response()->json([
            'token'   => $token,
            'usuario' => $usuario,
        ], 201);//aquí si ponemos el 201 pq hemos *creado* un usuario
    }
}
