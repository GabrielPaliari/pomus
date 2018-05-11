# Setting up

## Windows

Start by installing [Chocolatey](https://chocolatey.org/) (a package manager for windows) and [Node.js](https://nodejs.org/en/) (try installing version 9.11.1), then open your command prompt to install Python2 and Java JDK 8 via Chocolatey with the commands:

`choco install -y node.jsinstall python2 jdk8`

Then you want to install yarn via chocolatey with: 

`choco install yarn`

Yarn will be our node package manager. Then you will install the react-native client. There are two kinds of install with yarn: one is glboal and the other one is local to the project. To install the react-native client you want it to be global (so that you can start any react-native project anywhere), use:

`yarn global add react-native-cli`

Then you will need to install [Android Studio](https://facebook.github.io/react-native/docs/getting-started.html#1-install-android-studio) follow it until finishing android installation.

After that you should have everything set! Start the android virtual device. Go to the folder (/pomus/app/Pomus) and run the command:

`yarn install`

It uses as reference the file `package.json`, it looks there and sees the files installed in your `node_modules` folder, if there is anything different it will install the missing/different packages.

Whenever you pull this repository it is recommended to run: `yarn install` to update to the newest package.json

In the `package.json` you can 'script' a command. For example, suppose I want to go to a folder and run a command, instead of doing

`cd folder` and then `run command`

You can do
```
  "scripts": {
    "scriptCommand": "cd folder && run command"
  },

```
and then run it as `yarn scriptCommand` :D

The command we are using to compile the typescript and compile/start the app is `yarn start:android`

## Text editor

I recommend using [VisualStudio Code](https://code.visualstudio.com/) and using the TSLint extension :)

## Libraries used

- Typescript
- React-Navigation
- Styled-Components
- Google maps api
