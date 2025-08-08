import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Program {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    duration_weeks: number;
    location: string | null;
}

interface Props extends SharedData {
    programs: {
        online: Program[];
        offline: Program[];
        group: Program[];
        branch: Program[];
    };
    stats: {
        total_affiliates: number;
        total_programs: number;
        total_referrals: number;
    };
    contact: {
        name: string;
        address: string;
        instagram: string;
        phone: string;
    };
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth, programs, stats, contact } = usePage<Props>().props;

    const categoryIcons = {
        online: '💻',
        offline: '🏫',
        group: '👥',
        branch: '🌟'
    };

    const categoryNames = {
        online: 'Program Online',
        offline: 'Program Offline (Pare)',
        group: 'Program Rombongan',
        branch: 'Program Cabang'
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <>
            <Head title="English Booster - Affiliate Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 text-white p-2 rounded-lg">
                                    <span className="text-xl font-bold">🚀</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">English Booster</h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Affiliate System</p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Daftar Affiliate
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="mb-8">
                            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 dark:bg-blue-900 dark:text-blue-200">
                                📈 Bergabung dengan Program Affiliate Terbaik
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 dark:text-white">
                            🎯 <span className="text-blue-600">English Booster</span>
                            <br />
                            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Affiliate System
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-300">
                            Raih penghasilan tambahan dengan menjadi mitra affiliate kami! Dapatkan komisi menarik 
                            untuk setiap siswa yang berhasil Anda referensikan ke program-program English Booster.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total_affiliates}+</div>
                                <div className="text-gray-600 dark:text-gray-300">Active Affiliates</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                <div className="text-3xl font-bold text-green-600 mb-2">{stats.total_programs}</div>
                                <div className="text-gray-600 dark:text-gray-300">Program Tersedia</div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.total_referrals}+</div>
                                <div className="text-gray-600 dark:text-gray-300">Successful Referrals</div>
                            </div>
                        </div>

                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center"
                                >
                                    🚀 Mulai Jadi Affiliate
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="bg-white/80 hover:bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors border border-gray-300 inline-flex items-center justify-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                                >
                                    📊 Login Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                                💡 Mengapa Bergabung dengan Kami?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
                                Dapatkan keuntungan maksimal dengan sistem affiliate yang mudah dan menguntungkan
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-blue-900">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Komisi Tinggi</h3>
                                <p className="text-gray-600 dark:text-gray-300">Dapatkan komisi 10% untuk setiap referral yang berhasil</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900">
                                    <span className="text-2xl">🔗</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Link Unik</h3>
                                <p className="text-gray-600 dark:text-gray-300">Dapatkan link referral unik untuk tracking yang akurat</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-purple-900">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dashboard Lengkap</h3>
                                <p className="text-gray-600 dark:text-gray-300">Monitor performa dan komisi Anda secara real-time</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-yellow-900">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Pembayaran Cepat</h3>
                                <p className="text-gray-600 dark:text-gray-300">Komisi dibayar tepat waktu setiap bulannya</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                                📚 Program yang Bisa Anda Referensikan
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
                                Berbagai pilihan program bahasa Inggris berkualitas untuk semua kalangan
                            </p>
                        </div>
                        
                        <div className="space-y-12">
                            {Object.entries(programs).map(([category, programList]) => (
                                <div key={category} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                    <div className="flex items-center mb-6">
                                        <span className="text-2xl mr-3">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {categoryNames[category as keyof typeof categoryNames]}
                                        </h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {programList.map((program) => (
                                            <div key={program.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                                                <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{program.name}</h4>
                                                <p className="text-gray-600 text-sm mb-3 dark:text-gray-300">{program.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-green-600">{formatPrice(program.price)}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {program.duration_weeks} minggu
                                                    </span>
                                                </div>
                                                {program.location && (
                                                    <p className="text-sm text-blue-600 mt-2 dark:text-blue-400">📍 {program.location}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">📞 Hubungi Kami</h2>
                            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                                Punya pertanyaan? Tim kami siap membantu Anda
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-2xl mb-2">🏢</div>
                                <h3 className="font-semibold mb-2">Alamat</h3>
                                <p className="text-gray-300">{contact.address}</p>
                            </div>
                            
                            <div>
                                <div className="text-2xl mb-2">📱</div>
                                <h3 className="font-semibold mb-2">WhatsApp</h3>
                                <a href={`https://wa.me/${contact.phone}`} className="text-green-400 hover:text-green-300">
                                    {contact.phone}
                                </a>
                            </div>
                            
                            <div>
                                <div className="text-2xl mb-2">📸</div>
                                <h3 className="font-semibold mb-2">Instagram</h3>
                                <a href={`https://instagram.com/${contact.instagram.replace('@', '')}`} className="text-pink-400 hover:text-pink-300">
                                    {contact.instagram}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="mb-4">
                            © 2024 English Booster. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400">
                            Built with ❤️ for affiliate success
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}