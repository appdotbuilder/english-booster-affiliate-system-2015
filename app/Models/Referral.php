<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Referral
 *
 * @property int $id
 * @property int $affiliate_id
 * @property int $program_id
 * @property string $student_name
 * @property string $student_email
 * @property string $student_phone
 * @property float $program_price
 * @property float $commission_amount
 * @property float $commission_rate
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $confirmed_at
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Affiliate $affiliate
 * @property-read \App\Models\Program $program
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Referral newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral query()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereAffiliateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCommissionAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral wherePaidAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereProgramId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereProgramPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStudentEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereStudentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Referral pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral confirmed()
 * @method static \Illuminate\Database\Eloquent\Builder|Referral paid()
 * @method static \Database\Factories\ReferralFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Referral extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'affiliate_id',
        'program_id',
        'student_name',
        'student_email',
        'student_phone',
        'program_price',
        'commission_amount',
        'commission_rate',
        'status',
        'confirmed_at',
        'paid_at',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'program_price' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'confirmed_at' => 'datetime',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the affiliate that owns the referral.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Get the program that was referred.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /**
     * Scope a query to only include pending referrals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include confirmed referrals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope a query to only include paid referrals.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }
}