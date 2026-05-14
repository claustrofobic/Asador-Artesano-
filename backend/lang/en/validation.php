<?php

return [
    'required'  => 'El campo :attribute es obligatorio.',
    'email'     => 'El campo :attribute debe ser una dirección de correo válida.',
    'confirmed' => 'La confirmación de :attribute no coincide.',
    'unique'    => 'El :attribute ya está en uso.',

    'min' => [
        'array'   => 'El campo :attribute debe tener al menos :min elementos.',
        'file'    => 'El campo :attribute debe tener al menos :min kilobytes.',
        'numeric' => 'El campo :attribute debe ser al menos :min.',
        'string'  => 'El campo :attribute debe tener al menos :min caracteres.',
    ],

    'max' => [
        'array'   => 'El campo :attribute no debe tener más de :max elementos.',
        'file'    => 'El campo :attribute no debe tener más de :max kilobytes.',
        'numeric' => 'El campo :attribute no debe ser mayor de :max.',
        'string'  => 'El campo :attribute no debe tener más de :max caracteres.',
    ],

    'attributes' => [
        'email'    => 'correo electrónico',
        'password' => 'contraseña',
        'name'     => 'nombre',
    ],
];
