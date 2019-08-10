import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './Table.scss';

export default function({ showDetail }) {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const getEmployees = async manager => {
      const response = await axios.get(`/EmployeesChart-Api?limit=${limit}&offset=${offset}`);
      const data = response.data;
      setData(data);
    };

    getEmployees();
  }, [offset, limit]);

  const dataList = data.map((val, index) => (
    <tr key={offset + index}>
      <td>{offset + index + 1}</td>
      <td>{val.first}</td>
      <td>{val.last}</td>
      <td>
        <Button onClickCapture={() => showDetail(val)} variant="link">
          {val.id}
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th />
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee Id</th>
          </tr>
        </thead>
        <tbody>{dataList}</tbody>
      </Table>
      <div className="pagination">
        <Button
          variant="link"
          onClick={() => {
            setOffset(offset - 5);
          }}
          disabled={offset === 0}
        >
          <span>{'<'}</span>
        </Button>
        <div>Page {offset / 5 + 1 || 1}</div>
        <Button
          variant="link"
          onClick={() => {
            setOffset(offset + 5);
          }}
          disabled={data.length === 0}
        >
          <span>{'>'}</span>
        </Button>
      </div>
    </div>
  );
  // }
}
