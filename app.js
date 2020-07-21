const csv = require('csv-parser');
const {Parser} = require('json2csv');
const fs = require('fs');
import _ from 'lodash';
import Loaders from "./loaders/init";
import UserStack from "./services/userStack/userStack";

const app = async () => {
    const startObjects = new Loaders();
    await startObjects.init()
    const userStackService = new UserStack(startObjects.cache);
    const csvArgIndex = 2;
    if (process.argv.length < csvArgIndex + 1) {
        throw("No csv file selected")
    }
    const resultsPromises = [];
    fs.createReadStream(process.argv[csvArgIndex])
        .pipe(csv())
        .on('data', (data) => {
            resultsPromises.push(handleCsvLine(data, userStackService));
        })
        .on('end', async () => {
            let res = await Promise.all(resultsPromises)
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(res);
            console.log(csv);
        });
}

const handleCsvLine = async (line, userStackService) => {
    const additionalData = await userStackService.getUaDeviceData(line.userAgent);
    return _.mergeWith({}, line, (additionalData || {}),
        (origin, additional) => _.isNull(origin) ? additional : origin)
}

app()