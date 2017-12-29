const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  printMessage,
} = require('./utils')

module.exports = {
  helpers: {
    if_or: function(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    build: {
      type: 'list',
      message: 'Vue build',
      choices: [
        {
          name: 'Runtime + Compiler: recommended for most users',
          value: 'standalone',
          short: 'standalone',
        },
        {
          name:
            'Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere',
          value: 'runtime',
          short: 'runtime',
        },
      ],
    },
    "router": {
      "type": "confirm",
      "message": "Install vue-router?",
       "default": false
    },
    unit: {
      type: 'confirm',
      message: 'Set up unit tests',
    },
    e2e: {
      type: 'confirm',
      message: 'Setup e2e tests',
      "default": false
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    'config/test.env.js': 'unit || e2e',
    'test/unit/**/*': 'unit',
    'test/unit/jest.conf.js': "unit",
    'test/unit/setup.js': "unit",
    'test/e2e/**/*': 'e2e',
    'src/router/**/*': 'router',
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, green)
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
