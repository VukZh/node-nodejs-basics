import {workerData, parentPort} from "worker_threads"

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    const n = workerData;

    // check error case

    // if (n === 13) {
    //     throw Error('oops')
    // }

    parentPort.postMessage(nthFibonacci(n))
};

sendResult()