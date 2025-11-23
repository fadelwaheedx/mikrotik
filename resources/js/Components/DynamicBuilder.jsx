import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';

export default function DynamicBuilder({ tool }) {
    const [script, setScript] = useState('');

    // Parse the schema from the database
    // Expecting tool.form_schema to be array of { label, variable, type, default }
    const schema = tool.form_schema || [];

    const defaultValues = {};
    schema.forEach(field => {
        defaultValues[field.variable] = field.default || '';
    });

    const { register, handleSubmit, watch } = useForm({
        defaultValues
    });

    const generateScript = (data) => {
        let generated = tool.script_template || '';

        // Simple variable replacement
        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            generated = generated.replace(regex, value);
        }

        // Logic Handling (Advanced - simplified for this MVP)
        // In a real engine, we'd support logic blocks like {{#if var}}...{{/if}}
        // Here we just support direct replacement.

        return generated;
    };

    const onSubmit = (data) => {
        setScript(generateScript(data));
    };

    const DynamicForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {schema.map((field, index) => (
                <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    {field.type === 'select' ? (
                        <select
                            {...register(field.variable, { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3 bg-white"
                        >
                            {/* Options logic would go here if the builder supported defining options */}
                            <option value="">Select...</option>
                        </select>
                    ) : (
                        <input
                            {...register(field.variable, { required: true })}
                            type={field.type === 'number' ? 'number' : 'text'}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                        />
                    )}
                </div>
            ))}

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate Script
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title={tool.name}
                description={`Dynamic generator for ${tool.name}`}
                form={DynamicForm}
                generatedScript={script}
            />
        </AppLayout>
    );
}
