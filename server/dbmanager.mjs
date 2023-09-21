import * as fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;
import * as url from 'url';

var client;

export function connectToDB(req, res) {
    //env isn't loaded by this point, not sure why
    const postgresqlUri = `postgres://avnadmin:${process.env.AIVENPASS}@vanilla-wiki-db-vanilla-wiki-db.aivencloud.com:20377/defaultdb?sslmode=require`;
    const conn = new URL(postgresqlUri);
    conn.search = "";

    const config = {
        connectionString: conn.href,
        ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('./ca.pem').toString(),
        },
    };

    client = new Client(config);
    client.connect(function (err) {
        if (err)
            console.log(err);
        else
        {
            client.query("SELECT VERSION()", [], function (err, result) {
                if (err)
                    throw err;

                console.log(result.rows[0].version);
                client.end(function (err) {
                    if (err)
                        throw err;
                });
            });
        }

    });
}
