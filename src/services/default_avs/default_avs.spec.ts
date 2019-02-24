import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { pack } from '../../helpers';
import { app } from '../../index';
import { DefaultAvailability } from './default_avs.model';

chai.use(chaiHttp);
const expect = chai.expect;

const BASE_URL = '/default_avs';

describe('GET default availabilities by ID', () => {
  let av = new DefaultAvailability({
    day: 1,
    end: 200,
    start: 100,
    userId: 'randomUserId'
  });

  before((done: MochaDone) => {
    av.save()
      .then(s => {
        av = s;
        done();
      })
      .catch(done);
  });

  it('should return the AV if found', (done: MochaDone) => {
    chai
      .request(app)
      .get(`${BASE_URL}/${av._id}`)
      .then(res => {
        expect(res.status).to.eq(200);
        expect(res.body).to.deep.equal(pack(av));
        done();
      })
      .catch(done);
  });

  it('should return error if invalid ID', (done: MochaDone) => {
    chai
      .request(app)
      .get(`${BASE_URL}/hello`)
      .then(res => {
        expect(res.status).to.eq(400);
        done();
      })
      .catch(done);
  });

  it('should return not found if not existant', (done: MochaDone) => {
    const packed = pack(av);
    const newId = packed._id.substr(0, packed._id.length - 1) + '0';
    chai
      .request(app)
      .get(`${BASE_URL}/${newId}`)
      .then(res => {
        expect(res.status).to.eq(404);
        done();
      })
      .catch(done);
  });

  after((done: MochaDone) => {
    DefaultAvailability.deleteMany({})
      .then(() => done())
      .catch(done);
  });
});
