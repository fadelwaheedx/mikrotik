# Direct-to-Router Deployment Architecture

This document outlines the architecture for the "Push to Router" feature, allowing users to deploy scripts directly from the web interface to their MikroTik devices via the RouterOS API.

## 1. Security Architecture

Handling router credentials requires extreme caution. We adopt a **"Zero Persistence"** policy for credentials.

### 1.1 Data Flow
1.  **User Input**: User enters IP, Port, Username, and Password in a modal *only* at the moment of deployment.
2.  **Transport**: Data is sent via HTTPS to the Laravel backend.
3.  **Execution**: Backend uses the credentials immediately to establish an API connection.
4.  **Disposal**: Credentials are **never** stored in the database or logs. They exist only in the request scope.

### 1.2 Encryption
*   **Transit**: HTTPS (TLS 1.2+) is mandatory.
*   **Router Connection**: The backend must attempt to connect via **API-SSL (Port 8729)** first. Fallback to API (Port 8728) should be explicit opt-in by the user due to security risks.

## 2. Backend Implementation (Laravel)

### 2.1 Service Class: `RouterOsService`

We will implement a service to handle the low-level API communication.

```php
namespace App\Services;

use RouterOS\Client;
use RouterOS\Query;

class RouterOsService
{
    protected $client;

    /**
     * Connect to the router using temporary credentials.
     */
    public function connect(string $ip, string $user, string $password, int $port = 8729, bool $ssl = true)
    {
        $config = [
            'host' => $ip,
            'user' => $user,
            'pass' => $password,
            'port' => $port,
            'ssl'  => $ssl,
            'timeout' => 10,
        ];

        try {
            $this->client = new Client($config);
        } catch (\Exception $e) {
            throw new \Exception("Connection failed: " . $e->getMessage());
        }
    }

    /**
     * Execute a script or command.
     * Note: Large scripts should be uploaded as a file and executed via /import to ensure atomicity.
     */
    public function runScript(string $scriptContent)
    {
        // Strategy: Upload script -> Import -> Remove
        $filename = 'x_rebuild_deploy_' . time() . '.rsc';

        // 1. Upload File (Pseudocode for library usage)
        // $this->client->query('/file/add', ['name' => $filename, 'contents' => $scriptContent])->read();

        // 2. Import
        // $this->client->query('/import', ['file-name' => $filename])->read();

        // 3. Cleanup
        // $this->client->query('/file/remove', ['numbers' => $filename])->read();
    }
}
```

### 2.2 Controller: `DeployController`

```php
public function push(Request $request, RouterOsService $routerOs)
{
    $validated = $request->validate([
        'ip' => 'required|ip',
        'username' => 'required|string',
        'password' => 'required|string',
        'script' => 'required|string',
        'ssl' => 'boolean'
    ]);

    try {
        $routerOs->connect(
            $validated['ip'],
            $validated['username'],
            $validated['password'],
            $validated['ssl'] ? 8729 : 8728,
            $validated['ssl']
        );

        $routerOs->runScript($validated['script']);

        return response()->json(['status' => 'success', 'message' => 'Configuration deployed successfully.']);

    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
}
```

## 3. Library Recommendation

We recommend using **`benmenking/routeros-api`** or **`evilfreelancer/routeros-api-php`**. These are robust, Composer-ready libraries.

## 4. Frontend UX

*   **Modal**: "Deploy to Router" button opens a modal.
*   **Fields**:
    *   Router IP / Domain
    *   API Port (Default 8729)
    *   Username
    *   Password (Masked)
    *   [Checkbox] Use SSL (Checked by default)
*   **Feedback**: Show a terminal-like log of the connection steps (Connecting -> Uploading -> Executing -> Done).

## 5. Future Roadmap

1.  **SSH Fallback**: If API is disabled, attempt deployment via SSH using `phpseclib`.
2.  **Config Backup**: Before deploying, automatically download a `.backup` file from the router.
3.  **Fleet Management**: Allow users to save *encrypted* credentials (using Laravel's `Crypt` facade) to deploy to multiple routers at once (Mass Deployment).
