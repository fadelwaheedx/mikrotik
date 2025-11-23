X Rebuild - Project Structure
====================================

This structure reflects a complete installation of the X Project (formerly Buananet) using Laravel 12.x, Inertia.js (React), and Tailwind CSS v4.

.
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── LoadBalancing/
│   │   │   │   └── PCCController.php      <-- [Phase 1]
│   │   │   └── ToolController.php         <-- [Phase 3] Handles saving scripts
│   │   ├── Middleware/
│   │   │   └── EnsureUserIsPremium.php    <-- [Phase 4] Protects Premium tools
│   │   └── HandleInertiaRequests.php
│   ├── Models/
│   │   ├── User.php
│   │   └── SavedScript.php                <-- [Phase 3] Model for saved_scripts table
│   └── Providers/
├── bootstrap/
│   ├── app.php
│   └── providers.php
├── config/
│   ├── app.php
│   └── database.php
├── database/
│   ├── factories/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   └── 2024_01_01_000000_create_saved_scripts_table.php <-- [Phase 1]
│   └── seeders/
├── public/
│   ├── build/
│   └── index.php
├── resources/
│   ├── css/
│   │   └── app.css                        <-- [Phase 1] Tailwind v4 Theme
│   ├── js/
│   │   ├── Components/
│   │   │   ├── ScriptGenerator.jsx        <-- [Phase 1/3] Core UI with Save/Copy
│   │   │   ├── TextInput.jsx
│   │   │   └── PrimaryButton.jsx
│   │   ├── Layouts/
│   │   │   └── AppLayout.jsx              <-- [Phase 1] Sidebar & Navigation
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx              <-- [Phase 4] User Stats & Saved Scripts
│   │   │   ├── LoadBalancing/
│   │   │   │   └── PCC.jsx                <-- [Phase 1] PCC Generator
│   │   │   ├── QoS/
│   │   │   │   └── SimpleQueue.jsx        <-- [Phase 2] Simple Queue Generator
│   │   │   ├── Routing/
│   │   │   │   └── GameRouting.jsx        <-- [Phase 2] Game Ports Routing
│   │   │   ├── Hotspot/
│   │   │   │   └── UserProfile.jsx        <-- [Phase 3] Hotspot Profile Generator
│   │   │   ├── VPN/
│   │   │   │   └── VPNServer.jsx          <-- [Phase 4] PPTP/L2TP/OVPN Generator
│   │   │   └── Profile/
│   │   ├── Utils/
│   │   │   └── MikrotikLogic.js           <-- [Phases 1-4] Core Logic Library
│   │   └── app.jsx
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── console.php
│   └── web.php                            <-- [All Phases] Routes & Middleware Groups
├── storage/
├── tests/
├── .env
├── .env.example
├── composer.json
├── package.json
├── postcss.config.js
├── README.md
└── vite.config.js
