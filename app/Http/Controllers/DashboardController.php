<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the affiliate dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if (!$user->affiliate) {
            return Inertia::render('affiliates/create');
        }

        $affiliate = $user->affiliate->load('referrals.program');
        $programs = Program::active()->get();

        $referralLink = url('/register?ref=' . $affiliate->referral_code);

        return Inertia::render('affiliates/dashboard', [
            'affiliate' => $affiliate,
            'programs' => $programs,
            'referralLink' => $referralLink,
            'stats' => [
                'total_referrals' => $affiliate->referrals->count(),
                'confirmed_referrals' => $affiliate->referrals->where('status', 'confirmed')->count(),
                'paid_referrals' => $affiliate->referrals->where('status', 'paid')->count(),
                'total_commission' => $affiliate->total_commission,
                'pending_commission' => $affiliate->pending_commission,
            ],
        ]);
    }
}