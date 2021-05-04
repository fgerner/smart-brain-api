const signin = require('./signin');
const bcrypt = require('bcrypt-nodejs');
const knex = require("knex");

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

test('handles login', ()=> {
    const su = signin.signinAuthentication(db, bcrypt)
    console.log(su);
    expect(su).not.toBeNull();
})