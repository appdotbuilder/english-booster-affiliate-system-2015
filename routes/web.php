<?php

use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReferralController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Dashboard route - redirect based on user role
Route::get('/dashboard', function () {
    $user = auth()->user();
    
    if ($user->isAdmin()) {
        return redirect()->route('affiliates.index');
    }
    
    if ($user->role === 'affiliate') {
        return app(DashboardController::class)->index();
    }
    
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Affiliate routes
Route::middleware('auth')->group(function () {
    Route::get('/affiliate/apply', [AffiliateController::class, 'create'])->name('affiliates.create');
    Route::post('/affiliate/apply', [AffiliateController::class, 'store'])->name('affiliates.store');
    Route::get('/affiliate/dashboard', [DashboardController::class, 'index'])->name('affiliates.dashboard');
    
    // Admin only routes
    Route::group(['middleware' => function ($request, $next) {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized. Admin access required.');
        }
        return $next($request);
    }], function () {
        Route::get('/affiliates', [AffiliateController::class, 'index'])->name('affiliates.index');
        Route::get('/affiliates/{affiliate}', [AffiliateController::class, 'show'])->name('affiliates.show');
        Route::resource('affiliates', AffiliateController::class)->only(['index', 'show', 'update']);
        Route::resource('referrals', ReferralController::class)->only(['index', 'show', 'update']);
    });
});

// Referral routes
Route::middleware('auth')->group(function () {
    Route::resource('referrals', ReferralController::class)->except(['edit', 'update', 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';