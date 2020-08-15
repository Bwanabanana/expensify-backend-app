var AWS = require('aws-sdk');
var uuid = require('uuid');

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region: 'eu-west-2' });

exports.handler = (event, context, callback) => {

    console.log("Event\n" + JSON.stringify(event, null, 2));

    var dataKey = uuid();
    var params = {
        Item: {
            'userKey': { S: event.sub },
            'dataKey': { S: dataKey },
            'dataValue': {
                M: {
                    'description': { S: event.expense.description },
                    'note': { S: event.expense.note },
                    'amount': { N: event.expense.amount },
                    'createdAt': { N: event.expense.createdAt }
                }
            }
        },
        TableName: 'expensify-user-data'
    };

    ddb.putItem(params, function (err, data) {

        if (err) {
            console.log("Failed to add user data", err);

            callback(err);

        } else {
            console.log("Added user data successfully", data);

            callback(null, JSON.stringify({ id: dataKey }));
        }
    });

};