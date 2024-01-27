import {spawn} from "child_process"
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const spawnChildProcess = async (args) => {
    const currentFilePath = fileURLToPath(import.meta.url)
    const currentDir = dirname(currentFilePath)
    const childFile = join(currentDir, "files", "script.js")
    const spawned = spawn('node', [childFile, ...args])
    process.stdin.pipe(spawned.stdin);
    spawned.stdout.pipe(process.stdout);
    spawned.on('exit', code => {
        console.log("child has just closed with code", code)
    })
};

spawnChildProcess([11, '2s2', [1, 2, true]]);
