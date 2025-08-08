<?php

namespace Database\Factories;

use App\Models\Affiliate;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Referral>
 */
class ReferralFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $affiliate = Affiliate::factory()->approved()->create();
        $program = Program::factory()->create();
        
        $commissionAmount = $program->price * ($affiliate->commission_rate / 100);

        return [
            'affiliate_id' => $affiliate->id,
            'program_id' => $program->id,
            'student_name' => fake()->name(),
            'student_email' => fake()->unique()->safeEmail(),
            'student_phone' => fake()->phoneNumber(),
            'program_price' => $program->price,
            'commission_amount' => $commissionAmount,
            'commission_rate' => $affiliate->commission_rate,
            'status' => fake()->randomElement(['pending', 'confirmed', 'paid']),
            'notes' => fake()->optional()->paragraph(),
        ];
    }

    /**
     * Indicate that the referral is confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
            'confirmed_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the referral is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'confirmed_at' => fake()->dateTimeBetween('-1 month', '-1 week'),
            'paid_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}