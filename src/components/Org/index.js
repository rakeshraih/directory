import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Box from './Box';
import './Org.scss';

const addBox = (setType, addTrigger, setaddTrigger, user, setBossDetails, showPeerSet) => {
  let dataList = <Box {...{ setType, addTrigger, setaddTrigger, user, setBossDetails, showPeerSet }} />;
  if (user && user.length) {
    dataList = user.map(val => {
      let user = val;
      return (
        <Box
          key={`key-${new Date().getTime()}`}
          {...{ setType, addTrigger, setaddTrigger, user, setBossDetails }}
          hide
          showPeerSet
        />
      );
    });
  }

  return (
    <Col key={`key-${new Date().getTime()}`} className="card-holder">
      {dataList}
    </Col>
  );
};

export default function({ user }) {
  const [orgList, setorgList] = useState([]);
  const [type, setType] = useState(null);
  const [addTrigger, setaddTrigger] = useState(false);
  const [bossdetails, setBossDetails] = useState(null);

  useEffect(() => {
    const updateList = async (type, bossdetails) => {
      if (type) {
        const response = await axios.get(`/EmployeesChart-Api?id=${bossdetails}`);
        const responseList = await axios.get(`/EmployeesChart-Api?manager=${bossdetails}`);
        console.log(type, { response: response.data[0], responseList: responseList.data });
        if (type === 'boss') {
          orgList.shift();
          setorgList([
            addBox(setType, addTrigger, setaddTrigger, response.data[0], setBossDetails, false),
            addBox(setType, addTrigger, setaddTrigger, responseList.data, setBossDetails),
            ...orgList,
          ]);
        } else {
          console.log(type, { response: response.data[0], responseList: responseList.data }, type);
          if (responseList.data && responseList.data.length) {
            // orgList.pop();
            setorgList([
              ...orgList,
              addBox(setType, addTrigger, setaddTrigger, responseList.data, setBossDetails, true),
            ]);
          }
        }
      }
    };
    updateList(type, bossdetails);
  }, [type, addTrigger, bossdetails]);

  if (orgList && !orgList.length) {
    orgList.push(
      <Col key={`key-${new Date().getTime()}`} className="card-holder">
        <Box {...{ setType, addTrigger, setaddTrigger, user, setBossDetails }} />
      </Col>,
    );
  }

  return <div className="box-container">{orgList}</div>;
}
