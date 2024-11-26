import fs from 'node:fs/promises'
import { TEMP_UPLOAD_DIR,UPLOAD_DIR } from '../constants/index.js'
import path from 'node:path'
export const saveFileToUploadDir = async file => {
    const newPath = path.join(UPLOAD_DIR, file.filename)
    await fs.rename(file.path,newPath)
}