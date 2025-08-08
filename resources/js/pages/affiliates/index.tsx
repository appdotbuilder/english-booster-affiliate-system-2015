import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Affiliate {
    id: number;
    name: string;
    email: string;
    phone: string;
    referral_code: string;
    status: 'pending' | 'approved' | 'rejected';
    commission_rate: number;
    created_at: string;
    user: User;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    affiliates: PaginatedData<Affiliate>;
    filters: {
        status?: string;
    };
    [key: string]: unknown;
}

export default function AffiliateIndex({ affiliates, filters }: Props) {
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [searchQuery, setSearchQuery] = useState('');

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        router.get(route('affiliates.index'), 
            { status: status === 'all' ? '' : status },
            { 
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleApprove = (affiliate: Affiliate) => {
        if (confirm(`Setujui aplikasi affiliate ${affiliate.name}?`)) {
            router.patch(route('affiliates.update', affiliate.id), {
                action: 'approve'
            }, {
                preserveScroll: true,
            });
        }
    };

    const handleReject = (affiliate: Affiliate) => {
        const reason = prompt(`Masukkan alasan penolakan untuk ${affiliate.name}:`);
        if (reason) {
            router.patch(route('affiliates.update', affiliate.id), {
                action: 'reject',
                rejection_reason: reason
            }, {
                preserveScroll: true,
            });
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const statusText = {
            pending: '⏳ Pending',
            approved: '✅ Disetujui',
            rejected: '❌ Ditolak'
        };
        return statusText[status as keyof typeof statusText] || status;
    };



    const filteredAffiliates = affiliates.data.filter(affiliate => {
        if (!searchQuery) return true;
        return affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               affiliate.email.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const statusCounts = {
        all: affiliates.data.length,
        pending: affiliates.data.filter(a => a.status === 'pending').length,
        approved: affiliates.data.filter(a => a.status === 'approved').length,
        rejected: affiliates.data.filter(a => a.status === 'rejected').length,
    };

    return (
        <AppShell>
            <Head title="Manajemen Affiliate" />
            
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
                        👥 Manajemen Affiliate
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola aplikasi dan status affiliate English Booster
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">👥</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts.all}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Affiliate</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">⏳</div>
                        <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Menunggu Review</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">✅</div>
                        <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Aktif</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="text-2xl mb-2">❌</div>
                        <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Ditolak</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="🔍 Cari affiliate..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="w-48">
                            <Select onValueChange={handleStatusFilter} value={statusFilter || 'all'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">🔄 Semua Status</SelectItem>
                                    <SelectItem value="pending">⏳ Pending</SelectItem>
                                    <SelectItem value="approved">✅ Disetujui</SelectItem>
                                    <SelectItem value="rejected">❌ Ditolak</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Affiliate Table */}
                <div className="bg-white rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Daftar Affiliate ({filteredAffiliates.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Affiliate</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Kode Referral</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Daftar</th>
                                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredAffiliates.map((affiliate) => (
                                    <tr key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900">
                                                    <span className="text-blue-600 font-semibold dark:text-blue-400">
                                                        {affiliate.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {affiliate.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {affiliate.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono dark:bg-gray-700">
                                                {affiliate.referral_code}
                                            </code>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(affiliate.status)}`}>
                                                {getStatusText(affiliate.status)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(affiliate.created_at)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={route('affiliates.show', affiliate.id)}
                                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium dark:text-blue-400"
                                                >
                                                    👁️ Lihat
                                                </Link>
                                                
                                                {affiliate.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleApprove(affiliate)}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs"
                                                        >
                                                            ✅ Setujui
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleReject(affiliate)}
                                                            className="border-red-300 text-red-600 hover:bg-red-50 px-3 py-1 text-xs dark:border-red-700 dark:text-red-400"
                                                        >
                                                            ❌ Tolak
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAffiliates.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">
                                Tidak ada affiliate ditemukan
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Coba ubah filter pencarian Anda
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {affiliates.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Menampilkan {affiliates.data.length} dari {affiliates.total} affiliate
                                </div>
                                <div className="flex items-center space-x-2">
                                    {affiliates.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}