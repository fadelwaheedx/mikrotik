import { describe, it, expect } from 'vitest';

// Mocking the logic function for unit testing the engine concept
const generateScript = (template, data) => {
    let generated = template || '';
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        generated = generated.replace(regex, value);
    }
    return generated;
};

describe('Dynamic Engine Logic', () => {
    it('replaces placeholders correctly', () => {
        const template = '/ip address add address={{ip_address}} interface={{iface}}';
        const data = {
            ip_address: '192.168.1.1/24',
            iface: 'ether1'
        };

        const result = generateScript(template, data);

        expect(result).toBe('/ip address add address=192.168.1.1/24 interface=ether1');
    });

    it('handles missing data gracefully', () => {
        const template = 'print {{missing}}';
        const data = {}; // No keys

        const result = generateScript(template, data);

        // Should remain unchanged if key not found in data
        expect(result).toBe('print {{missing}}');
    });
});
