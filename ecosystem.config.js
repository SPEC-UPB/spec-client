module.exports = {
  apps : [{
    name:"client",
    script: 'serve',
    watch: '.',
    env: {
      PM2_SERVE_PATH: './spec-client/build',
      PM2_SERVE_PORT: 3000,
      PM2_SERVE_SPA: 'true',
    }
  }, 
  {
    name:"python-server",
    script: './spec-pyhton-server/app.py',
    watch: ['./spec-pyhton-server']
  },
  {
    name:"admin",
    script: 'admin.sh',
    watch: ['./Solar-Admin']
  }
]
};
