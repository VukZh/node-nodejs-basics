import {pipeline, Transform} from "stream"

const transform = async () => {
    const readStream = process.stdin
    const writeStream = process.stdout
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const chunkStr = chunk.toString().trim();
            const reverseChunkStr = chunkStr.split('').reverse().join('')
            this.push(reverseChunkStr + '\n');
            callback()
        }
    })

    try {
        await pipeline(readStream, reverseStream, writeStream, (err) => {
            if (err) throw new Error("transform error")
        })
    } catch (error) {
        console.log(error)
    }
};

await transform();