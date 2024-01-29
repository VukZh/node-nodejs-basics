import {Worker} from "worker_threads"
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {cpus} from "os"

const performCalculations = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const workerFile = join(currentDir, "worker.js")

    const cpusNumber = cpus().length

    const workersArray = []

    for (let i = 0; i < cpusNumber; i++) {
        const createPromisifyWorker = () => {
            return new Promise(resolve => {
                const worker = new Worker(workerFile, {
                    workerData: 10 + i
                })
                worker.on("message", (fiboResult) => {
                    resolve({
                        status: "resolved",
                        data: fiboResult
                    })
                })
                worker.on("error", (msg) => {
                    resolve({
                        status: "error",
                        data: null
                    })
                })
            })
        }
        workersArray.push(createPromisifyWorker())
    }
    const res = await Promise.all(workersArray)
    console.log(res)
};

await performCalculations();