<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $programs = [
            // Online Programs
            [
                'name' => 'Kids',
                'category' => 'online',
                'description' => 'Program bahasa Inggris khusus untuk anak-anak usia 4-10 tahun',
                'price' => 500000,
                'duration_weeks' => 4,
                'location' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Teen',
                'category' => 'online',
                'description' => 'Program bahasa Inggris untuk remaja usia 11-17 tahun',
                'price' => 600000,
                'duration_weeks' => 6,
                'location' => null,
                'is_active' => true,
            ],
            [
                'name' => 'TOEFL Easy Peasy',
                'category' => 'online',
                'description' => 'Persiapan TOEFL yang mudah dan efektif',
                'price' => 750000,
                'duration_weeks' => 8,
                'location' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Private',
                'category' => 'online',
                'description' => 'Kelas privat one-on-one dengan tutor berpengalaman',
                'price' => 1000000,
                'duration_weeks' => 4,
                'location' => null,
                'is_active' => true,
            ],
            [
                'name' => 'General English',
                'category' => 'online',
                'description' => 'Kelas bahasa Inggris umum untuk semua level',
                'price' => 550000,
                'duration_weeks' => 6,
                'location' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Speaking Booster',
                'category' => 'online',
                'description' => 'Fokus pada peningkatan kemampuan berbicara',
                'price' => 400000,
                'duration_weeks' => 4,
                'location' => null,
                'is_active' => true,
            ],
            [
                'name' => 'Grammar Booster',
                'category' => 'online',
                'description' => 'Penguasaan tata bahasa Inggris yang komprehensif',
                'price' => 350000,
                'duration_weeks' => 4,
                'location' => null,
                'is_active' => true,
            ],
            
            // Offline Programs (Pare)
            [
                'name' => 'Paket 2 minggu',
                'category' => 'offline',
                'description' => 'Program intensif 2 minggu di Pare, Kediri',
                'price' => 800000,
                'duration_weeks' => 2,
                'location' => 'Pare, Kediri',
                'is_active' => true,
            ],
            [
                'name' => 'Paket 1 bulan',
                'category' => 'offline',
                'description' => 'Program intensif 1 bulan di Pare, Kediri',
                'price' => 1200000,
                'duration_weeks' => 4,
                'location' => 'Pare, Kediri',
                'is_active' => true,
            ],
            [
                'name' => 'Paket 2 bulan',
                'category' => 'offline',
                'description' => 'Program intensif 2 bulan di Pare, Kediri',
                'price' => 2000000,
                'duration_weeks' => 8,
                'location' => 'Pare, Kediri',
                'is_active' => true,
            ],
            [
                'name' => 'Paket 3 bulan',
                'category' => 'offline',
                'description' => 'Program intensif 3 bulan di Pare, Kediri',
                'price' => 2800000,
                'duration_weeks' => 12,
                'location' => 'Pare, Kediri',
                'is_active' => true,
            ],
            [
                'name' => 'TOEFL RPL',
                'category' => 'offline',
                'description' => 'Persiapan TOEFL intensif di Pare',
                'price' => 1500000,
                'duration_weeks' => 6,
                'location' => 'Pare, Kediri',
                'is_active' => true,
            ],
            [
                'name' => 'Kapal Pesiar',
                'category' => 'offline',
                'description' => 'Program persiapan kerja di kapal pesiar',
                'price' => 3000000,
                'duration_weeks' => 12,
                'location' => 'Pare, Kediri',
                'is_active' => true,
            ],
            
            // Group Programs
            [
                'name' => 'English Trip',
                'category' => 'group',
                'description' => 'Program wisata sambil belajar bahasa Inggris',
                'price' => 2500000,
                'duration_weeks' => 1,
                'location' => 'Various',
                'is_active' => true,
            ],
            [
                'name' => 'Special English Day',
                'category' => 'group',
                'description' => 'Acara khusus satu hari penuh bahasa Inggris',
                'price' => 500000,
                'duration_weeks' => 1,
                'location' => 'Various',
                'is_active' => true,
            ],
            [
                'name' => 'Tutor Visit',
                'category' => 'group',
                'description' => 'Tutor datang ke lokasi untuk mengajar kelompok',
                'price' => 1500000,
                'duration_weeks' => 4,
                'location' => 'Client Location',
                'is_active' => true,
            ],
            
            // Branch Programs
            [
                'name' => 'Cilukba (Pre-school / TK)',
                'category' => 'branch',
                'description' => 'Program untuk anak prasekolah dan TK',
                'price' => 400000,
                'duration_weeks' => 4,
                'location' => 'Branch Offices',
                'is_active' => true,
            ],
            [
                'name' => 'Hompimpa (SD)',
                'category' => 'branch',
                'description' => 'Program untuk siswa sekolah dasar',
                'price' => 450000,
                'duration_weeks' => 4,
                'location' => 'Branch Offices',
                'is_active' => true,
            ],
            [
                'name' => 'Hip Hip Hurray (SMP)',
                'category' => 'branch',
                'description' => 'Program untuk siswa sekolah menengah pertama',
                'price' => 500000,
                'duration_weeks' => 6,
                'location' => 'Branch Offices',
                'is_active' => true,
            ],
            [
                'name' => 'Insight Out (SMA)',
                'category' => 'branch',
                'description' => 'Program untuk siswa sekolah menengah atas',
                'price' => 600000,
                'duration_weeks' => 6,
                'location' => 'Branch Offices',
                'is_active' => true,
            ],
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }
    }
}