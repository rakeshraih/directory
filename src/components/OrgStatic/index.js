import React, { useState, useEffect } from 'react';
import Box from './BoxRec';
import { Button } from 'react-bootstrap';

import './Org.scss';

export default function({ id }) {
  const [user, setUser] = useState(id);
  useEffect(() => {
    setUser(id);
  }, [id]);

  return (
    <div>
      <Button variant="primary color-code" disabled>
        Head
      </Button>
      <Button variant="warning color-code" disabled>
        Manager
      </Button>
      <Button variant="success color-code" disabled>
        Other
      </Button>

      <div className="box-container top">
        <Box {...{ id: user }} />
      </div>
    </div>
  );
}
