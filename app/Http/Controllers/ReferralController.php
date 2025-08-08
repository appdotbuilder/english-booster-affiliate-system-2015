<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReferralRequest;
use App\Models\Program;
use App\Models\Referral;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReferralController extends Controller
{
    /**
     * Display a listing of referrals.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $referrals = Referral::with(['affiliate.user', 'program'])
                ->when($request->status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->latest()
                ->paginate(10);
        } else {
            $referrals = $user->affiliate?->referrals()
                ->with('program')
                ->when($request->status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->latest()
                ->paginate(10) ?? collect();
        }

        return Inertia::render('referrals/index', [
            'referrals' => $referrals,
            'filters' => $request->only('status'),
        ]);
    }

    /**
     * Show the form for creating a new referral.
     */
    public function create()
    {
        $user = auth()->user();
        
        if (!$user->affiliate || $user->affiliate->status !== 'approved') {
            return redirect()->route('affiliates.dashboard')
                ->withErrors(['error' => 'Anda harus menjadi afiliasi yang disetujui untuk membuat referral.']);
        }

        $programs = Program::active()->get();

        return Inertia::render('referrals/create', [
            'programs' => $programs,
        ]);
    }

    /**
     * Store a newly created referral.
     */
    public function store(StoreReferralRequest $request)
    {
        $user = auth()->user();
        
        if (!$user->affiliate || $user->affiliate->status !== 'approved') {
            return back()->withErrors(['error' => 'Anda harus menjadi afiliasi yang disetujui untuk membuat referral.']);
        }

        $data = $request->validated();
        $program = Program::findOrFail($data['program_id']);
        
        $data['affiliate_id'] = $user->affiliate->id;
        $data['program_price'] = $program->price;
        $data['commission_rate'] = $user->affiliate->commission_rate;
        $data['commission_amount'] = $program->price * ($user->affiliate->commission_rate / 100);

        Referral::create($data);

        return redirect()->route('referrals.index')->with('success', 'Referral berhasil dibuat.');
    }

    /**
     * Display the specified referral.
     */
    public function show(Referral $referral)
    {
        $user = auth()->user();
        
        if (!$user->isAdmin() && $referral->affiliate_id !== $user->affiliate?->id) {
            abort(403);
        }

        $referral->load(['affiliate.user', 'program']);

        return Inertia::render('referrals/show', [
            'referral' => $referral,
        ]);
    }

    /**
     * Update the specified referral (confirm).
     */
    public function update(Request $request, Referral $referral)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $action = $request->input('action');
        
        if ($action === 'confirm') {
            $referral->update([
                'status' => 'confirmed',
                'confirmed_at' => now(),
            ]);
            return back()->with('success', 'Referral berhasil dikonfirmasi.');
        }
        
        if ($action === 'mark_paid') {
            $referral->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);
            return back()->with('success', 'Komisi berhasil dibayar.');
        }

        return back()->withErrors(['error' => 'Invalid action']);
    }
}