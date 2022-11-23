import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';
import tokenMock from './mocks/users.login.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Integration tests for the Users section', () => {
  let chaiHttpResponse: Response;

  after(() => {
    sinon.restore();
  })

  it('You\'re able to login with the correct credetials', async () => {
    sinon
      .stub(Users, "create")
      .resolves(tokenMock as Users);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        usersname: 'username',
        password: 'password'
      });

    console.log(chaiHttpResponse.body);

    console.log(tokenMock);

    expect(chaiHttpResponse.body).to.be.eq(tokenMock);
  });
});