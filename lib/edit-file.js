'use strict';

const fsE = require('fs-extra');

class FileManager {

  getFile( filePath, callback ){

    fsE.readFile( filePath, ( error, data ) => {
      if ( error ) {
        throw error;
      } else {
        callback( undefined, JSON.parse( data ) );
      }
      //if you wanted to add another file to be read after the first file, it would have to go here. 
    });
  
  }

  editFile ( filePath, data, callback ){

    fsE.writeFile( filePath, JSON.stringify( data ), ( error ) => {
      if ( error ) {
        throw error;
      } else callback( undefined );
    });

  }

  getFilePromises(fileName){
    //returns a promise
    return fsE.readFile(fileName);
  }

  editFilePromises(fileName, data){
    //returns a promise
    return fsE.writeFile(fileName, data);
  }

}

module.exports = FileManager;