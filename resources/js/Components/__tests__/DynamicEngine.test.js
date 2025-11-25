import { describe, it, expect } from 'vitest';

// Logic extracted for testing purposes (simulating the component logic)
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
        const data = {};

        const result = generateScript(template, data);

        expect(result).toBe('print {{missing}}');
    });
});
