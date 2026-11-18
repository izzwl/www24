module.exports = {
  apps: [
    {
      name: 'www24',
      script: './.output/server/index.mjs',
      instances: 'max',       // Menggunakan semua core CPU yang tersedia (atau tentukan angka, misal: 1 atau 2)
      exec_mode: 'cluster',   // Mode cluster untuk load balancing multi-core
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3024,
        HOST: '0.0.0.0'
      }
    }
  ]
};
