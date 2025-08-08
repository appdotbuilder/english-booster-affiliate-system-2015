import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';



export default function CreateAffiliate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        bank_name: '',
        bank_account_number: '',
        bank_account_name: '',
        motivation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('affiliates.store'));
    };

    return (
        <AppShell>
            <Head title="Daftar Affiliate" />
            
            <div className="max-w-2xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                        🚀 Daftar Sebagai Affiliate
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Bergabunglah dengan program affiliate English Booster dan mulai dapatkan komisi menarik!
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 dark:bg-blue-900/20 dark:border-blue-800">
                    <div className="flex items-start">
                        <span className="text-blue-500 mr-3 text-xl">💡</span>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Keuntungan Menjadi Affiliate:</h3>
                            <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                <li>✅ Komisi 10% untuk setiap referral yang berhasil</li>
                                <li>✅ Link referral unik untuk tracking</li>
                                <li>✅ Dashboard monitoring real-time</li>
                                <li>✅ Pembayaran komisi tepat waktu</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">📋 Data Diri</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="phone">Nomor Telepon *</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    placeholder="08xxxxxxxxxx"
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                id="address"
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                                placeholder="Alamat lengkap (opsional)"
                                rows={3}
                            />
                            <InputError message={errors.address} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">🏦 Informasi Bank</h2>
                        <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">
                            Informasi ini diperlukan untuk pembayaran komisi (opsional, bisa diisi nanti)
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="bank_name">Nama Bank</Label>
                                <Input
                                    id="bank_name"
                                    type="text"
                                    value={data.bank_name}
                                    onChange={e => setData('bank_name', e.target.value)}
                                    placeholder="BCA, BRI, Mandiri, dll"
                                />
                                <InputError message={errors.bank_name} />
                            </div>

                            <div>
                                <Label htmlFor="bank_account_number">Nomor Rekening</Label>
                                <Input
                                    id="bank_account_number"
                                    type="text"
                                    value={data.bank_account_number}
                                    onChange={e => setData('bank_account_number', e.target.value)}
                                    placeholder="1234567890"
                                />
                                <InputError message={errors.bank_account_number} />
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="bank_account_name">Nama Pemilik Rekening</Label>
                                <Input
                                    id="bank_account_name"
                                    type="text"
                                    value={data.bank_account_name}
                                    onChange={e => setData('bank_account_name', e.target.value)}
                                    placeholder="Nama sesuai rekening bank"
                                />
                                <InputError message={errors.bank_account_name} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">💪 Motivasi</h2>
                        
                        <div>
                            <Label htmlFor="motivation">Mengapa Anda ingin menjadi affiliate English Booster? *</Label>
                            <Textarea
                                id="motivation"
                                value={data.motivation}
                                onChange={e => setData('motivation', e.target.value)}
                                placeholder="Ceritakan motivasi Anda bergabung dengan program affiliate ini (minimal 50 karakter)"
                                rows={4}
                            />
                            <InputError message={errors.motivation} />
                            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                                {data.motivation.length}/50 karakter minimum
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            {processing ? '🔄 Mengirim...' : '🚀 Kirim Aplikasi'}
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

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
                        <div className="flex items-start">
                            <span className="text-yellow-600 mr-3 text-xl">⚠️</span>
                            <div>
                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Catatan Penting:</h4>
                                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                    Aplikasi Anda akan ditinjau oleh tim admin dalam 1-3 hari kerja. 
                                    Anda akan mendapat notifikasi melalui email tentang status aplikasi.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}