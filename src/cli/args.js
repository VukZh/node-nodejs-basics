const parseArgs = () => {
    const args = process.argv;
    let parsedArguments = []
    for (let i = 2; i <= args.length - 1; i += 2) {
        parsedArguments.push(` ${args[i]} is ${args[i + 1]}`)
    }
    console.log(parsedArguments.toString())
};

parseArgs();