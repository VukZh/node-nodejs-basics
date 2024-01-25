import {readdir} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from 'url';

const list = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const filesDir = join(currentDir, "files")

    try {
        const filesArray = await readdir(filesDir);
        console.log("files from 'files' directory ", filesArray)
    } catch (error) {
        throw new Error("FS operation failed")
    }
};

await list();