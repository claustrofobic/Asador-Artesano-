<?php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

// ── Rutas públicas ──────────────────────────────────────
//inicio
Route::get('/',              [HomeController::class,  'index'])->name('home');
//quienes somos
Route::get('/quienes-somos', [AboutController::class, 'index'])->name('about');
//menu
Route::get('/carta',         [MenuController::class,  'index'])->name('menu');

// ── Auth ────────────────────────────────────────────────
//login
Route::get( '/login',    [LoginController::class,    'showForm'])->name('login');
//mandar los datos del login
Route::post('/login',    [LoginController::class,    'login']);
//procesa el logout
Route::post('/logout',   [LoginController::class,    'logout'])->name('logout');
//registrarse
Route::get( '/registro', [RegisterController::class, 'showForm'])->name('register');
//manda los datos del registro
Route::post('/registro', [RegisterController::class, 'register']);

// ── Rutas privadas (requieren login) ────────────────────
//comprueba si existe el login
Route::middleware('auth')->group(function () {
    Route::get('/mis-pedidos',   [OrderController::class, 'index'])->name('orders.index');
    Route::post('/mis-pedidos',  [OrderController::class, 'store'])->name('orders.store');
});

// "Haz tu pedido" redirige a login si no estás autenticado,
// o a la carta si lo estás
Route::get('/haz-tu-pedido', function () {
    return auth()->check()
    //comprueba si estás logueado, si lo estás -> menu
        ? redirect()->route('menu')
        //si no lo estás -> login
        : redirect()->route('login');
})->name('order.cta');
