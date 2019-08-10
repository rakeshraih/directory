import React, { useState } from 'react';
import Table from '../../components/Table';
import User from '../../components/User';

export default function() {
  const [user, fetchNewUser] = useState(0);

  return (
    <div>
      <User {...user} fetchNewUser={fetchNewUser} />
      <Table
        showDetail={val => {
          fetchNewUser(val);
        }}
      />
    </div>
  );
}
