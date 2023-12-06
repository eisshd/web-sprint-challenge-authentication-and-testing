// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server.js')

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

