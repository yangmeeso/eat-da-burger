// Import MySQL connection
var connection = require("../config/connection.js");

function questionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key="=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function(tableInput, bd) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            bd(result);
        });
    },
    insertOne: function(table, cols, vals, bd) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            bd(result);
        });
    },
    updateOne: function(table, objColVals, condition, bd) {
        var queryString = "UPDATE " + table;
        queryString += "SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            bd(result);
        });
    }
};

module.exports = orm;