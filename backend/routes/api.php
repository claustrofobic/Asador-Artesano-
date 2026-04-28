<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FavoritoController;

// ── Rutas públicas ──────────────────────────────────────
Route::get('/platos',      [MenuController::class,  'index']);
Route::get('/platos/{id}', [MenuController::class,  'show']);

// ── Auth ────────────────────────────────────────────────
Route::post('/login',    [LoginController::class,  'login']);
Route::post('/registro', [RegisterController::class, 'register']);

// ── Rutas privadas (requieren login) ────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/mis-pedidos',  [OrderController::class, 'index']);
    Route::post('/mis-pedidos', [OrderController::class, 'store']);
    Route::get('/favoritos',    [FavoritoController::class, 'index']);
    Route::post('/favoritos',   [FavoritoController::class, 'store']);
    Route::delete('/favoritos/{id}', [FavoritoController::class, 'destroy']);
    Route::post('/logout',      [LoginController::class, 'logout']);
});
