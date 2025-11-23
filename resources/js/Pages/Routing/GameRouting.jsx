import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ScriptGenerator from '@/Components/ScriptGenerator';
import { MikrotikLogic } from '@/Utils/MikrotikLogic';

// Mock Database of Games
const GAME_DATABASE = [
    { id: 'mlbb', name: 'Mobile Legends: Bang Bang', ports: { tcp: ['30000-30200'], udp: ['9000-9050', '30000-30200'] } },
    { id: 'pubg', name: 'PUBG Mobile', ports: { tcp: ['17500'], udp: ['10000-14000', '17000', '20000-20002'] } },
    { id: 'ff', name: 'FreeFire', ports: { tcp: ['10000-10002'], udp: ['10000-10008', '17000'] } },
    { id: 'valorant', name: 'Valorant', ports: { tcp: ['2099', '5222-5223', '8088', '8393-8400'], udp: ['5000-5500', '8088'] } },
    { id: 'genshin', name: 'Genshin Impact', ports: { tcp: ['4244', '5222', '11000-14000'], udp: ['4244', '5222', '11000-14000'] } },
];

export default function GameRouting() {
    const [script, setScript] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            gameId: '',
            gateway: ''
        }
    });

    const onSubmit = (data) => {
        const selectedGame = GAME_DATABASE.find(g => g.id === data.gameId);

        if (!selectedGame) return;

        const payload = {
            game: selectedGame,
            gateway: data.gateway
        };

        const generated = MikrotikLogic.generateGameRouting(payload);
        setScript(generated);
    };

    const GameRoutingForm = (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Select Game</label>
                <select
                    {...register("gameId", { required: "Please select a game" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-mikrotik-blue focus:ring-mikrotik-blue sm:text-sm py-2 px-3 bg-white"
                >
                    <option value="">-- Select Game --</option>
                    {GAME_DATABASE.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                    ))}
                </select>
                {errors.gameId && <span className="text-xs text-red-500">{errors.gameId.message}</span>}
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
            {watch('gameId') && (
                <div className="mt-4 p-4 bg-gray-50 rounded text-xs text-gray-600 border">
                    <p className="font-semibold">Selected Game Ports:</p>
                    {(() => {
                        const game = GAME_DATABASE.find(g => g.id === watch('gameId'));
                        if (!game) return null;
                        return (
                            <div className="mt-2 space-y-1">
                                <p><span className="font-medium">TCP:</span> {game.ports.tcp.join(', ')}</p>
                                <p><span className="font-medium">UDP:</span> {game.ports.udp.join(', ')}</p>
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
            />
        </AppLayout>
    );
}
