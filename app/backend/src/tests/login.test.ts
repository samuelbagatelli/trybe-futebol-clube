import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserController from '../controllers';

const userController = new UserController();

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Integration tests for the /login endpoint', function () {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  })

  it('tests if its possible to login with valid credentials', async function () {
    const validCredentials = {
      email: "admin@admin.com",
      password: "secret_admin"
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"

    sinon
      .stub(userController, 'login')
      .resolves(token as any);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(validCredentials);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(token);
  })
})