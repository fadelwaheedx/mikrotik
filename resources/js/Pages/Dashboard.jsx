import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2, Copy, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard({ auth, savedScripts = [] }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this script?')) {
            router.delete(`/tools/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-mikrotik-blue">
                            <div className="text-gray-500 text-sm font-medium uppercase">Saved Scripts</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{savedScripts.length}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-mikrotik-green">
                            <div className="text-gray-500 text-sm font-medium uppercase">Subscription Status</div>
                            <div className="mt-2 text-lg font-bold text-gray-900 flex items-center">
                                {auth.user.is_premium ? (
                                    <>
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                        Premium Active
                                    </>
                                ) : (
                                    <span className="text-gray-500">Free Tier</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Saved Scripts Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Saved Scripts</h2>

                            {savedScripts.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                    <p>You haven't saved any scripts yet.</p>
                                    <Link href="/load-balancing/pcc" className="text-mikrotik-blue hover:underline mt-2 inline-block">
                                        Create your first script
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {savedScripts.map((script) => (
                                                <tr key={script.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {script.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                        {script.type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(script.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => handleDelete(script.id)}
                                                            className="text-red-600 hover:text-red-900 ml-4"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
