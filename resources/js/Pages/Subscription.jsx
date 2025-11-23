import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Check, X } from 'lucide-react';

export default function Subscription() {
    return (
        <AppLayout>
            <Head title="Subscription" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Upgrade to Premium
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Unlock the full power of Project X with advanced tools and features.
                        </p>
                    </div>

                    <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
                        {/* Free Tier */}
                        <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
                            <div className="p-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Free</h2>
                                <p className="mt-4 text-sm text-gray-500">Basic tools for network administration.</p>
                                <p className="mt-8">
                                    <span className="text-4xl font-extrabold text-gray-900">$0</span>
                                    <span className="text-base font-medium text-gray-500">/mo</span>
                                </p>
                                <a
                                    href="#"
                                    className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                                >
                                    Current Plan
                                </a>
                            </div>
                            <div className="pt-6 pb-8 px-6">
                                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">Simple Queue Generator</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">Hotspot User Profiles</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">Bandwidth Calculator</span>
                                    </li>
                                    <li className="flex space-x-3 opacity-50">
                                        <X className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                        <span className="text-sm text-gray-500">PCC Load Balancing</span>
                                    </li>
                                    <li className="flex space-x-3 opacity-50">
                                        <X className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                        <span className="text-sm text-gray-500">VPN Servers</span>
                                    </li>
                                    <li className="flex space-x-3 opacity-50">
                                        <X className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                        <span className="text-sm text-gray-500">Save Unlimited Scripts</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Premium Tier */}
                        <div className="border border-mikrotik-blue rounded-lg shadow-md divide-y divide-gray-200 bg-white relative">
                            <div className="absolute top-0 right-0 -mt-4 mr-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-mikrotik-blue text-white">
                                    Recommended
                                </span>
                            </div>
                            <div className="p-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">Premium</h2>
                                <p className="mt-4 text-sm text-gray-500">Advanced automation for professionals.</p>
                                <p className="mt-8">
                                    <span className="text-4xl font-extrabold text-gray-900">$9</span>
                                    <span className="text-base font-medium text-gray-500">/mo</span>
                                </p>
                                <button
                                    className="mt-8 block w-full bg-mikrotik-blue border border-mikrotik-blue rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                                >
                                    Subscribe Now
                                </button>
                            </div>
                            <div className="pt-6 pb-8 px-6">
                                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">All Free Features</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500 font-bold">PCC Load Balancing (Failover)</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500 font-bold">VPN Server Generators</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500 font-bold">Game Port Routing</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">Cloud Script Storage</span>
                                    </li>
                                    <li className="flex space-x-3">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="text-sm text-gray-500">Priority Support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
