import {Worker} from "worker_threads"
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {cpus} from "os"

const performCalculations = async () => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const workerFile = join(currentDir, "worker.js")

    const cpusNumber = cpus().length

    const res = new Array(cpusNumber)

    const getAllResults = () => res.filter(r => r.status).length === cpusNumber

    for (let i = 0; i < cpusNumber; i++) {
        const worker = new Worker(workerFile, {
            workerData: 10 + i
        })
        worker.on("message", (fiboResult) => {
            res[i] = {
                status: "resolved",
                data: fiboResult
            }
            if (getAllResults()) {
                console.log(res)
            }
        })
        worker.on("error", (msg) => {
            res[i] = {
                status: "error",
                data: null
            }
            if (getAllResults()) {
                console.log(res)
            }
        })
    }
};

await performCalculations();