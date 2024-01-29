import {rm, access} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from 'url';

const remove = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const removeFilePath = join(currentDir, "files", "fileToRemove.txt")

    try {
        await access(removeFilePath)
        await rm(removeFilePath)
        console.log("fileToRemove.txt removed")
    } catch (error) {
        throw new Error("FS operation failed")
    }

};

await remove();