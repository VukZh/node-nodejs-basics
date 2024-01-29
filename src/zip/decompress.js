import {dirname, join} from "path";
import {fileURLToPath} from 'url';
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"
import zlib from "zlib"

const decompress = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const archiveFilePath = join(currentDir, "files", "archive.gz")
    const decompressFilePath = join(currentDir, "files", "fileToCompress2.txt")
    const readStream = createReadStream(archiveFilePath)
    const writeStream = createWriteStream(decompressFilePath)
    const gunzipStream = zlib.createGunzip()
    try {
        await pipeline(readStream, gunzipStream, writeStream, (err) => {
            if (err) throw new Error("decompress error")
        })
    } catch (error) {
        console.log(error)
    }
};

await decompress();