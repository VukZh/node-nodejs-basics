import {dirname, join} from "path";
import {fileURLToPath} from 'url';
import {pipeline} from "stream"
import {createReadStream} from "fs"

const read = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const readFile = join(currentDir, "files", "fileToRead.txt")
    const readStream = createReadStream(readFile)
    const writeStream = process.stdout

    try {
        await pipeline(readStream, writeStream, (err) => {
            if (err) throw new Error("read file error")
        })
    } catch (error) {
        console.log(error)
    }
};

await read();