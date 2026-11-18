const path = require('path');

// Load environment variables from .env if present
try {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
} catch (e) {
  // dotenv is optional; fallback to system process.env
}

module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'www24',
      script: './.output/server/index.mjs',
      // Gunakan binary node dari ENV (misal NVM path), atau fallback ke 'node' default dari PATH
      interpreter: process.env.NODE_INTERPRETER || process.env.NODE_PATH || 'node',
      instances: process.env.PM2_INSTANCES || 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3024,
        HOST: process.env.HOST || '0.0.0.0'
      }
    }
  ]
};
