import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const folder = 'public/jocuri'
const dataFile = 'src/data/gonflabile.js'
const dataText = await readFile(dataFile, 'utf8')
const referencedFiles = new Set([...dataText.matchAll(/\/jocuri\/([^'"`]+)/g)].map((match) => decodeURIComponent(match[1])))
const entries = await readdir(folder, { withFileTypes: true })
const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name)
let hasMissing = false

for (const file of referencedFiles) {
  try {
    await stat(path.join(folder, file))
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Missing referenced jocuri file: ${file}`)
      hasMissing = true
    } else {
      throw error
    }
  }
}

for (const file of files) {
  const fileInfo = await stat(path.join(folder, file))
  console.log(`${file}: ${(fileInfo.size / 1024).toFixed(1)} KB`)
  if (fileInfo.size > 300 * 1024) console.warn(`Warning: ${file} is over 300 KB`)
  if (!referencedFiles.has(file)) console.warn(`Warning: unreferenced jocuri file: ${file}`)
}

if (hasMissing) process.exitCode = 1
