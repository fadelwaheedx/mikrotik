import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

export default function SimpleQueue() {
    const [script, setScript] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            target: '',
            uploadMax: '10M',
            downloadMax: '10M',
            timeLimit: ''
        }
    });

    const onSubmit = (data) => {
        // Combine Upload/Download into "Upload/Download" string
        const maxLimit = `${data.uploadMax}/${data.downloadMax}`;
        const payload = {
            target: data.target,
            maxLimit: maxLimit,
            timeLimit: data.timeLimit
        };

        const generated = MikrotikLogic.generateSimpleQueue(payload);
        setScript(generated);
    };

    const SimpleQueueForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Target Address</label>
                <p className="text-xs text-gray-500 mb-1">IP Address, Subnet (CIDR), or Interface Name.</p>
                <input
                    {...register("target", { required: "Target is required" })}
                    type="text"
                    placeholder="192.168.1.10 or 192.168.1.0/24"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
                {errors.target && <span className="text-xs text-red-500">{errors.target.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Max Limit</label>
                    <input
                        {...register("uploadMax", { required: "Required" })}
                        type="text"
                        placeholder="10M"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Download Max Limit</label>
                    <input
                        {...register("downloadMax", { required: "Required" })}
                        type="text"
                        placeholder="10M"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Time Limit (Optional)</label>
                <p className="text-xs text-gray-500 mb-1">Format: 1s-1d,sun,mon... (RouterOS Syntax)</p>
                <input
                    {...register("timeLimit")}
                    type="text"
                    placeholder="08:00:00-17:00:00,sun,mon,tue,wed,thu,fri,sat"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate Queue Script
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="Simple Queue Generator"
                description="Create simple bandwidth limitation rules for specific IPs, subnets, or interfaces."
                form={SimpleQueueForm}
                generatedScript={script}
            />
        </AppLayout>
    );
}
