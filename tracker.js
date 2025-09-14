    import {existsSync, promises as fs} from 'fs';
    import readline from 'readline';

    const dataFile = 'data.json';


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


export { checkFile, readData, getDate, writeData };
