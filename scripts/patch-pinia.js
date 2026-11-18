import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// 1. Patch pinia
const piniaDistDir = path.join(root, 'node_modules/pinia/dist');
if (fs.existsSync(piniaDistDir)) {
  const files = fs.readdirSync(piniaDistDir);
  for (const file of files) {
    if (file.endsWith('.js') || file.endsWith('.cjs') || file.endsWith('.mjs')) {
      const filePath = path.join(piniaDistDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('!obj.hasOwnProperty(skipHydrateSymbol)')) {
        content = content.replaceAll(
          '!obj.hasOwnProperty(skipHydrateSymbol)',
          '!Object.prototype.hasOwnProperty.call(obj, skipHydrateSymbol)'
        );
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

// 2. Patch @pinia/nuxt payload plugin
const payloadPluginPath = path.join(root, 'node_modules/@pinia/nuxt/dist/runtime/payload-plugin.js');
if (fs.existsSync(payloadPluginPath)) {
  let content = fs.readFileSync(payloadPluginPath, 'utf8');
  if (content.includes('(data) => !shouldHydrate(data) && 1')) {
    content = content.replace(
      '(data) => !shouldHydrate(data) && 1',
      '(data) => { try { return !shouldHydrate(data) && 1; } catch { return false; } }'
    );
    fs.writeFileSync(payloadPluginPath, content, 'utf8');
  }
}
