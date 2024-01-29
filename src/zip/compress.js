import {dirname, join} from "path";
import {fileURLToPath} from 'url';
import {createReadStream, createWriteStream} from "fs"
import {pipeline} from "stream"
import zlib from "zlib"

const compress = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const compressFilePath = join(currentDir, "files", "fileToCompress.txt")
    const archiveFilePath = join(currentDir, "files", "archive.gz")
    const readStream = createReadStream(compressFilePath)
    const writeStream = createWriteStream(archiveFilePath)
    const gzipStream = zlib.createGzip()
    try {
        await pipeline(readStream, gzipStream, writeStream, (err) => {
            if (err) throw new Error("compress error")
        })
    } catch (error) {
        console.log(error)
    }
};

await compress();