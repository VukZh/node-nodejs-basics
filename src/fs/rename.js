import {rename as renameFS, access} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from 'url';

const rename = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const oldFilePath = join(currentDir, "files", "wrongFilename.txt")
    const newFilePath = join(currentDir, "files", "properFilename.md")

    try {
        await access(newFilePath);
        throw new Error("FS operation failed")
    } catch (error) {

        if (error.code === "ENOENT") {
            try {
                await access(oldFilePath)
                await renameFS(oldFilePath, newFilePath)
            } catch (error) {
                throw new Error("FS operation failed")
            }
        } else {
            throw error
        }
    }

};

await rename();