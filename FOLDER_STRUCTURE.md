X Rebuild - Project Structure
====================================

This structure reflects a fresh installation of Laravel 12.x with Inertia.js (React) and Tailwind CSS v4.

.
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── LoadBalancing/
│   │   │   │   └── PCCController.php  <-- [Created]
│   │   │   └── ProfileController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   ├── Models/
│   │   ├── User.php
│   │   └── SavedScript.php            <-- [To Be Created]
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
│   │   └── 2024_01_01_000000_create_saved_scripts_table.php <-- [Created]
│   └── seeders/
├── public/
│   ├── build/
│   └── index.php
├── resources/
│   ├── css/
│   │   └── app.css                    <-- [Created - Tailwind v4 Config]
│   ├── js/
│   │   ├── Components/
│   │   │   ├── ScriptGenerator.jsx    <-- [Created - Reusable UI]
│   │   │   ├── TextInput.jsx
│   │   │   └── PrimaryButton.jsx
│   │   ├── Layouts/
│   │   │   └── AppLayout.jsx          <-- [Created - Sidebar/Nav]
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LoadBalancing/
│   │   │   │   └── PCC.jsx            <-- [Created - Logic & Form]
│   │   │   └── Profile/
│   │   ├── Utils/
│   │   │   └── MikrotikLogic.js       <-- [Created - Generator Logic]
│   │   └── app.jsx
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── console.php
│   └── web.php                        <-- [Modified - Routes]
├── storage/
├── tests/
├── .env
├── .env.example
├── composer.json
├── package.json
├── postcss.config.js
├── README.md
└── vite.config.js
