import {readFile, access} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from 'url';

const read = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const readFilePath = join(currentDir, "files", "fileToRead.txt")

    try {
        await access(readFilePath);
        const readFileContent = await readFile(readFilePath, {encoding: "ascii"});
        console.log(readFileContent)
    } catch (error) {
        throw new Error("FS operation failed")
    }
};

await read();