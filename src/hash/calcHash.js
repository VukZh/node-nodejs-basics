import {dirname, join} from "path";
import {fileURLToPath} from 'url';
import {pipeline} from "stream"
import {createHash} from "crypto"
import {createReadStream} from "fs"

const calculateHash = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const encodedFile = join(currentDir, "files", "fileToCalculateHashFor.txt")

    const readStream = createReadStream(encodedFile)
    const encodedStream = createHash("sha256")
    encodedStream.setEncoding('hex')
    const writeStream = process.stdout

    try {
        await pipeline(readStream, encodedStream, writeStream, (err) => {
            if (err) throw new Error("calculateHash error")
        })
    } catch (error) {
        console.log(error)
    }
};

await calculateHash();