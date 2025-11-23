import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';
import { Plus, Trash2 } from 'lucide-react';

export default function PCC() {
    const [script, setScript] = useState('');

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            wans: [
                { interface: 'ether1', gateway: '192.168.1.1', distance: 1 },
                { interface: 'ether2', gateway: '192.168.2.1', distance: 2 }
            ],
            lanInterface: 'bridge1',
            failover: true
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "wans"
    });

    const onSubmit = (data) => {
        const generated = MikrotikLogic.generatePCC(data);
        setScript(generated);
    };

    // Form Component to pass to the layout
    const PCCForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">WAN Interfaces</label>
                <p className="text-xs text-gray-500 mb-3">Add at least 2 WAN connections.</p>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-md border border-gray-200 relative group">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                                <div>
                                    <label className="text-xs text-gray-500">Interface Name</label>
                                    <input
                                        {...register(`wans.${index}.interface`, { required: true })}
                                        type="text"
                                        placeholder="ether1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-1 px-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Gateway IP</label>
                                    <input
                                        {...register(`wans.${index}.gateway`, {
                                            required: true,
                                            pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                                        })}
                                        type="text"
                                        placeholder="192.168.1.1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-1 px-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Distance</label>
                                    <input
                                        {...register(`wans.${index}.distance`, { required: true, min: 1 })}
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-1 px-2"
                                    />
                                </div>
                            </div>

                            {fields.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="mt-6 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => append({ interface: `ether${fields.length + 1}`, gateway: '', distance: 1 })}
                    className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                    <Plus size={14} className="mr-1" />
                    Add WAN
                </button>
            </div>

            <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">LAN Interface</label>
                        <input
                            {...register("lanInterface", { required: true })}
                            type="text"
                            placeholder="bridge1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm"
                        />
                        {errors.lanInterface && <span className="text-xs text-red-500">This field is required</span>}
                    </div>

                    <div className="flex items-center h-full pt-6">
                        <input
                            {...register("failover")}
                            id="failover"
                            type="checkbox"
                            className="h-4 w-4 text-mikrotik-blue focus:ring-mikrotik-blue border-gray-300 rounded"
                        />
                        <label htmlFor="failover" className="ml-2 block text-sm text-gray-900">
                            Enable Recursive Failover (Ping Check)
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate PCC Script
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="PCC Load Balancing"
                description="Distribute traffic across multiple WAN connections using Per Connection Classifier (PCC) with optional failover."
                form={PCCForm}
                generatedScript={script}
            />
        </AppLayout>
    );
}
