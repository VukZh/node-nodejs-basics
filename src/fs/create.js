import {writeFile, access} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from 'url';

const create = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const newFilePath = join(currentDir, "files", "fresh.txt")

    try {
        await access(newFilePath);
        throw new Error("FS operation failed")
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(newFilePath, 'I am fresh and young');
        } else {
            throw error
        }
    }
};

await create();