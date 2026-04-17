<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //función que procesa el login (recibe los datos con el request)
    public function login(Request $request)
    {
        //valida que exista el email (y que tenga formato de email) y que exista la contraseña
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        //crea un array con los datos del usuario
        $credenciales = [
            'email'    => $request->email,
            'password' => $request->password,
        ];

        //comprueba que existe ese usuario con el email y la contraseña
        if (!Auth::attempt($credenciales)) {
            //si las credenciales son incorrectas devuelve error en JSON
            return response()->json([
                'message' => 'El email o la contraseña no son correctos.'
            ], 401);
        }

        //si el login es correcto, obtiene el usuario autenticado
        $usuario = Auth::user();

        //borra tokens anteriores para no acumular tokens viejos
        $usuario->tokens()->delete();

        //genera un nuevo token para este usuario
        $token = $usuario->createToken('auth_token')->plainTextToken;

        //devuelve el token y los datos del usuario a React
        return response()->json([
            'token'   => $token,
            'usuario' => $usuario,
        ]);
    }

    //función que procesa el logout
    public function logout(Request $request)
    {
        //borra el token actual del usuario
        $request->user()->currentAccessToken()->delete();

        //confirma q el logout fue correcto
        return response()->json([
            'message' => 'Sesión cerrada correctamente.'
        ]);
    }
}
