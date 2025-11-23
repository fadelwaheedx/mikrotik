import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';

export default function DynamicBuilder({ tool }) {
    const [script, setScript] = useState('');

    // Parse the schema from the Builder block format
    // Tool schema is array of { type: 'block_type', data: { ...fields } }
    const schema = tool.form_schema || [];

    const defaultValues = {};
    schema.forEach(block => {
        if (block.data && block.data.variable) {
            // Handle defaults based on block type
            if (block.type === 'switch_input') {
                defaultValues[block.data.variable] = block.data.default_state || false;
            } else {
                defaultValues[block.data.variable] = '';
            }
        }
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues
    });

    const generateScript = (data) => {
        let generated = tool.script_template || '';

        for (const [key, value] of Object.entries(data)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            // Handle boolean switches - might need specific logic in template like {{#if var}} which isn't fully implemented yet
            // For now, assuming direct string replacement or true/false string
            generated = generated.replace(regex, value);
        }

        return generated;
    };

    const onSubmit = (data) => {
        setScript(generateScript(data));
    };

    const renderBlock = (block, index) => {
        const { type, data } = block;
        if (!data || !data.variable) {
            if (type === 'section_group') {
                return (
                    <div key={index} className="pt-4 pb-2 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">{data.title}</h3>
                    </div>
                );
            }
            return null;
        }

        return (
            <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {data.label}
                </label>

                {type === 'text_input' && (
                    <>
                        <input
                            {...register(data.variable, {
                                required: true,
                                pattern: data.regex ? new RegExp(data.regex) : undefined
                            })}
                            type="text"
                            placeholder={data.placeholder}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                        />
                        {data.helper_text && <p className="mt-1 text-xs text-gray-500">{data.helper_text}</p>}
                    </>
                )}

                {type === 'select_input' && (
                    <select
                        {...register(data.variable, { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3 bg-white"
                    >
                        <option value="">Select...</option>
                        {data.options && data.options.map((opt, i) => (
                            <option key={i} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                )}

                {type === 'switch_input' && (
                    <div className="flex items-center mt-2">
                        <input
                            {...register(data.variable)}
                            type="checkbox"
                            className="h-4 w-4 text-mikrotik-blue focus:ring-mikrotik-blue border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-500">Enabled</span>
                    </div>
                )}

                {type === 'ip_input' && (
                    <input
                        {...register(data.variable, {
                            required: true,
                            pattern: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/\d{1,2})?$/
                        })}
                        type="text"
                        placeholder={data.cidr_allowed ? "192.168.88.1/24" : "192.168.88.1"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                    />
                )}

                {errors[data.variable] && <span className="text-xs text-red-500">Invalid format or required field.</span>}
            </div>
        );
    };

    const DynamicForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {schema.map((block, index) => renderBlock(block, index))}

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
