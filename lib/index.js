const FileManager = require('./edit-file');
const edit = new FileManager();

const file = `${__dirname}/person.json`;

file.getFile(file, callback:(error, fileContents) => {
    if (error) {
        console.log(error);
    } else {

        fileContents.firstName = faker.name.firstName();
        fileContents.lastName = faker.name.lastName();

        console.log('Callback: Changed Object', fileContents);

        let buffer = Buffer.from(JSON.stringify(fileContents));
        edit.writeFile(file, buffer, callback: (error) => {

            if(error){
                console.error(error);            
            } else {
                edit.readFile(file, callback:(error, fileContents) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Callback: data from updated file', fileContents);
                    }
                })
            }
        })
    }
})

edit.readFilePromises(file)
    .then(fileContents => {
        return JSON.parse(fileContents.toString());
    })
    .then(onfulfilled: object => {
        object.firstName = faker.name.firstName();
        object.lastName = faker.name.lastName();

        console.log('Promise, changed object', object);

        let buffer = Buffer.from(JSON.stringify(object));

        edit.writeFilePromise(file, buffer);
    })

    .then(onfulfilled:() => {
        return edit.readFilePromises(file);
    })

    .then(onfulfilled: fileContents => {
        console.log('Promise, data updated', JSON.parse(fileContents.toString()))
    })
    
    .catch( (error) => {
        console.error(error);
    })
