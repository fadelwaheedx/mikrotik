import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

export default function DohConfig() {
    const [script, setScript] = useState('');

    const { register, handleSubmit } = useForm({
        defaultValues: {
            provider: 'cloudflare',
            customUrl: ''
        }
    });

    const providers = {
        cloudflare: 'https://cloudflare-dns.com/dns-query',
        google: 'https://dns.google/dns-query',
        quad9: 'https://dns.quad9.net/dns-query'
    };

    const onSubmit = (data) => {
        const url = data.provider === 'custom' ? data.customUrl : providers[data.provider];
        const generated = MikrotikLogic.generateDoh(url);
        setScript(generated);
    };

    const DohForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">DoH Provider</label>
                <select
                    {...register("provider")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3 bg-white"
                >
                    <option value="cloudflare">Cloudflare</option>
                    <option value="google">Google</option>
                    <option value="quad9">Quad9</option>
                    <option value="custom">Custom URL</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Custom DoH URL</label>
                <input
                    {...register("customUrl")}
                    type="text"
                    placeholder="https://..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3 disabled:bg-gray-100 disabled:text-gray-400"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate DoH Script
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="DNS over HTTPS (DoH)"
                description="Secure your DNS queries by wrapping them in HTTPS."
                form={DohForm}
                generatedScript={script}
            />
        </AppLayout>
    );
}
