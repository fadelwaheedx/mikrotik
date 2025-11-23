<?php

namespace Database\Seeders;

use App\Models\Snippet;
use Illuminate\Database\Seeder;

class SnippetSeeder extends Seeder
{
    public function run(): void
    {
        $snippets = [
            // Core System & Backup
            ['title' => 'check-routeros-update', 'category' => 'Core', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/check-routeros-update.rsc'],
            ['title' => 'daily-maintenance', 'category' => 'Core', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/daily-maintenance.rsc'],
            ['title' => 'backup-email', 'category' => 'Core', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/backup-email.rsc'],
            ['title' => 'backup-cloud', 'category' => 'Core', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/backup-cloud.rsc'],
            ['title' => 'backup-partition', 'category' => 'Core', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/backup-partition.rsc'],
            ['title' => 'scheduler-maintenance', 'category' => 'Core', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/scheduler-maintenance.rsc'],

            // Network Monitoring & CAPsMAN
            ['title' => 'netwatch-notify', 'category' => 'Monitoring', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/netwatch-notify.rsc'],
            ['title' => 'dhcp-lease-comment', 'category' => 'Monitoring', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/dhcp-lease-comment.rsc'],
            ['title' => 'collect-wireless-mac', 'category' => 'Monitoring', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/collect-wireless-mac.rsc'],
            ['title' => 'capsman-download-packages', 'category' => 'Monitoring', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/capsman-download-packages.rsc'],
            ['title' => 'capsman-rolling-upgrade', 'category' => 'Monitoring', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/capsman-rolling-upgrade.rsc'],

            // Routing & Tunnels
            ['title' => 'ipsec-to-dns', 'category' => 'Routing', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/ipsec-to-dns.rsc'],
            ['title' => 'update-gre-address', 'category' => 'Routing', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/update-gre-address.rsc'],
            ['title' => 'ipv6-update', 'category' => 'Routing', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/ipv6-update.rsc'],
            ['title' => 'update-tunnelbroker', 'category' => 'Routing', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/update-tunnelbroker.rsc'],
            ['title' => 'ppp-on-up', 'category' => 'Routing', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/ppp-on-up.rsc'],

            // Security & Certificates
            ['title' => 'ssh-keys-import', 'category' => 'Security', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/ssh-keys-import.rsc'],
            ['title' => 'certificate-renew-letsencrypt', 'category' => 'Security', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/certificate-renew-letsencrypt.rsc'],
            ['title' => 'check-certificates', 'category' => 'Security', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/check-certificates.rsc'],
            ['title' => 'hotspot-to-wpa', 'category' => 'Security', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/hotspot-to-wpa.rsc'],

            // Utilities & Advanced
            ['title' => 'mode-button', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/mode-button.rsc'],
            ['title' => 'global-functions', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/global-functions.rsc'],
            ['title' => 'lease-script', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/lease-script.rsc'],
            ['title' => 'bridge-port-to-default', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/bridge-port-to-default.rsc'],
            ['title' => 'check-health', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/check-health.rsc'],
            ['title' => 'check-lte-firmware-upgrade', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/check-lte-firmware-upgrade.rsc'],
            ['title' => 'doh-to-dns', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/doh-to-dns.rsc'],
            ['title' => 'gps-track', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/gps-track.rsc'],
            ['title' => 'log-forward', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/log-forward.rsc'],
            ['title' => 'sms-forward', 'category' => 'Utilities', 'url' => 'https://github.com/eworm-de/routeros-scripts/blob/main/sms-forward.rsc'],
        ];

        foreach ($snippets as $s) {
            Snippet::create([
                'title' => $s['title'],
                'category' => $s['category'],
                'source_url' => $s['url'],
                'description' => "Imported from eworm-de collection.",
                'code' => "# See source url for content"
            ]);
        }
    }
}
