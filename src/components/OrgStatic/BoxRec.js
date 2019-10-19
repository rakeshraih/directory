import React, { useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import axios from '../../uitlity';

import './Org.scss';

const Box = function({ id, peer, boss }) {
  const [peerClicked, setpeerClicked] = useState(false);
  const [bossClicked, setbossClicked] = useState(false);
  const [user, setUser] = useState({});
  const [reportees, setreportees] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const user = (await axios.getEmployee(id)).data[0];
      const reportees = id ? (await axios.getReportees(id)).data : [];
      setUser(user);
      setreportees(reportees);
    };
    getUser();
  }, [id]);
  return user ? (
    <div className="wholebox">
      {bossClicked && (
        <div className="box-container boss">
          <Box {...{ id: user.manager }} boss={true} />
        </div>
      )}
      <div className={`user-card ${user.manager === 0 ? 'head' : ''} ${reportees.length > 0 ? 'manager' : ''}`}>
        <Button
          onClick={() => {
            setbossClicked(true);
          }}
          disabled={bossClicked || peer || user.manager === 0}
          variant="link"
          className={`${user.manager === 0 ? 'head' : ''}`}
        >
          <i className="fa fa-chevron-circle-up" aria-hidden="true" />
        </Button>

        <h5>{user.first}</h5>
        <h5>{user.last}</h5>
        <Button
          onClick={() => {
            setpeerClicked(true);
          }}
          disabled={peerClicked || boss || reportees.length === 0}
          variant="link"
          className={`peer ${reportees.length === 0 ? 'no-peers' : ''}`}
        >
          <i className="fa fa-chevron-circle-down" aria-hidden="true" />
        </Button>
      </div>
      {peerClicked && (
        <div className="box-container peer">
          {reportees.map((value, index) => {
            return <Box key={index} {...{ id: value.id }} peer={true} />;
          })}
        </div>
      )}
    </div>
  ) : (
    ''
  );
};

export default Box;
