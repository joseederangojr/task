<?php

namespace App\Http\Middleware\ConvertCase;

use Closure;
use Illuminate\Http\Request;

class ConvertRequestToSnakeCase
{
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $request->replace(
            resolve(KeyCaseConverter::class)->convert(
                KeyCaseConverter::CASE_SNAKE,
                $request->all()
            )
        );

        return $next($request);
    }
}
