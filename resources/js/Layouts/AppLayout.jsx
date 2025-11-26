import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Network,
    Server,
    ShieldCheck,
    Settings,
    Activity,
    Calculator,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'sonner';

export default function AppLayout({ children }) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: url === '/dashboard' },
        { name: 'Load Balancing', href: '/load-balancing/pcc', icon: Network, current: url.startsWith('/load-balancing') },
        { name: 'QoS & Traffic', href: '/qos/simple-queue', icon: Activity, current: url.startsWith('/qos') },
        { name: 'Routing & Firewall', href: '/routing/game-ports', icon: ShieldCheck, current: url.startsWith('/routing') },
        { name: 'VPN Services', href: '/vpn', icon: Server, current: url.startsWith('/vpn') },
        { name: 'Calculators', href: '/tools/bandwidth-calculator', icon: Calculator, current: url.startsWith('/tools') },
        { name: 'Settings', href: '/profile', icon: Settings, current: url.startsWith('/profile') },
    ];

    return (
        <div className="min-h-screen flex bg-content-bg text-content-text font-sans">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg text-sidebar-text transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0
                `}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
                    <span className="text-xl font-bold tracking-wider">X</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="px-4 py-6 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                                ${item.current
                                    ? 'bg-mikrotik-blue text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }
                            `}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">User</p>
                            <p className="text-xs text-gray-400">Free Tier</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm lg:hidden">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-gray-900">X</span>
                        <div className="w-6"></div> {/* Spacer */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8">
                    {children}
                </main>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}
