import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './User.scss';

export default function({ first, last, id, manager, department, fetchNewUser }) {
  const [managerDetails, setmanagerDetails] = useState(0);

  useEffect(() => {
    const fetchManager = async manager => {
      if (manager) {
        const response = await axios.get(`/EmployeesChart-Api?id=${manager}`);
        const data = response.data[0];
        setmanagerDetails({ ...data });
      }
    };

    fetchManager(manager);
  }, [manager]);

  return id ? (
    <Jumbotron className="user-class">
      <Container>
        <Row>
          <Col>
            <Row>
              <h1>
                {first} {last}
              </h1>
            </Row>
            {manager <= 0 && (
              <Row>
                <h2>CEO</h2>
              </Row>
            )}
            <Row>
              Employee Id: <h3>{id}</h3>
            </Row>
            {manager && manager !== 0 ? (
              <Row>
                Manager :
                <h3>
                  {managerDetails.first && (
                    <Button
                      variant="link"
                      onClick={() => {
                        setmanagerDetails({});
                        fetchNewUser(managerDetails);
                      }}
                    >
                      {managerDetails.first} {managerDetails.last}
                    </Button>
                  )}
                </h3>
              </Row>
            ) : (
              ''
            )}
            <Row>
              Department <h3>{department}</h3>
            </Row>

            <Row>
              <Button
                variant="primary"
                onClick={() => {
                  fetchNewUser({});
                }}
              >
                Close
              </Button>
            </Row>
          </Col>
          <Col>hi</Col>
        </Row>
      </Container>
    </Jumbotron>
  ) : (
    <div />
  );
}
