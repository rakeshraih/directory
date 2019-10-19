import React, { useState, useEffect } from 'react';
import axios from '../../uitlity';
import { Table, Button, Form, Col } from 'react-bootstrap';

import './Table.scss';

const filterData = (list, searchKey, setFunction) => {
  if (!searchKey) {
    setFunction(null);
  } else {
    const filtered = list.filter(val => {
      const { first, last, id, department, manager } = val;
      const searchStr = `${first}${last}${id}${department}${manager}`.toLowerCase();
      return searchStr.includes(searchKey.toLowerCase());
    });
    setFunction(filtered);
  }
};

export default function({ showDetail }) {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filteredData, setfilteredData] = useState(null);

  useEffect(() => {
    const getEmployees = async manager => {
      const response = await axios.get(limit, offset);
      const data = response.data;
      setData(data);
    };

    getEmployees();
  }, [offset, limit]);
  let dataList = [];
  if (Array.isArray(data)) {
    dataList = (filteredData ? filteredData : data || []).map((val, index) => (
      <tr key={offset + index} onClickCapture={() => showDetail(val)}>
        <td>{offset + index + 1}</td>
        <td>
          <Button variant="link">
            {val.first} {val.last}
          </Button>
        </td>
        <td>
          <Button variant="link">{val.id}</Button>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <Form>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Search for name, id, manager, department"
              onKeyUp={event => {
                filterData(data, event.target.value, setfilteredData, setData);
              }}
            />
          </Col>
        </Form.Row>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Employee Id</th>
          </tr>
        </thead>
        <tbody>{dataList}</tbody>
      </Table>
      <div className="pagination">
        <Button
          variant="link"
          onClick={() => {
            setOffset(offset - limit);
          }}
          disabled={offset === 0}
        >
          <span>{'<'}</span>
        </Button>
        <div>
          Page {Math.ceil(offset / limit) + 1 || 1} -{' '}
          <select
            onChange={event => {
              setLimit(parseInt(event.target.value, 10));
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <Button
          variant="link"
          onClick={() => {
            setOffset(offset + limit);
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
