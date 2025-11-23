import { describe, it, expect } from 'vitest';
import { MikrotikLogic } from '../MikrotikLogic';

describe('MikrotikLogic - v6 vs v7 Syntax', () => {

    // Mock Data
    const mockPCCData = {
        wans: [
            { interface: 'ether1', gateway: '192.168.1.1', distance: 1 },
            { interface: 'ether2', gateway: '192.168.2.1', distance: 2 }
        ],
        lanInterface: 'bridge1',
        failover: false
    };

    it('generates "routing table" syntax for RouterOS v7', () => {
        const result = MikrotikLogic.generatePCC({ ...mockPCCData, version: 'v7' });

        expect(result).toContain('/routing table');
        expect(result).toContain('routing-table=TO_WAN1');
        expect(result).not.toContain('routing-mark=TO_WAN1'); // v6 specific
    });

    it('generates "routing-mark" syntax for RouterOS v6', () => {
        const result = MikrotikLogic.generatePCC({ ...mockPCCData, version: 'v6' });

        expect(result).not.toContain('/routing table');
        expect(result).toContain('routing-mark=TO_WAN1');
    });

    it('generates Game Routing correctly for v7', () => {
        const gameData = {
            game: { id: 'mlbb', name: 'Mobile Legends', ports: { tcp: ['30000'], udp: ['9000'] } },
            gateway: 'pptp-out1',
            version: 'v7'
        };
        const result = MikrotikLogic.generateGameRouting(gameData);

        expect(result).toContain('/routing table add name=to_mlbb fib');
        expect(result).toContain('routing-table=to_mlbb');
    });

    it('generates Game Routing correctly for v6', () => {
        const gameData = {
            game: { id: 'mlbb', name: 'Mobile Legends', ports: { tcp: ['30000'], udp: ['9000'] } },
            gateway: 'pptp-out1',
            version: 'v6'
        };
        const result = MikrotikLogic.generateGameRouting(gameData);

        expect(result).not.toContain('/routing table');
        expect(result).toContain('routing-mark=to_mlbb');
    });
});
