import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

export default function SubnetCalculator() {
    const [script, setScript] = useState('');

    const { register, handleSubmit } = useForm({
        defaultValues: {
            ip: '192.168.88.1',
            cidr: 24
        }
    });

    const onSubmit = (data) => {
        const result = MikrotikLogic.calculateSubnet(data.ip, data.cidr);
        setScript(result);
    };

    const CalculatorForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">IP Address</label>
                    <input
                        {...register("ip", { required: true })}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">CIDR</label>
                    <input
                        {...register("cidr", { required: true, min: 0, max: 32 })}
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Analyze Subnet
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="IP Subnet Calculator"
                description="Calculate network address, broadcast address, and usable host range."
                form={CalculatorForm}
                generatedScript={script}
            />
        </AppLayout>
    );
}
