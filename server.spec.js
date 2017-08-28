const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./server')
const should = chai.should()

chai.use(chaiHttp)

describe('Server', function() {
  it('should have been imported', function() {
    should.exist(server)
    server.should.be.an('object')
  })
})
