    import {existsSync, promises as fs} from 'fs';
    import readline from 'readline';

    const dataFile = 'data.json';


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
     async function checkFile() {
         if(!existsSync(dataFile)){
           await fs.writeFile(dataFile,`[]`);
        }     
     }


    function getDate(){
        return new Date().toISOString().split("T")[0];
    }


    async function readData() {
        try{
        const content = await fs.readFile(dataFile,'utf8');
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [];
        } catch(err) {
            console.error('unxpected error: ', err);
            return [];
        }
    }

    async function writeData(data) {
        await fs.writeFile(dataFile,JSON.stringify(data,null,2));
    }



    async function tracker(){
        rl.question("press enter to begin the timer", async () =>{
            let seconds = 0;


            const interval = setInterval(() => {
                seconds++;
                process.stdout.write(`\r${seconds}s`);
            }, 1000);

        rl.question("\nEnter again to stop: ", async () =>{
            clearInterval(interval);
            console.log(`\nTimme stopped at : ${seconds}`);

        const today = getDate();
        const data = await readData();
        data.push({date: today, duration: seconds});
        await writeData(data);

        
        console.log(`successfully saved.`,today);

        rl.close();

            })
        })
    }

async function main() {
    await checkFile();
    tracker();
}
    

export { checkFile, readData, getDate, writeData };
