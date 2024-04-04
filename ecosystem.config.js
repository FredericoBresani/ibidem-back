module.exports = {
  apps: [
    {
      name: 'ibidem_app',
      script: './dist/main.js',
      watch: true,
      env_production: {
        PWD: '/home/ec2-user/ibidem-back',
      },
    },
  ],
};
