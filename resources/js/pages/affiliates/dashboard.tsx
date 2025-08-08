import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Affiliate {
    id: number;
    name: string;
    email: string;
    phone: string;
    referral_code: string;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason?: string;
    commission_rate: number;
    created_at: string;
}

interface Program {
    id: number;
    name: string;
    category: string;
    price: number;
    duration_weeks: number;
    location?: string;
}

interface Referral {
    id: number;
    student_name: string;
    student_email: string;
    commission_amount: number;
    status: string;
    created_at: string;
    program: Program;
}

interface Stats {
    total_referrals: number;
    confirmed_referrals: number;
    paid_referrals: number;
    total_commission: number;
    pending_commission: number;
}

interface Props {
    affiliate: Affiliate & { referrals: Referral[] };
    programs: Program[];
    referralLink: string;
    stats: Stats;
    [key: string]: unknown;
}

export default function AffiliateDashboard({ affiliate, referralLink, stats }: Props) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID');
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const statusText = {
            pending: '⏳ Pending',
            confirmed: '✅ Dikonfirmasi',
            paid: '💰 Dibayar',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak'
        };
        return statusText[status as keyof typeof statusText] || status;
    };

    if (affiliate.status === 'pending') {
        return (
            <AppShell>
                <Head title="Dashboard Affiliate" />
                
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 dark:bg-yellow-900/20 dark:border-yellow-800">
                            <div className="text-6xl mb-4">⏳</div>
                            <h1 className="text-2xl font-bold text-yellow-800 mb-2 dark:text-yellow-200">
                                Aplikasi Sedang Ditinjau
                            </h1>
                            <p className="text-yellow-700 mb-6 dark:text-yellow-300">
                                Terima kasih telah mendaftar sebagai affiliate English Booster! 
                                Tim kami sedang meninjau aplikasi Anda dan akan memberikan update dalam 1-3 hari kerja.
                            </p>
                            <div className="bg-white/50 rounded-lg p-4 text-left dark:bg-gray-800/50">
                                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Data Aplikasi Anda:</h3>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <div>📧 Email: {affiliate.email}</div>
                                    <div>📅 Tanggal Daftar: {formatDate(affiliate.created_at)}</div>
                                    <div>🔗 Kode Referral: {affiliate.referral_code}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    if (affiliate.status === 'rejected') {
        return (
            <AppShell>
                <Head title="Dashboard Affiliate" />
                
                <div className="max-w-4xl mx-auto p-6">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 dark:bg-red-900/20 dark:border-red-800">
                            <div className="text-6xl mb-4">❌</div>
                            <h1 className="text-2xl font-bold text-red-800 mb-2 dark:text-red-200">
                                Aplikasi Tidak Disetujui
                            </h1>
                            <p className="text-red-700 mb-4 dark:text-red-300">
                                Mohon maaf, aplikasi affiliate Anda tidak dapat disetujui saat ini.
                            </p>
                            {affiliate.rejection_reason && (
                                <div className="bg-white/50 rounded-lg p-4 mb-6 text-left dark:bg-gray-800/50">
                                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Alasan:</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{affiliate.rejection_reason}</p>
                                </div>
                            )}
                            <Link
                                href={route('affiliates.create')}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                📝 Daftar Ulang
                            </Link>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="Dashboard Affiliate" />
            
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                                🚀 Dashboard Affiliate
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Selamat datang, {affiliate.name}! Status: 
                                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(affiliate.status)}`}>
                                    {getStatusText(affiliate.status)}
                                </span>
                            </p>
                        </div>
                        <Link
                            href={route('referrals.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                        >
                            ➕ Buat Referral Baru
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_referrals}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Referral</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">✅</div>
                        <div className="text-2xl font-bold text-blue-600">{stats.confirmed_referrals}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Dikonfirmasi</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="text-2xl font-bold text-green-600">{stats.paid_referrals}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Dibayar</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">💸</div>
                        <div className="text-lg font-bold text-green-600">{formatPrice(stats.total_commission)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Komisi</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">⏳</div>
                        <div className="text-lg font-bold text-yellow-600">{formatPrice(stats.pending_commission)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Referral Link */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                            🔗 Link Referral Anda
                        </h2>
                        <p className="text-sm text-gray-600 mb-4 dark:text-gray-400">
                            Bagikan link ini untuk mendapat komisi {affiliate.commission_rate}% dari setiap pendaftaran
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <Button onClick={copyToClipboard} variant="outline">
                                {copied ? '✅ Tersalin' : '📋 Copy'}
                            </Button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                            ⚡ Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <Link
                                href={route('referrals.create')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                            >
                                ➕ Buat Referral Baru
                            </Link>
                            <Link
                                href={route('referrals.index')}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            >
                                📋 Lihat Semua Referral
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Referrals */}
                <div className="mt-8">
                    <div className="bg-white rounded-xl shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    📋 Referral Terbaru
                                </h2>
                                <Link
                                    href={route('referrals.index')}
                                    className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {affiliate.referrals.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Siswa</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Program</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Komisi</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {affiliate.referrals.slice(0, 5).map((referral) => (
                                                <tr key={referral.id} className="border-b border-gray-100 dark:border-gray-700">
                                                    <td className="py-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">{referral.student_name}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">{referral.student_email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-gray-900 dark:text-white">{referral.program.name}</td>
                                                    <td className="py-3 font-medium text-green-600">{formatPrice(referral.commission_amount)}</td>
                                                    <td className="py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(referral.status)}`}>
                                                            {getStatusText(referral.status)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(referral.created_at)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">📊</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">Belum Ada Referral</h3>
                                    <p className="text-gray-600 mb-4 dark:text-gray-400">
                                        Mulai buat referral pertama Anda untuk mendapatkan komisi!
                                    </p>
                                    <Link
                                        href={route('referrals.create')}
                                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                    >
                                        ➕ Buat Referral Pertama
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}