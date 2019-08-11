import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Jumbotron, Row, Col } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';

import './User.scss';

const formatData = (data, fetchNewUser) =>
  data.map((val, index) => (
    <Button
      variant="link"
      onClickCapture={() => {
        fetchNewUser(val);
      }}
      key={index}
    >
      {val.first} {val.last}
    </Button>
  ));

export default function({ first, last, id, manager, department, fetchNewUser }) {
  const [managerDetails, setmanagerDetails] = useState(0);
  const [reportees, setReportees] = useState([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const fetchManager = async manager => {
      if (manager) {
        const response = await axios.get(`/EmployeesChart-Api?id=${manager}`);
        const data = response.data[0];
        setmanagerDetails({ ...data });
      }
    };

    const fetchReportees = async (id, peer) => {
      if (id) {
        const response = await axios.get(`/EmployeesChart-Api?manager=${id}`);
        if (peer) {
          setReportees(response.data);
        } else {
          setPeers(response.data);
        }
      }
    };

    fetchManager(manager);
    fetchReportees(id);
    fetchReportees(manager, true);
  }, [manager, id]);

  const dataList = formatData(reportees, fetchNewUser);
  const peerList = formatData(peers, fetchNewUser);

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
                <h2>Head</h2>
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
              Department <h3>{department ? department : '-'}</h3>
            </Row>
          </Col>

          <Col className="peer-list">
            <Row style={{ display: 'flex' }}>
              {dataList.length ? (
                <Col>
                  <h6>{managerDetails.first ? managerDetails.first : first}'s Reportees</h6>
                  <Row>{dataList}</Row>
                </Col>
              ) : (
                ''
              )}
              {peerList.length && manager !== 0 ? (
                <Col>
                  <h6>{first}'s Peers</h6>
                  <Row>{peerList}</Row>
                </Col>
              ) : (
                ''
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Row style={{ float: 'right' }}>
        <Button
          variant="primary"
          onClick={() => {
            fetchNewUser({});
          }}
        >
          Close
        </Button>
      </Row>
    </Jumbotron>
  ) : (
    <div />
  );
}
