/**
 * Created by nap on 16/12/17.
 */

const {spawn, exec} = require('child_process')
const app = require('../server/app') // eslint-disable-line
const config = require('../server/local/config')

process.chdir(__dirname)

process.env.PORT = config.server.port + 1

let roadhog = null

if (process.platform === 'win32') {
  roadhog = exec('roadhog server', {
    cwd: './../'
  })

  roadhog.stdout.on('data', (data) => {
    console.log(data)
  })

  roadhog.stderr.on('data', (data) => {
    console.log(data)
  })
} else {
  roadhog = spawn('roadhog', ['server'], {
    env: process.env,
    cwd: './../',
    stdio: 'inherit'
  })
}

roadhog.on('close', (code) => {
  console.log(`roadhog process exited with code ${code}`)
  process.exit(0)
})

process.on('exit', code => {
  roadhog.kill('SIGHUP')
})
