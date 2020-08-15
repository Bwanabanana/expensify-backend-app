var AWS = require('aws-sdk');

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region: 'eu-west-2' });

exports.handler = (event, context, callback) => {

    console.log("Event\n" + JSON.stringify(event, null, 2));

    var params = {
        Key: {
            'userKey': { S: event.sub },
            'dataKey': { S: event.expenseId }
        },
        TableName: 'expensify-user-data'
    };

    ddb.deleteItem(params, function (err, data) {

        if (err) {
            console.log("Failed to delete user data", err);

            callback(err);

        } else {
            console.log("Deleted user data successfully", data);

            callback(null, JSON.stringify({}));
        }
    });

};