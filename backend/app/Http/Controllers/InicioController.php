<?php
namespace App\Http\Controllers;

class HomeController extends Controller
{   //devuelve la vista de inicio
    public function index()
    {   //devuelve la vista de home
        return view('home');
    }
}
