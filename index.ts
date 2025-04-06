import CronParser from './cron_parser';

const main = () => { 
    if (process.argv.length !== 3) { 
        console.error("Usage: your-program \"<cron-string>\""); 
        process.exit(1); 
    } 

    const cronString = process.argv[2]; 
    console.log("cronString",cronString)
    const parser = new CronParser(cronString); 

    try { 
        const result = parser.parse(); 
        console.log(result); 
    } catch (error:any) { 
        console.error(error.message); 
    } 
}; 

main();