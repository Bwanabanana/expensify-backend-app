exports.handler = (event, context, callback) => {

    console.log("Environment Variables\n" + JSON.stringify(process.env, null, 2));
    console.log("Event\n" + JSON.stringify(event, null, 2));
    console.log("Context\n", JSON.stringify(context, null, 2));

    const response = {
        expenses: [
            {
                id: "19e2f530-22a0-4d50-8621-50f8b9c922e9",
                description: "Rent",
                note: "You're paying my rent",
                amount: 15001,
                createdAt: 1594651588721
            }, {
                id: "19e2f530-22a0-4d50-8621-50f8b9c922e1",
                description: "Gas",
                note: "Jumping Jack Flash",
                amount: 10000,
                createdAt: 1594751588721
            }, {
                id: "19e2f530-22a0-4d50-8621-50f8b9c922e0",
                description: "Travel",
                note: "Travel to unravel",
                amount: 100000,
                createdAt: 1594851588721
            }
        ]
    };

    callback(null, JSON.stringify(response));
};