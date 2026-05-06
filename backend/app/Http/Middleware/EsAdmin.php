<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    /* verifica si hay usuario logueado */
    if (!$request->user()) {
        return response()->json(['message' => 'No autenticado'], 403);
    }

    /* verifica si el usuario logueado es admin */
    if ($request->user()->rol !== 'admin') {
        return response()->json(['message' => 'Acceso denegado'], 403);
    }

    return $next($request);
}
}
