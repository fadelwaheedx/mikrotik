# Project X - MikroTik Tool Suite

**Project X** is a comprehensive web-based toolkit designed for Network Administrators who manage MikroTik RouterOS devices. It streamlines the creation of complex configurations—such as Load Balancing (PCC), QoS Queues, and VPN Servers—through a modern, "Winbox-inspired" web interface.

Built with **Laravel 12**, **Inertia.js (React 19)**, and **Tailwind CSS v4**.

---

## 🚀 Features

### 🔹 Load Balancing
*   **PCC Generator**: Create Per Connection Classifier rules for 2-5 WAN connections with automatic failover.
*   **ECMP**: Equal Cost Multi-Path routing logic.

### 🔹 Traffic Control (QoS)
*   **Simple Queue Generator**: Quickly generate bandwidth limit rules for specific IPs or Subnets.
*   **Time-Based Rules**: Apply limits based on specific time schedules.

### 🔹 Advanced Routing
*   **Game Routing**: Route traffic for specific games (Mobile Legends, PUBG, Valorant, etc.) through dedicated VPNs or gateways using pre-defined port lists.
*   **Content Routing**: Generate address lists for major apps (YouTube, Netflix, TikTok) to separate streaming traffic.

### 🔹 Network Services
*   **VPN Server Generator**: One-click setup for PPTP, L2TP (with IPsec), and OpenVPN servers.
*   **Hotspot User Profiles**: Create comprehensive user profiles with rate limits and shared user constraints.

### 🔹 User Dashboard
*   **Save Configurations**: Store your generated scripts in the cloud (database) for later retrieval.
*   **Subscription System**: Differentiates between Free and Premium users (Premium unlocks PCC, VPN, and Game Routing).

---

## 📦 Installation Guide

Follow these steps to set up the project locally.

### 1. Prerequisites
*   PHP 8.2 or higher
*   Composer
*   Node.js & NPM
*   MySQL or PostgreSQL

### 2. Backend Setup (Laravel)

```bash
# Clone the repository
git clone https://github.com/yourusername/project-x.git
cd project-x

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate Application Key
php artisan key:generate
```

**Configure Database:**
Open the `.env` file and update your database credentials:
```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project_x
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Frontend Setup (React + Tailwind)

```bash
# Install Node dependencies
npm install

# Build assets for development
npm run dev
```

### 4. Database & Seeding

Run the migrations to create the necessary tables (`users`, `saved_scripts`).

```bash
php artisan migrate
```

**Seed Test Users:**
We have provided a seeder to create a Premium and a Standard user for testing.

```bash
php artisan db:seed
```

**Test Credentials:**
*   **Premium User**: `admin@project-x.com` / `password`
*   **Free User**: `user@project-x.com` / `password`

---

## 🛠 Configuration & Data

### Game & App Database
The mapping of Game Ports (TCP/UDP) and App Domains (YouTube, TikTok, etc.) is located in the frontend logic files.

*   **Game Ports**: `resources/js/Pages/Routing/GameRouting.jsx` (look for `GAME_DATABASE` constant).
*   **App Domains**: `resources/js/Utils/MikrotikLogic.js` (inside `generateContentRouting` function).

To add new games or apps, simply update the JSON objects in these files and re-run `npm run build`.

### Visual Theme
The "Winbox Web" color palette is defined in `resources/css/app.css` using Tailwind v4 `@theme` directives.

```css
@theme {
    --color-mikrotik-blue: #0984E3;
    --color-dark-slate: #2D3436;
    /* ... */
}
```

---

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
