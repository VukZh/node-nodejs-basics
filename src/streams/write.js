import {dirname, join} from "path";
import {fileURLToPath} from 'url';
import {pipeline} from "stream"
import {createWriteStream} from "fs"

const write = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const readStream = process.stdin
    const writeFile = join(currentDir, "files", "fileToWrite.txt")
    const writeStream = createWriteStream(writeFile)

    try {
        await pipeline(readStream, writeStream, (err) => {
            if (err) throw new Error("write file error")
        })
    } catch (error) {
        console.log(error)
    }
};

await write();