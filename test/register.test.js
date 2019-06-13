const request = require('supertest');
const assert = require('assert')
const app = require('../index');
const User = require('../models/user');

describe('Clear the User Table', () => {
    describe('Register new User', () => {
        it('should add new user to the database', async () => {
            const res = await request(app)
                .post('/register')
                .send({ email: 'rajd@gmails.com', password: 'stro98$&o<', name: 'Raj Sharama' })
            //console.log(res)
            assert.ok((res.statusCode), 200);
        });

    });
});

/*describe('Conflit in Email', () => {
    it('should throw error if the email already taken', (done) => {
        request(app)
            .post('/register')
            .send({ email: 'rajd@gmails.com', password: 'stro98$&o<' })
            .end((req, res) => {
                expect(res.statusCode).toBe(409);

            });
        done();
    });
});
*/