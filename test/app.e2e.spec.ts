import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha'
import { v4 as uuidv4 } from 'uuid';

import app from '../src/app';
import IStudentCourses from '../src/models/IStudentCourses';

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;

describe('Call /getStudents', () => {
  it(
    `Given that the service is running correctly
    When you call the '/getStudents' service and provide all the required information correctly
    Then you will get a list with 4 students`,
    (done) => {
      chai.request(app)
        .get('/getStudents')
        .set('X-RqUID', uuidv4())
        .set('X-Channel', 'WEB')
        .set('X-CustIdentType', 'CC')
        .set('X-CustIdentNum', '12345678')
        .set('X-IPAddr', '192.0.0.3')
        .set('X-Name', 'Onboarding')
        .query({
          limit: '10'
        })
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).haveOwnProperty('_body');
          expect(res.body).length(4);
          done();
        });
    }
  );

  it(
    `Given that the service is running correctly
    When you call the '/getStudents' service and provide all the required information correctly requesting information from only 1 student
    Then you will get a list with just 1 student`,
    (done) => {
      chai.request(app)
        .get('/getStudents')
        .set('X-RqUID', uuidv4())
        .set('X-Channel', 'WEB')
        .set('X-CustIdentType', 'CC')
        .set('X-CustIdentNum', '12345678')
        .set('X-IPAddr', '192.0.0.3')
        .set('X-Name', 'Onboarding')
        .query({
          limit: '1'
        })
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).haveOwnProperty('_body');
          expect(res.body).length(1);
          done();
        });
    }
  );

  it(
    `Given that the service is running correctly
    When the '/getStudents' service is called but not all headers were provided
    Then the service call will fail and error information will be obtained`,
    (done) => {
      chai.request(app)
        .get('/getStudents')
        .set('X-RqUID', uuidv4())
        .set('X-CustIdentType', 'CC')
        .set('X-CustIdentNum', '12345678')
        .set('X-IPAddr', '192.0.0.3')
        .set('X-Name', 'Onboarding')
        .query({
          limit: '10'
        })
        .send()
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.contain('x-channel');
          done();
        });
    }
  );
});

describe('Call /getStudentById', () => {
  it(
    `Given that the service is running correctly
    When you call the '/getStudentById' service and provide all the required information correctly and search for an existing student
    Then you will get the student's info`,
    (done) => {
      chai.request(app)
        .get('/getStudents')
        .set('X-RqUID', uuidv4())
        .set('X-Channel', 'WEB')
        .set('X-CustIdentType', 'CC')
        .set('X-CustIdentNum', '12345678')
        .set('X-IPAddr', '192.0.0.3')
        .set('X-Name', 'Onboarding')
        .query({
          limit: '1'
        })
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).haveOwnProperty('_body');
          expect(res.body).to.be.an.instanceof(Array);
          expect(res.body).length(1);
          const student: IStudentCourses = res.body[0];

          chai.request(app)
            .get('/getStudentById')
            .set('X-RqUID', uuidv4())
            .set('X-Channel', 'WEB')
            .set('X-CustIdentType', 'CC')
            .set('X-CustIdentNum', '12345678')
            .set('X-IPAddr', '192.0.0.3')
            .set('X-Name', 'Onboarding')
            .query({
              studentId: student.id
            })
            .send()
            .end((err, res) => {
              res.should.have.status(200);
              expect(res).haveOwnProperty('_body');
              expect(res.body).to.be.an.instanceof(Object);
              expect(res.body).haveOwnProperty('id');
              expect(res.body.id).is.equals(student.id);
            });

          done();
        });
    }  
  );

  it(
    `Given that the service is running correctly
    When calling the '/getStudentById' service and searching for a student that does not exist
    Then you will get an empty object`,
    (done) => {
      chai.request(app)
        .get('/getStudentById')
        .set('X-RqUID', uuidv4())
        .set('X-Channel', 'WEB')
        .set('X-CustIdentType', 'CC')
        .set('X-CustIdentNum', '12345678')
        .set('X-IPAddr', '192.0.0.3')
        .set('X-Name', 'Onboarding')
        .query({
          studentId: uuidv4()
        })
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).haveOwnProperty('_body');
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body).not.haveOwnProperty('id');
          done();
        });
    }  
  );

});

describe('Call /addStudent', () => {
  it(
    `Given that the service is running correctly
    When calling the '/addStudent' service and submitting student information
    Then you will get a studenti ID`,
    (done) => {
      const uuid = uuidv4();
      chai.request(app)
        .post('/addStudent')
        .set('X-RqUID', uuidv4())
        .set('X-Channel', 'WEB')
        .set('X-CustIdentType', 'CC')
        .set('X-CustIdentNum', '12345678')
        .set('X-IPAddr', '192.0.0.3')
        .set('X-Name', 'Onboarding')
        .send({
          names: "Pepito",
          lastnames: "Perez",
          birthDate: "10/10/2000",
          address: "CL 45 # 34 - 7",
          id: uuid
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).haveOwnProperty('_body');
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body).haveOwnProperty('studentId');
          expect(res.body.studentId).is.equals(uuid);
          done();
        });
    }  
  );

});
