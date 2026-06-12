/**
 * Démarre `next dev` en arrêtant proprement une instance précédente (lock .next/dev/lock).
 */
import { spawn, execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const lockPath = path.join(root, '.next', 'dev', 'lock')

function processAlive(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function sleep(ms) {
  const end = Date.now() + ms
  while (Date.now() < end) {
    /* spin */
  }
}

function stopExistingDev() {
  if (!fs.existsSync(lockPath)) return
  let info
  try {
    info = JSON.parse(fs.readFileSync(lockPath, 'utf8'))
  } catch {
    try {
      fs.unlinkSync(lockPath)
    } catch {
      /* ignore */
    }
    return
  }
  if (!info?.pid) return

  if (processAlive(info.pid)) {
    console.log(`[sisayiti] Arrêt du serveur Next existant (PID ${info.pid})…`)
    try {
      if (process.platform === 'win32') {
        execSync(`taskkill /PID ${info.pid} /F /T`, { stdio: 'ignore' })
      } else {
        process.kill(info.pid, 'SIGTERM')
      }
    } catch {
      /* déjà arrêté */
    }
    sleep(1200)
  }

  try {
    fs.unlinkSync(lockPath)
  } catch {
    /* ignore */
  }
}

stopExistingDev()

const child = spawn('npx', ['next', 'dev'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code) => process.exit(code ?? 0))
