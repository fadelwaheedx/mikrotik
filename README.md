# Project X - MikroTik Tool Suite

**Project X** is a modern web application designed for Network Administrators using MikroTik RouterOS. It provides a suite of online generators, calculators, and configuration tools wrapped in a "Winbox-inspired" utilitarian interface.

Built with **Laravel 12**, **Inertia.js (React)**, and **Tailwind CSS v4**.

## 🚀 Features

### 1. Load Balancing
*   **PCC (Per Connection Classifier)**: Generate robust load balancing scripts for 2-5 WANs with failover support.
*   **ECMP**: Equal Cost Multi-Path routing generators.

### 2. Quality of Service (QoS)
*   **Simple Queues**: Quick generation of bandwidth limit rules for IPs or Subnets.
*   **Queue Trees**: (Planned) Advanced hierarchical bandwidth management.

### 3. Routing & Firewall
*   **Game Routing**: Pre-defined port databases for popular games (Mobile Legends, PUBG, Valorant) to route traffic through specific VPNs.
*   **VPN Servers**: One-click generation of PPTP, L2TP (IPsec), and OpenVPN server configurations.

### 4. Hotspot Management
*   **User Profiles**: Generate Hotspot User Profiles with rate limits, session timeouts, and shared user settings.

### 5. User Dashboard
*   **Script Saving**: Save your generated configurations to your profile for later use.
*   **Premium Tiers**: Advanced tools (PCC, VPN) are protected by a Premium subscription middleware.

## 🛠 Tech Stack

*   **Backend**: PHP 8.2+, Laravel 12.x
*   **Frontend**: React 19, Inertia.js
*   **Styling**: Tailwind CSS v4 (using CSS variables for theming)
*   **Database**: MySQL / PostgreSQL
*   **Icons**: Lucide React

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/project-x.git
    cd project-x
    ```

2.  **Install Dependencies**:
    ```bash
    composer install
    npm install
    ```

3.  **Environment Setup**:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *Configure your database settings in `.env`.*

4.  **Run Migrations**:
    ```bash
    php artisan migrate
    ```

5.  **Start Development Server**:
    ```bash
    npm run dev
    php artisan serve
    ```

## 🎨 Customization

The visual theme is defined in `resources/css/app.css` using Tailwind v4 `@theme` variables. You can adjust the Winbox-like colors there:

```css
@theme {
    --color-mikrotik-blue: #0984E3;
    --color-dark-slate: #2D3436;
    /* ... */
}
```

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
