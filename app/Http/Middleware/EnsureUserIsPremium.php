<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsPremium
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
             return redirect()->route('login');
        }

        if (! $request->user()->is_premium) {
            return redirect()->route('subscription')->with('error', 'This tool requires a Premium subscription.');
        }

        return $next($request);
    }
}
