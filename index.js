#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
let data = require('./data.json');

let addExcuseToJsonFile = (excuse) => {
    data.push(excuse);
    try {
        let file = './data.json';
        fs.writeFile(file, JSON.stringify(data), (err) => {
            if (err) throw err;
        })
    } catch (ex) {
        console.log('Something went wrong saving your excuse: ', ex);
    }
};

program
    .version('0.0.1')
    .description('You can simply get an awesome excuse to stay home today! To get more tailored excuses, pass any optional properties below.')
    .option('-k, --kids', 'Pass option if you have kids')

program
    .command('add excuse <excuse>')
    .description('You can add your own excuses too once you see them trickling into your email and your jaw hits the keyboard. Management beleived it -- so why not reuse it! IMPORTANT: This is not persistent in a DB, only to flat file.')
    .action(addExcuseToJsonFile);

program.parse(process.argv);

/**
 * Main function for self executing command to get an excuse
 */
(() => {
    if (!program.args.length) {
        const getExcuse = () => {
            let hasKids = program.kids;
            let selectedExcuse = data[Math.floor(Math.random() * data.length)]

            if (!hasKids) {
                // dirty check using regex against 'kid/children/son/daughter' - TODO: Make this AI and deep learning :)
                const kidsRegExp = /kid|kids|child|children|son|daughter|little ones/;
                if (selectedExcuse.search(kidsRegExp) > -1)
                    return getExcuse();
            }

            // output as console log
            console.log(selectedExcuse);
        }

        getExcuse();
    }
})();
