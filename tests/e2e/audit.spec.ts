import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import getPort from 'get-port';

test('Lighthouse Audit', async ({ playwright, page }) => {
    // Lighthouse requires a specific port setup for the browser
    const port = await getPort();
    const browser = await playwright.chromium.launch({
        args: [`--remote-debugging-port=${port}`],
    });
    const context = await browser.newContext();
    const auditPage = await context.newPage();

    await auditPage.goto('http://127.0.0.1:8000/');

    await playAudit({
        page: auditPage,
        port: port,
        thresholds: {
            performance: 90,
            accessibility: 90,
            'best-practices': 90,
            seo: 90,
        },
        reports: {
            formats: {
                html: true, // Create a detailed HTML report
            },
            name: 'lighthouse-report',
            directory: 'tests/e2e/reports',
        },
    });

    await browser.close();
});
