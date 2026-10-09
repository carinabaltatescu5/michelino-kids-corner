import { readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const galleries = [
  { id: 'masuta', dir: 'public/masuta', prefix: 'masuta' },
  { id: 'masa', dir: 'public/masa', prefix: 'masa' },
]
const imagePattern = (prefix) => new RegExp(`^${prefix}.*\\.(jpe?g|png|webp|avif)$`, 'i')
const collator = new Intl.Collator('ro', { numeric: true, sensitivity: 'base' })

async function readGallery(config) {
  let files
  try {
    files = await readdir(config.dir)
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }

  const matchingFiles = files.filter((file) => imagePattern(config.prefix).test(file)).sort(collator.compare)
  for (const file of matchingFiles) {
    const fileInfo = await stat(path.join(config.dir, file))
    if (fileInfo.size > 600 * 1024) console.warn(`Warning: ${path.join(config.dir, file)} is over 600 KB`)
  }

  const folder = config.dir.replace(/^public[\\/]/, '').replaceAll('\\', '/')
  return matchingFiles.map((file) => `/${folder}/${encodeURIComponent(file)}`)
}

const generated = {}
for (const config of galleries) {
  generated[config.id] = await readGallery(config)
  console.log(`${config.id}: ${generated[config.id].length} photos`)
}

const output = `// AUTO-GENERATED, do not edit\n\nexport const galeriiFoto = ${JSON.stringify(generated, null, 2)}\n`
await writeFile('src/data/galerii.generated.js', output, 'utf8')
