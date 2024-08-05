<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class MyWelcomesNewUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->user) {
            abort(Response::HTTP_FORBIDDEN, Lang::get('Could not find a user to be welcomed.'));
        }

        if (is_null($request->user->welcome_valid_until)) {
            return abort(Response::HTTP_FORBIDDEN, Lang::get('The welcome link has already been used.'));
        }

        if (Carbon::create($request->user->welcome_valid_until)->isPast()) {
            return abort(Response::HTTP_FORBIDDEN, Lang::get('The welcome link has expired.'));
        }

        return $next($request);
    }
}
