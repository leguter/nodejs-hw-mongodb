import fs from 'node:fs/promises'
export const createDirIfNotExist = async (url) => {
    try {
    await fs.access(url)
    } catch(err) {
    if(err.code === 'ENOENT') {
        fs.mkdir(url)
    }
    }

}