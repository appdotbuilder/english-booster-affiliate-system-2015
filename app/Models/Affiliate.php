<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Affiliate
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string|null $address
 * @property string|null $bank_name
 * @property string|null $bank_account_number
 * @property string|null $bank_account_name
 * @property string $referral_code
 * @property string|null $motivation
 * @property string $status
 * @property string|null $rejection_reason
 * @property float $commission_rate
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Referral> $referrals
 * @property-read int|null $referrals_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereBankAccountName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereBankAccountNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereBankName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereMotivation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereReferralCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Affiliate approved()
 * @method static \Database\Factories\AffiliateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Affiliate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'bank_name',
        'bank_account_number',
        'bank_account_name',
        'referral_code',
        'motivation',
        'status',
        'rejection_reason',
        'commission_rate',
        'approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'commission_rate' => 'decimal:2',
        'approved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the affiliate.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the referrals for the affiliate.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class);
    }

    /**
     * Scope a query to only include pending affiliates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved affiliates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Get the total commission earned by this affiliate.
     *
     * @return float
     */
    public function getTotalCommissionAttribute(): float
    {
        return $this->referrals()->where('status', 'paid')->sum('commission_amount');
    }

    /**
     * Get the pending commission for this affiliate.
     *
     * @return float
     */
    public function getPendingCommissionAttribute(): float
    {
        return $this->referrals()->whereIn('status', ['pending', 'confirmed'])->sum('commission_amount');
    }
}