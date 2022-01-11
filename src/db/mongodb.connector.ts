/**
 * dbConnector for mongodb with Mongoose
**/
import mongoose from "mongoose";

const dbConnector = new Promise<boolean>((resolve, reject) => {
    console.log('connecting to DB');
    const dbuser: string | undefined = process.env.DBUSER;
    let dbpwd: string | undefined = process.env.DBPWD;

    let authString: string = '';
    if (dbuser && dbpwd) {
        dbpwd = encodeURIComponent(dbpwd);
        authString = `${dbuser}:${dbpwd}@`
    }

    mongoose.connect(`mongodb://${authString}localhost:27017/${process.env.DBNAME}?authSource=admin`);

    const dbConnection = mongoose.connection;
    dbConnection.on('error', () => {
        console.error("Error while connecting to DB");
        reject(false);
    });

    dbConnection.on('connected', () => {
        console.log('connected to DB');
        resolve(true);
    });
});

export { dbConnector };