<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\PlatoController;
use App\Http\Controllers\AlergenosController;
use App\Http\Controllers\EstadisticasController;

// ── Rutas públicas ──────────────────────────────────────
Route::get('/platos',      [MenuController::class,  'index']);
Route::get('/platos/{id}', [MenuController::class,  'show']);

// ── Auth ────────────────────────────────────────────────
Route::post('/login',    [LoginController::class,  'login']);
Route::post('/registro', [RegisterController::class, 'register']);

// ── Rutas privadas (requieren login) ────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/mis-pedidos',  [PedidoController::class, 'index']);
    Route::post('/mis-pedidos', [PedidoController::class, 'store']);
    Route::get('/favoritos',    [FavoritoController::class, 'index']);
    Route::post('/favoritos',   [FavoritoController::class, 'store']);
    Route::delete('/favoritos/{id}', [FavoritoController::class, 'destroy']);
    Route::post('/logout',      [LoginController::class, 'logout']);
    Route::get('/pedidos/{id}/pdf', [PedidoController::class, 'showPdf']);


    Route::middleware('es_admin')->group(function () {
        Route::get('/admin/pedidos',      [PedidoController::class,  'indexAdmin']);
        Route::put('/pedidos/{id}', [PedidoController::class,  'updateEstado']);

        Route::post('/admin/platos', [PlatoController::class, 'store']);
        Route::put('/admin/platos/{id}', [PlatoController::class, 'update']);
        Route::delete('/admin/platos/{id}', [PlatoController::class, 'destroy']);
        Route::get('/admin/categorias', [PlatoController::class, 'showCategorias']);
        Route::get('/admin/alergenos', [AlergenosController::class, 'show']);
        Route::get('/admin/platos/{id}', [PlatoController::class, 'index']);

        Route::post('/admin/alergenos', [AlergenosController::class, 'store']);
        Route::put('/admin/alergenos/{id}', [AlergenosController::class, 'update']);
        Route::delete('/admin/alergenos/{id}', [AlergenosController::class, 'destroy']);
        Route::get('/admin/alergenos/{id}', [AlergenosController::class, 'index']);

        Route::get('/admin/estadisticas', [EstadisticasController::class, 'ventasPorPlato']);

    });

});
