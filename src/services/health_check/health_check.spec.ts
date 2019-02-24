import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { app } from '../../index';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET Health Check', () => {
  it('should return status 200', () => {
    return chai
      .request(app)
      .get('/health_check')
      .then(res => {
        expect(res.status).to.eq(200);
      })
      .catch(err => expect(err).to.be.null);
  });
});
