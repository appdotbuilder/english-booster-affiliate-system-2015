<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAffiliateRequest;
use App\Models\Affiliate;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    /**
     * Display a listing of affiliates (Admin only).
     */
    public function index(Request $request)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $affiliates = Affiliate::with('user')
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('affiliates/index', [
            'affiliates' => $affiliates,
            'filters' => $request->only('status'),
        ]);
    }

    /**
     * Show the form for creating a new affiliate.
     */
    public function create()
    {
        return Inertia::render('affiliates/create');
    }

    /**
     * Store a newly created affiliate.
     */
    public function store(StoreAffiliateRequest $request)
    {
        $user = auth()->user();
        
        // Check if user already has an affiliate application
        if ($user->affiliate) {
            return back()->withErrors(['error' => 'Anda sudah memiliki aplikasi afiliasi.']);
        }

        $data = $request->validated();
        $data['user_id'] = $user->id;
        do {
            $code = strtoupper(Str::random(8));
        } while (Affiliate::where('referral_code', $code)->exists());
        
        $data['referral_code'] = $code;

        Affiliate::create($data);

        // Update user role
        $user->update(['role' => 'affiliate']);

        return redirect()->route('dashboard')->with('success', 'Aplikasi afiliasi berhasil dikirim. Menunggu persetujuan admin.');
    }

    /**
     * Display the specified affiliate.
     */
    public function show(Affiliate $affiliate)
    {
        if (!auth()->user()->isAdmin() && auth()->id() !== $affiliate->user_id) {
            abort(403);
        }

        $affiliate->load(['user', 'referrals.program']);

        return Inertia::render('affiliates/show', [
            'affiliate' => $affiliate,
            'stats' => [
                'total_referrals' => $affiliate->referrals->count(),
                'confirmed_referrals' => $affiliate->referrals->where('status', 'confirmed')->count(),
                'paid_referrals' => $affiliate->referrals->where('status', 'paid')->count(),
                'total_commission' => $affiliate->total_commission,
                'pending_commission' => $affiliate->pending_commission,
            ],
        ]);
    }

    /**
     * Update the specified affiliate (approve/reject).
     */
    public function update(Request $request, Affiliate $affiliate)
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $action = $request->input('action');
        
        if ($action === 'approve') {
            $affiliate->update([
                'status' => 'approved',
                'approved_at' => now(),
            ]);
            return back()->with('success', 'Afiliasi berhasil disetujui.');
        }
        
        if ($action === 'reject') {
            $request->validate([
                'rejection_reason' => 'required|string|max:1000',
            ]);

            $affiliate->update([
                'status' => 'rejected',
                'rejection_reason' => $request->rejection_reason,
            ]);
            return back()->with('success', 'Afiliasi berhasil ditolak.');
        }

        return back()->withErrors(['error' => 'Invalid action']);
    }




}