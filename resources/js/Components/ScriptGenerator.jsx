import { Copy, Download, Save } from 'lucide-react';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function ScriptGenerator({
    title,
    description,
    form,
    generatedScript,
    dataToSave = {}, // Optional: Object containing the form input data to save
    onVersionChange = null // Optional: Callback when version toggles
}) {
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [version, setVersion] = useState('v7');
    const { auth } = usePage().props;

    const handleVersionToggle = (v) => {
        setVersion(v);
        if (onVersionChange) onVersionChange(v);
    };

    const handleCopy = () => {
        if (generatedScript) {
            navigator.clipboard.writeText(generatedScript);
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        }
    };

    const handleSave = () => {
        if (!generatedScript) return;
        if (!auth.user) {
             alert("Please login to save scripts.");
             return;
        }

        setIsSaving(true);
        router.post('/tools/save', {
            title: title,
            type: 'script', // Generic type, controller can handle specific logic if needed
            config_json: JSON.stringify(dataToSave),
            generated_script: generatedScript
        }, {
            onSuccess: () => {
                setIsSaving(false);
                // Toast notification would go here
                alert("Script saved to your profile!");
            },
            onError: () => {
                setIsSaving(false);
                alert("Failed to save script.");
            }
        });
    };

    const handleDownload = () => {
        if (!generatedScript) return;
        const blob = new Blob([generatedScript], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_').toLowerCase()}.rsc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Input Form */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between border-b pb-2 mb-4">
                            <h2 className="text-lg font-medium text-gray-900">Configuration</h2>
                            {/* Version Toggle */}
                            <div className="flex bg-gray-100 rounded p-1">
                                <button
                                    onClick={() => handleVersionToggle('v6')}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${version === 'v6' ? 'bg-white shadow text-mikrotik-blue' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    v6 (Legacy)
                                </button>
                                <button
                                    onClick={() => handleVersionToggle('v7')}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${version === 'v7' ? 'bg-white shadow text-mikrotik-blue' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    v7 (Modern)
                                </button>
                            </div>
                        </div>
                        {form}
                    </div>
                </div>

                {/* Right Column: Output */}
                <div className="lg:col-span-7">
                    <div className="bg-white shadow rounded-lg flex flex-col h-full border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-sm font-medium text-gray-700">Generated Script</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                >
                                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                                    {copyFeedback ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-mikrotik-blue hover:bg-blue-700 focus:outline-none"
                                >
                                    <Download className="h-3.5 w-3.5 mr-1.5" />
                                    Download .rsc
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving || !generatedScript}
                                    className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white focus:outline-none ${
                                        isSaving || !generatedScript
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-mikrotik-green hover:bg-green-700'
                                    }`}
                                >
                                    <Save className="h-3.5 w-3.5 mr-1.5" />
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#1e1e1e] p-0 overflow-auto">
                            <pre className="text-gray-300 font-mono text-sm p-4 min-h-[400px] whitespace-pre-wrap">
                                {generatedScript || "# Script will appear here after generation..."}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
