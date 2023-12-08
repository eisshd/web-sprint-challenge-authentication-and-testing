// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server.js')
const bcrypt = require('bcryptjs')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('auth-router.js', () => {
  describe('registers a new account', () => {
    it.todo('[1] In order to register a new account the client must provide `username` and `password`', () => {

    })
    it.todo('[2] responds with the correct message on SUCCESSFUL registration', () => {

    })
    it.todo('[3] responds with the correct message on missing `username` and `password`', () => {

    })
    it.todo('[4] responds with the correct message on "username taken"', () => {

    })
  })
  describe('log into an existing account', () => {
    it.todo('[5] In order to log into an existing account the client must provide `username` and `password`', () => {

    })
    it.todo('[6] responds with the correct message on SUCCESSFUL login', () => {

    })
    it.todo('[7] responds with the correct message on missing `username` and `password`', () => {

    })
    it.todo('[8] responds with the correct message due to `username` not existing in the db', () => {

    })
    it.todo('[9] responds with the correct message due to `password` being incorrect', () => {

    })
  })
})

describe('restricted.js', () => {
  it.todo('[10] On valid token in the Authorization header, call next', () => {

  })
  it.todo('[11] responds with the correct message on missing token', () => {

  })
  it.todo('[12] responds with the correct message on invalid or expired token', () => {

  })

})

describe('server.js', () => {
  it.todo('[13] only logged-in users should have access to /api/jokes', () => {
  })
})