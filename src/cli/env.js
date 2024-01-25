const parseEnv = () => {
    const envs = process.env;
    const envsArray = []
    for (const [k, v] of Object.entries(envs)) {
        if (k.startsWith('RSS_')) {
            envsArray.push(`${k}=${v}`)
        }
    }
    console.log("envs: ", envsArray.join('; '))
};

parseEnv();