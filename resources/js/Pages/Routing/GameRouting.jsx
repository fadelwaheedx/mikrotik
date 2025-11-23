import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';
import axios from 'axios';

export default function GameRouting() {
    const [script, setScript] = useState('');
    const [version, setVersion] = useState('v7');
    const [games, setGames] = useState([]);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            gameSlug: '',
            gateway: ''
        }
    });

    useEffect(() => {
        axios.get('/api/games')
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.error("Error fetching games:", error);
                // Fallback or empty state could be handled here
            });
    }, []);

    const onSubmit = (data) => {
        const selectedGame = games.find(g => g.slug === data.gameSlug);

        if (!selectedGame) return;

        const payload = {
            game: {
                id: selectedGame.slug,
                name: selectedGame.name,
                ports: {
                    tcp: selectedGame.ports_tcp ? Object.values(selectedGame.ports_tcp) : [],
                    udp: selectedGame.ports_udp ? Object.values(selectedGame.ports_udp) : []
                }
            },
            gateway: data.gateway,
            version: version
        };

        const generated = MikrotikLogic.generateGameRouting(payload);
        setScript(generated);
    };

    const GameRoutingForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Select Game</label>
                <select
                    {...register("gameSlug", { required: "Please select a game" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3 bg-white"
                >
                    <option value="">-- Select Game --</option>
                    {games.map(game => (
                        <option key={game.id} value={game.slug}>{game.name}</option>
                    ))}
                </select>
                {errors.gameSlug && <span className="text-xs text-red-500">{errors.gameSlug.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">VPN Interface or Gateway IP</label>
                <p className="text-xs text-gray-500 mb-1">Where do you want to route this game traffic?</p>
                <input
                    {...register("gateway", { required: "Gateway is required" })}
                    type="text"
                    placeholder="pptp-out1 or 192.168.5.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3"
                />
                {errors.gateway && <span className="text-xs text-red-500">{errors.gateway.message}</span>}
            </div>

            {/* Helper info showing selected game ports */}
            {watch('gameSlug') && (
                <div className="mt-4 p-4 bg-gray-50 rounded text-xs text-gray-600 border">
                    <p className="font-semibold">Selected Game Ports:</p>
                    {(() => {
                        const game = games.find(g => g.slug === watch('gameSlug'));
                        if (!game) return null;
                        const tcpPorts = game.ports_tcp ? Object.values(game.ports_tcp) : [];
                        const udpPorts = game.ports_udp ? Object.values(game.ports_udp) : [];
                        return (
                            <div className="mt-2 space-y-1">
                                <p><span className="font-medium">TCP:</span> {tcpPorts.join(', ') || 'None'}</p>
                                <p><span className="font-medium">UDP:</span> {udpPorts.join(', ') || 'None'}</p>
                            </div>
                        );
                    })()}
                </div>
            )}

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-mikrotik-blue border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Generate Routing Script
                </button>
            </div>
        </form>
    );

    return (
        <AppLayout>
            <ScriptGenerator
                title="Game Traffic Routing"
                description="Force specific game traffic through a dedicated VPN or Gateway to reduce lag."
                form={GameRoutingForm}
                generatedScript={script}
                onVersionChange={setVersion}
            />
        </AppLayout>
    );
}
