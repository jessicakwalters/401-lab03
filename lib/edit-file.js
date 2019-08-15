'use strict';

const fs = require('fs-extra');

class FileManager {

  getFile( filePath, callback ){

    fs.readFile( filePath, ( error, data ) => {
      if ( error ) {
        throw error;
      } else callback( undefined, JSON.parse( data ) );
    });
  
  }

  editFile ( filePath, data, callback ){

    fs.writeFile( filePath, JSON.stringify( data ), ( error ) => {
      if ( error ) {
        throw error;
      } else callback( undefined );
    });

  }

}

module.exports = FileManager;