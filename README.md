<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Forking
- First of all, [install GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your computer if you don't have it already;
- Go to [Ibidem back-end repository](https://github.com/ibidemgrupo/ibidem-back);
- At the upper right corner of the page click on the **fork** option;
- Choose **fork-ibidem-back** as the name of your fork;
- Go to your github repositories and click on the new **fork-ibidem-back** repository;
- Click on the green **code** button and copy de **HTTPS** url provided;
- Open a new terminal on your computer, it's recommended to open it in your desktop;
```
# create a folder called ibidem if you don't have it already
$ mkdir ibidem

# enter the folder
$ cd ibidem

# clone your fork
$ git clone <the HTTPS url you copied>

# enter your fork
$ cd fork-ibidem-back

# add a remote to the Ibidem back-end repository
$ git remote add ibidem-back https://github.com/ibidemgrupo/ibidem-back

# check if it worked
$ git remote -v

# fetch the ibidem-back remote, that will allow you to use it's branches later
$ git fetch ibidem-back
```

# Pulling
- If you didn't add a remote before fallow the **Forking** steps above;
- Open a new terminal on your computer and access the **fork-ibidem-back** folder;
- Make sure you are on the main branch of your fork;
- If you don't have the develop branch at your fork, create it;
```
# creating develop
$ git branch develop

# changing to develop
$ git checkout develop

# fetch and merge the ibidem-brack remote to your fork
$ git pull ibidem-back develop

# merge it with the branch you need
$ git checkout <branch name>

# merge
$ git merge develop
```

# Pull Request
- Push all your changes of your fork to the main branch of the same;
- Fallow the **Pulling** steps above to merge the remote develop with the main branch of your fork;
- If there are conflicts, solve it;
- Go to [Github](https://github.com) and access your repositories page;
- Click on the **fork-ibidem-back** repository;
- Click on the **contribute** option;
- Click on the **Open Pull Request** button;
- Make sure that the **base** option of the **base repository** is set to **develop** and that the **compare** option of the **head repository** is set to **main**;
- Click on the **Create Pull Request** option;
- Create a comment to describe what you have done;
- Click on the **Create Pull Request** option.
- **ATENTION!**: pass your changes into develop to the main branch of the remote, if and only if everything into the live application is proved to be working; 

# Runing the application
- You will need to install [Node](https://nodejs.org/en/) on your computer, install the LTS version;
- Open a new terminal on your computer and access the **fork-ibidem-back** folder;
```
# install dependencies
$ npm install

# run the application in development mode
$ npm run start:dev
```

# Deploying
- If you didn't setup your [Ec2](https://aws.amazon.com/ec2/) instance at AWS, fallow the steps from the [Ec2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) documentation;
- Remember that the security inbound rule for the Administrator security group must be an SSH one with the admnistrator and only the admnistrator current IP address;
- Remember that the security inbound rules for the Api Access security group must be 2 HTTP ones on port 80, one for any Ipv4 and another for any Ipv6; and another 2 HTTPS ones on port 443, one to any Ipv4 and another for any Ipv6;
- After averything is configured into the the Ec2 instance and in both back and front ibidem projects go to your Ec2 instace and choose connect;
- Fallow the SSH client steps and when running the ssh command make sure that the .pem path at the command is correct;
- **ATENTION!**: If you are on windows you must go to the section "connecting using putty" after this "deploying" section. Before following the next steps;
- You might have to update Your Virtual Machine using:
```
# Updatign the Virtual Machine
$ sudo yum update -y
```
- Into the Virtual Machine you will need to install Git, Nvm and Node;
```
# Installing Git
$ sudo yum install git -y
```
- You can check the [Nvm documentation](https://github.com/nvm-sh/nvm#install--update-script) for the installation 
```
# after the installation you might need to activate nvm by closing and opening the terminal or you can run the fallowing command
$ . ~/.nvm/nvm.sh

# install the same node version as the one in the ibidem-back project 
$ nvm install 16.14.0 (example)
```
- If the nginx is not configured in your instance, [fallow the configuration steps](https://www.nginx.com/blog/setting-up-nginx/) before continuing the deployment
```
# install nginx on the instance
$ sudo amazon-linux-extras install nginx1 -y

# start nginx on the instance
$ sudo systemctl start nginx

# check the nginx status
$ sudo systemctl status nginx

# configure the nginx files
$ sudo vim /etc/nginx/nginx.conf
```
- check out the [nginx docs](https://nginx.org/en/docs/) for more details on how to configure nginx
- configure the SSL certificate
- it is good to set redirect from a subdomain of yours
- to do it follow the [routing to ect instance docs](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html)

```
# install epel
$ sudo amazon-linux-extras install epel -y

# install certbot
$ sudo yum install -y certbot python-certbot-nginx

# run the certbot
$ sudo certbot

# to renew cert run
$ sudo certbot renew --dry-run
```
- Install [pm2](https://pm2.keymetrics.io), this will keep the server running in the remote machine
- Remember to configure a ecosystem.config.js file to set the pm2 environments variables
```
fork-ibidem-back/ecosystem.config.js
```
module.exports = {
  apps : [
    {
      name: "ibidem_app",
      script: "./dist/main.js",
      watch: true,
      env_production: {
          "PWD": "/home/ec2-user/ibidem-back"
      }
    }
  ]
}

```
# installing pm2
$ npm install pm2@latest -g

# clone the ibidem-back repository if the instance doesn't have it already
$ git clone https://github.com/ibidemgrupo/ibidem-back.git

# update the instace local main branch
$ cd ibidem-back
$ git pull

# you might be asked for a username and password
# enter the Grupo Ibidem organization username and a valid token (or create one token)

# Update the project dependencies
$ npm i

# build the application 
$ npm run build

# stop pm2 processes
$ pm2 stop all

# run the application in production mode
$ pm2 start ecosystem.config.js --env production
```

# Connecting using Putty
- if you do not have de private key in the .ppk format you need to convert it using PuttyGen;
- most of the times, PuttyGen comes together with Putty;
- Enter PuttyGen;
- Under Type of key to generate, choose RSA. If your version of PuTTYgen does not include this option, choose SSH-2 RSA;
- Choose Load. By default, PuTTYgen displays only files with the extension .ppk. To locate your .pem file, choose the option to display files of all types;
- Select your .pem file for the key pair that you specified when you launched your instance and choose Open. PuTTYgen displays a notice that the .pem file was successfully imported. Choose OK;
- To save the key in the format that PuTTY can use, choose Save private key. PuTTYgen displays a warning about saving the key without a passphrase. Choose Yes;
- Specify the same name for the key that you used for the key pair (for example, key-pair-name) and choose Save. PuTTY automatically adds the .ppk file extension;
- start Putty;
- in the category pane choose session;
- in the host name, do one of the following;
-- (Public DNS) To connect using your instance's public DNS name, enter instance-user-name@instance-public-dns-name.
-- (IPv6) Alternatively, if your instance has an IPv6 address, to connect using your instance's IPv6 address, enter instance-user-name@instance-IPv6-address.
- make sure the port value is 22;
- under connection type choose SSH;
- in the category pane choose connection, expand SSH, expand auth, choose credentials;
- on the private key file for authentication option, choose browse;
- browse for the .ppk file you converted erlier;
- choose open;
- it might apperar a warning, choose accept or connect once



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
