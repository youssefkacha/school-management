<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
        'api/*'
        //hadi tanhaydo biha verification ta3 crsf ;ya3ni nhaydo verification 3la les routes li fihom api
    ];
}
