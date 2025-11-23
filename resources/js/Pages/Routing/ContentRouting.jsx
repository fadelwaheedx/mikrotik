import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

export default function ContentRouting() {
    const [script, setScript] = useState('');

    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            apps: [],
            listName: 'streaming_traffic'
        }
    });

    const availableApps = [
        { id: 'youtube', name: 'YouTube' },
        { id: 'netflix', name: 'Netflix' },
        { id: 'tiktok', name: 'TikTok' },
        { id: 'facebook', name: 'Facebook' },
        { id: 'whatsapp', name: 'WhatsApp' },
    ];

    const handleAppToggle = (appId) => {
        const currentApps = watch('apps');
        const newApps = currentApps.includes(appId)
            ? currentApps.filter(id => id !== appId)
            : [...currentApps, appId];
        setValue('apps', newApps);
    };

    const onSubmit = (data) => {
        const generated = MikrotikLogic.generateContentRouting(data.apps, data.listName);
        setScript(generated);
    };

    const ContentRoutingForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Applications</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableApps.map((app) => (
                        <div key={app.id} className="relative flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id={`app-${app.id}`}
                                    type="checkbox"
                                    checked={watch('apps').includes(app.id)}
                                    onChange={() => handleAppToggle(app.id)}
                                    className="focus:ring-mikrotik-blue h-4 w-4 text-mikrotik-blue border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor={`app-${app.id}`} className="font-medium text-gray-700 select-none">
                                    {app.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {watch('apps').length === 0 && (
                    <p className="mt-2 text-xs text-red-500">Please select at least one app.</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Address List Name</label>
                <p className="text-xs text-gray-500 mb-1">This name will be used in the "dst-address-list" parameter.</p>
                <input
                    {...register("listName", { required: true })}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate Address Lists
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="Content Routing (Address Lists)"
                description="Generate address lists for popular applications to facilitate policy-based routing."
                form={ContentRoutingForm}
                generatedScript={script}
                dataToSave={watch()}
            />
        </AppLayout>
    );
}
