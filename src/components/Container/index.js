import React, { useState } from 'react';
import Table from '../../components/Table';
import User from '../../components/User';
import Org from '../../components/Org';

export default function() {
  const [user, fetchNewUser] = useState(0);

  return (
    <div>
      <User {...user} fetchNewUser={fetchNewUser} />
      {user.first && <Org {...{ user }} />}
      <Table
        showDetail={val => {
          fetchNewUser(val);
        }}
      />
    </div>
  );
}
