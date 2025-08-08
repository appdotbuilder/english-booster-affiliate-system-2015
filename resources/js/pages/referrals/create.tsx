import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';

interface Program {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    duration_weeks: number;
    location?: string;
}



interface Props {
    programs: Program[];
    [key: string]: unknown;
}

export default function CreateReferral({ programs }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        program_id: '',
        student_name: '',
        student_email: '',
        student_phone: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('referrals.store'));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const selectedProgram = programs.find(p => p.id.toString() === data.program_id);
    const expectedCommission = selectedProgram ? selectedProgram.price * 0.1 : 0;

    const categoryIcons = {
        online: '💻',
        offline: '🏫',
        group: '👥',
        branch: '🌟'
    };

    const programsByCategory = programs.reduce((acc, program) => {
        if (!acc[program.category]) {
            acc[program.category] = [];
        }
        acc[program.category].push(program);
        return acc;
    }, {} as Record<string, Program[]>);

    return (
        <AppShell>
            <Head title="Buat Referral Baru" />
            
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                        ➕ Buat Referral Baru
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Referensikan siswa baru ke program English Booster dan dapatkan komisi 10%
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Program Selection */}
                            <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📚 Pilih Program</h2>
                                
                                <div>
                                    <Label htmlFor="program_id">Program *</Label>
                                    <Select onValueChange={(value) => setData('program_id', value)} value={data.program_id}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih program yang akan direferensikan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(programsByCategory).map(([category, categoryPrograms]) => (
                                                <div key={category}>
                                                    <div className="px-2 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center">
                                                        <span className="mr-2">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </div>
                                                    {categoryPrograms.map((program) => (
                                                        <SelectItem key={program.id} value={program.id.toString()}>
                                                            <div className="flex items-center justify-between w-full">
                                                                <span>{program.name}</span>
                                                                <span className="ml-2 text-green-600 font-medium">
                                                                    {formatPrice(program.price)}
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </div>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.program_id} />
                                </div>

                                {/* Program Details */}
                                {selectedProgram && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                                        <div className="flex items-start">
                                            <span className="text-blue-600 mr-3 text-xl">
                                                {categoryIcons[selectedProgram.category as keyof typeof categoryIcons]}
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-blue-900 dark:text-blue-100">{selectedProgram.name}</h3>
                                                <p className="text-sm text-blue-800 mt-1 dark:text-blue-200">{selectedProgram.description}</p>
                                                <div className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                                                    <div>💰 Harga: {formatPrice(selectedProgram.price)}</div>
                                                    <div>📅 Durasi: {selectedProgram.duration_weeks} minggu</div>
                                                    {selectedProgram.location && (
                                                        <div>📍 Lokasi: {selectedProgram.location}</div>
                                                    )}
                                                    <div className="font-medium text-green-700 dark:text-green-300">
                                                        💸 Komisi Anda: {formatPrice(expectedCommission)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Student Information */}
                            <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">👤 Data Siswa</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="student_name">Nama Lengkap Siswa *</Label>
                                        <Input
                                            id="student_name"
                                            type="text"
                                            value={data.student_name}
                                            onChange={e => setData('student_name', e.target.value)}
                                            placeholder="Masukkan nama lengkap siswa"
                                        />
                                        <InputError message={errors.student_name} />
                                    </div>

                                    <div>
                                        <Label htmlFor="student_email">Email Siswa *</Label>
                                        <Input
                                            id="student_email"
                                            type="email"
                                            value={data.student_email}
                                            onChange={e => setData('student_email', e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.student_email} />
                                    </div>

                                    <div>
                                        <Label htmlFor="student_phone">Nomor Telepon Siswa *</Label>
                                        <Input
                                            id="student_phone"
                                            type="text"
                                            value={data.student_phone}
                                            onChange={e => setData('student_phone', e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                        <InputError message={errors.student_phone} />
                                    </div>

                                    <div>
                                        <Label htmlFor="notes">Catatan Tambahan</Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={e => setData('notes', e.target.value)}
                                            placeholder="Informasi tambahan tentang siswa atau kebutuhan khusus (opsional)"
                                            rows={3}
                                        />
                                        <InputError message={errors.notes} />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? '🔄 Mengirim...' : '✅ Buat Referral'}
                                </Button>
                                
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="flex-1"
                                >
                                    ← Kembali
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Commission Info */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
                                <div className="text-green-600 text-2xl mb-3">💰</div>
                                <h3 className="font-semibold text-green-900 mb-2 dark:text-green-100">
                                    Informasi Komisi
                                </h3>
                                <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                                    <li>✅ Komisi: 10% dari harga program</li>
                                    <li>✅ Dibayar setelah siswa konfirmasi</li>
                                    <li>✅ Transfer ke rekening Anda</li>
                                    <li>✅ Laporan real-time di dashboard</li>
                                </ul>
                                {expectedCommission > 0 && (
                                    <div className="mt-3 p-2 bg-green-100 rounded border border-green-300 dark:bg-green-800/50 dark:border-green-700">
                                        <div className="text-sm text-green-700 dark:text-green-300">Komisi yang akan diterima:</div>
                                        <div className="font-bold text-green-800 dark:text-green-200">
                                            {formatPrice(expectedCommission)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Process Info */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
                                <div className="text-blue-600 text-2xl mb-3">📋</div>
                                <h3 className="font-semibold text-blue-900 mb-2 dark:text-blue-100">
                                    Proses Selanjutnya
                                </h3>
                                <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                                    <li>1️⃣ Anda buat referral</li>
                                    <li>2️⃣ Tim menghubungi siswa</li>
                                    <li>3️⃣ Siswa konfirmasi pendaftaran</li>
                                    <li>4️⃣ Komisi Anda diproses</li>
                                    <li>5️⃣ Pembayaran ke rekening</li>
                                </ol>
                            </div>

                            {/* Tips */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                                <div className="text-yellow-600 text-2xl mb-3">💡</div>
                                <h3 className="font-semibold text-yellow-900 mb-2 dark:text-yellow-100">
                                    Tips Sukses
                                </h3>
                                <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                                    <li>💬 Jelaskan benefit program dengan jelas</li>
                                    <li>🎯 Pilih program yang sesuai kebutuhan</li>
                                    <li>📞 Pastikan nomor telepon aktif</li>
                                    <li>✉️ Gunakan email yang sering dicek</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}