import { describe, test, expect } from 'vitest';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const getSitemap = (): string[] => {
  const sitemapPath = path.resolve(__dirname, '../../e2e/fixtures/sitemap.json');
  const sitemapData = fs.readFileSync(sitemapPath, 'utf8');
  return JSON.parse(sitemapData);
};

describe('url', () => {
  for (const url of getSitemap()) {
    describe(`"${url}"`, () => {
      test.skipIf(url === '/')('should not end with trailing slash', async () => {
        expect(url.endsWith('/')).toBe(false);
      });

      describe.runIf(url.startsWith('https://') || url.startsWith('http://'))('external url', () => {
        test('should not use unencrypted http protocol', async () => {
          expect(url.startsWith('http://')).toBe(false);
        });

        // Although it should be reachable without "www.", https://wechat.com is not.
        test.skipIf(url === 'https://www.wechat.com')('should not contain "www."', async () => {
          expect(url.startsWith('https://www.')).toBe(false);
        });

        test('should be reachable', async () => {
          const { status } = await fetch(url);

          switch (url) {
            case 'https://reddit.com':
            case 'https://figma.com/@porsche':
            case 'https://figma.com/design/EkdP468u4ZVuIRwalKCscb/Web-Design-System-v3?node-id=32923-48020':
            case 'https://figma.com/design/EkdP468u4ZVuIRwalKCscb/Web-Design-System-v3?node-id=34906-9454':
            case 'https://figma.com/file/EkdP468u4ZVuIRwalKCscb/Design-System-v3?type=design&node-id=105-146':
              expect(status).toBe(403); // 403 Forbidden
              break;
            case 'https://vmmedia.porsche.de':
            case 'https://vmmedia.porsche.de/prod/vmmedia/Resources.nsf':
              expect([401, 403, 429]).toContain(status); // 401 Unauthorized, 403 Forbidden or 429 Too Many Requests
              break;
            case 'https://twitter.com':
              expect([400, 200]).toContain(status); // 400 Bad Request, 200 OK
              break;
            default:
              expect(status).toBe(200); // 200: OK
          }
        });
      });
    });
  }
});
