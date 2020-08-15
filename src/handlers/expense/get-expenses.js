var AWS = require('aws-sdk');

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region: 'eu-west-2' });

exports.handler = (event, context, callback) => {

    console.log("Event\n" + JSON.stringify(event, null, 2));

    var params = {
        ExpressionAttributeValues: {
            ':u': { S: event.sub }
        },
        KeyConditionExpression: 'userKey = :u',
        ProjectionExpression: 'userKey, dataKey, dataValue',
        TableName: 'expensify-user-data'
    };

    ddb.query(params, function (err, data) {

        if (err) {
            console.log("Failed to retrieve user data", err);

            callback(err);

        } else {
            console.log("Retreived user data", data);

            var expensesData = [];
            data.Items.forEach(function (element) {

                console.log("user: " + element.userKey.S + ", key: " + element.dataKey.S + ", value: " + JSON.stringify(element.dataValue));

                const expense = {
                    "id": element.dataKey.S,
                    "description": element.dataValue.M.description.S,
                    "note": element.dataValue.M.note.S,
                    "amount": parseInt(element.dataValue.M.amount.N, 10),
                    "createdAt": parseInt(element.dataValue.M.createdAt.N, 10)
                };

                expensesData.push(expense);
            });

            console.log("result: " + JSON.stringify({ expenses: expensesData }));

            callback(null, JSON.stringify({ expenses: expensesData }));
        }
    });

};