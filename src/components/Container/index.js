import React, { useState } from 'react';
import Table from '../../components/Table';
import User from '../../components/User';
import OrgNew from '../../components/OrgStatic';

export default function() {
  const [user, fetchNewUser] = useState(0);
  return (
    <div>
      <User {...user} fetchNewUser={fetchNewUser} />
      {user.first && <OrgNew {...{ id: user.id }} />}
      <Table
        showDetail={val => {
          fetchNewUser(val);
        }}
      />
    </div>
  );
}
