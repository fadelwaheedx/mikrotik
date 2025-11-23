import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Authentication Flow', () => {
    test('user can login and redirect to dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        // Setup listener for the login API response
        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes('/login') && response.status() === 200
        , { timeout: 3000 }); // Strict timeout: Must respond within 3s

        // Perform login
        await loginPage.login('admin@project-x.com', 'password');

        // Verify API response correctness
        const response = await loginResponsePromise;
        const json = await response.json();
        // Assuming Inertia response or API token response
        // If Inertia, it might return a redirect or an object.
        // For "Zero Tolerance", we check if the response was successful.
        expect(response.status()).toBe(200);

        // Verify Navigation
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page).toHaveTitle(/Dashboard/);
    });
});
