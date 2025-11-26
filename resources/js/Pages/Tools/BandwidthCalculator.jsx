import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

export default function BandwidthCalculator() {
    const [result, setResult] = useState('');

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            size: 10,
            speed: 50
        }
    });

    const onSubmit = (data) => {
        const time = MikrotikLogic.calculateBandwidth(data.size, data.speed);
        setResult(time);
    };

    const CalculatorForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">File Size (GB)</label>
                <input
                    {...register("size", { required: true })}
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Download Speed (Mbps)</label>
                <input
                    {...register("speed", { required: true })}
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>

            <div className="p-4 bg-blue-50 rounded border border-blue-200 text-blue-800 text-center">
                <p className="text-sm uppercase font-bold text-blue-500">Estimated Time</p>
                <p className="text-3xl font-bold">{result || '--'}</p>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Calculate
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="Bandwidth Calculator"
                description="Estimate transfer times based on file size and link speed."
                form={CalculatorForm}
                generatedScript="# Calculation result displayed in panel"
            />
        </AppLayout>
    );
}
