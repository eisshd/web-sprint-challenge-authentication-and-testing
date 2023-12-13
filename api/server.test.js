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
    it('[1] In order to register a new account the client must provide `username` and `password`', async () => {
      await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar' })
      const user = await db('users').where('username','Captain Marvel').first()
      expect(user).toMatchObject({ username: 'Captain Marvel'})
    }, 750)
    it('[2] responds with the correct message on SUCCESSFUL registration', async () => {
      const res = await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar'})
      const hash = res.body.password
      expect(res.body).toEqual({id: 1, username: 'Captain Marvel', password: hash})
      expect(bcrypt.compareSync('foobar', res.body.password)).toBeTruthy()
    }, 750)
    it('[3] responds with the correct message on missing `username` and `password`', async () => {
      const res = await request(server).post('/api/auth/register').send({})
      expect(res.body).toEqual({message: 'username and password required'})
    })
    it('[4] responds with the correct message on "username taken"', async () => {
      await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar'})
      const res = await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar'})
      expect(res.body).toEqual({message: 'username taken'})
    })
  })
  describe('log into an existing account', () => {
    it('[5] responds with the correct message on SUCCESSFUL login', async () => {
      await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar'})
      const res = await request(server).post('/api/auth/login').send({ username: 'Captain Marvel', password: 'foobar'})
      expect(res.body).toEqual({message: 'Welcome Captain Marvel'})
    })
    it('[6] responds with the correct message on missing `username` and `password`', async () => {
      await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar'})
      const res = await request(server).post('/api/auth/login').send({})
      expect(res.body).toEqual({message: 'username and password required'})
    })
    it('[7] responds with the correct message due to `username` not existing in the db', async  () => {
      const res = await request(server).post('/api/auth/login').send({username: 'Captain Marvel', password: 'foobar'})
      expect(res.body).toEqual({message: 'Invalid credentials'})
    })
    it('[8] responds with the correct message due to `password` being incorrect', async () => {
      await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar'})
      const res = await request(server).post('/api/auth/login').send({username: 'Captain Marvel', password: 'baz'})
      expect(res.body).toEqual({message: 'Invalid credentials'})
    })
  })
})