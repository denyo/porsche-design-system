import { defineConfig, devices } from '@playwright/test';
import { config } from '@porsche-design-system/shared/testing/playwright.e2e';

export default defineConfig({
  ...config,
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: 'yarn start-app',
    port: 8080,
  },
});
