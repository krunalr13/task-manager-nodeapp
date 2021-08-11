const { MongoClient, ObjectID} =  require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser : true, useUnifiedTopology: true }, (error, client)=> {
    if(error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     _id : id,
    //     name : 'Vikram',
    //     age : 26
    // }, (error, result) => {
    //         if(error) {
    //             return console.log('Unable to insert the document');
    //         }
    // });

    // db.collection('users').insertMany([{
    //     name : 'Sameer',
    //     age : 25
    // },
    // {
    //     name : 'Sumit',
    //     age : 23
    // }], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert the documents');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([{
    //     description : 'task 1',
    //     completed : true
    // },
    // {
    //     description : 'task 2',
    //     completed : false
    // }], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert the documents');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').findOne({ _id : new ObjectID("610e4975d20c9712d0cc003b")}, (error, task) => {
    //     console.log(task);
    // });

    // db.collection('tasks').find({ completed : false}).toArray((error, task) => {
    //     console.log(task);
    // });

    // db.collection('tasks').updateMany({completed : false}, {$set : {completed : true}})
    // .then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('users').deleteOne({age : 25})
    // .then((result) => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error)
    // });
})
