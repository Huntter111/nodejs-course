import fs from 'fs'
import path from 'path'

const TMP_DIR = path.join(process.cwd(), 'uploads-tmp')

export function cleanupTmpUploads() {
	if (!fs.existsSync(TMP_DIR)) return

	const files = fs.readdirSync(TMP_DIR)
	for (const file of files) {
		fs.unlinkSync(path.join(TMP_DIR, file))
	}

	console.log(`🧹 tmp cleaned: ${files.length} files`)
}
