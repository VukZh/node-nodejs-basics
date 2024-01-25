import {mkdir, copyFile, readdir, access} from "fs/promises";
import {dirname, join} from "path";
import {fileURLToPath} from 'url';

const copy = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const newFilesDir = join(currentDir, "files_copy")

    try {
        await access(newFilesDir);
        throw new Error("FS operation failed")
    } catch (error) {

        if (error.code === "ENOENT") {
            try {
                const filesDir = join(currentDir, "files")
                const filesArray = await readdir(filesDir);
                await mkdir(newFilesDir)

                for (const file of filesArray) {
                    const pathFrom = join(currentDir, "files", file)
                    const pathTo = join(currentDir, "files_copy", file)
                    await copyFile(pathFrom, pathTo)
                }
            } catch (error) {
                throw new Error("FS operation failed")
            }
        } else {
            throw error
        }
    }

};

await copy();
