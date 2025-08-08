<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Program;
use App\Models\Referral;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $programs = Program::active()->get()->groupBy('category');
        
        $stats = [
            'total_affiliates' => Affiliate::approved()->count(),
            'total_programs' => Program::active()->count(),
            'total_referrals' => Referral::count(),
        ];

        return Inertia::render('welcome', [
            'programs' => $programs,
            'stats' => $stats,
            'contact' => [
                'name' => 'English Booster',
                'address' => 'Jl. Asparaga No.100 Tegalsari, Tulungrejo, Pare, Kediri',
                'instagram' => '@kampunginggrisbooster',
                'phone' => '082231050500',
            ],
        ]);
    }
}