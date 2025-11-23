import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

export default function VPNServer() {
    const [script, setScript] = useState('');
    const [activeTab, setActiveTab] = useState('pptp'); // pptp, l2tp, ovpn

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            poolName: 'vpn-pool',
            poolStart: '192.168.89.10',
            poolEnd: '192.168.89.100',
            dns1: '8.8.8.8',
            dns2: '8.8.4.4',
            profileName: 'vpn-profile',
            secret: 'changeme123', // Serves as password or IPsec secret
        }
    });

    const onSubmit = (data) => {
        const generated = MikrotikLogic.generateVPN(activeTab, data);
        setScript(generated);
    };

    const tabs = [
        { id: 'pptp', name: 'PPTP Server' },
        { id: 'l2tp', name: 'L2TP / IPsec' },
        { id: 'ovpn', name: 'OpenVPN' },
    ];

    const VPNForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => { setActiveTab(tab.id); }}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                ${activeTab === tab.id
                                    ? 'border-mikrotik-blue text-mikrotik-blue'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">VPN Pool Name</label>
                <input
                    {...register("poolName", { required: true })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start IP</label>
                    <input
                        {...register("poolStart", { required: true })}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">End IP</label>
                    <input
                        {...register("poolEnd", { required: true })}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">DNS Server 1</label>
                    <input
                        {...register("dns1")}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">DNS Server 2</label>
                    <input
                        {...register("dns2")}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Profile Name</label>
                <input
                    {...register("profileName", { required: true })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    {activeTab === 'l2tp' ? 'IPsec Secret / User Password' : 'User Password'}
                </label>
                <p className="text-xs text-gray-500 mb-1">Used for both the 'vpnuser' password and IPsec Secret (if L2TP).</p>
                <input
                    {...register("secret", { required: true })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate {activeTab.toUpperCase()} Config
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="VPN Server Generator"
                description="Deploy VPN servers (PPTP, L2TP, OVPN) with IP Pools and Profiles in seconds."
                form={VPNForm}
                generatedScript={script}
                dataToSave={{...watch(), type: activeTab}} // Save inputs + active tab type
            />
        </AppLayout>
    );
}
