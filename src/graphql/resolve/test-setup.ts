const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

async function cleanAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
}

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);

    for (const collectionName of collections) {
        try {
            await mongoose.connection.db.dropAllCollection(collectionName);
        }
        catch (error) {
            // can be ignored
            if (error.message === 'ns not found') return null;
            if (error.message.includes('a background operation is currently running')) return null;
            // log error to console
            console.log(error.message);
        }
    }
}

module.exports = {
    setubDB (dbName) {
        beforeAll( async () => {
            const url = `mongodb://localhost/${dbName}`;
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        });

        afterEach(async () => {
            await cleanAllCollections();
        });

        afterAll(async () => {
            await dropAllCollections();
            mongoose.connection.close();
        })
    }
}