<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Program>
 */
class ProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['online', 'offline', 'group', 'branch'];
        $category = fake()->randomElement($categories);
        
        $programs = [
            'online' => [
                'Kids' => 500000,
                'Teen' => 600000,
                'TOEFL Easy Peasy' => 750000,
                'Private' => 1000000,
                'General English' => 550000,
                'Speaking Booster' => 400000,
                'Grammar Booster' => 350000,
            ],
            'offline' => [
                'Paket 2 minggu' => 800000,
                'Paket 1 bulan' => 1200000,
                'Paket 2 bulan' => 2000000,
                'Paket 3 bulan' => 2800000,
                'TOEFL RPL' => 1500000,
                'Kapal Pesiar' => 3000000,
            ],
            'group' => [
                'English Trip' => 2500000,
                'Special English Day' => 500000,
                'Tutor Visit' => 1500000,
            ],
            'branch' => [
                'Cilukba (Pre-school / TK)' => 400000,
                'Hompimpa (SD)' => 450000,
                'Hip Hip Hurray (SMP)' => 500000,
                'Insight Out (SMA)' => 600000,
            ],
        ];

        $categoryPrograms = $programs[$category];
        $programName = fake()->randomElement(array_keys($categoryPrograms));
        $price = $categoryPrograms[$programName];

        return [
            'name' => $programName,
            'category' => $category,
            'description' => fake()->paragraph(),
            'price' => $price,
            'duration_weeks' => fake()->numberBetween(2, 12),
            'location' => $category === 'offline' ? 'Pare, Kediri' : 
                        ($category === 'branch' ? fake()->randomElement(['Malang', 'Sidoarjo', 'Nganjuk']) : null),
            'is_active' => true,
        ];
    }
}