<?php
namespace App\Http\Controllers;

class HomeController extends Controller
{   //devuelve la vista de inicio
    public function index()
    {
        return view('home');
    }
}
