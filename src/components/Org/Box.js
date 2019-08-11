import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import './Org.scss';

export default function({ setType, addTrigger, setaddTrigger, user, setBossDetails, hide, showPeerSet = true }) {
  const [showBoss, setShowBoss] = useState(true);
  const [showPeer, setshowPeer] = useState(showPeerSet);

  return (
    <div className={`user-card ${hide ? 'hide' : ''} ${showPeer ? 'showPeer' : ''}`}>
      {showBoss && user.manager ? (
        <Button
          variant="primary"
          onClick={() => {
            setType('boss');
            setBossDetails(user.manager);
            setShowBoss(false);
            setaddTrigger(!addTrigger);
          }}
        >
          Boss
        </Button>
      ) : (
        ''
      )}
      <h6>
        {user.first} {user.last}
      </h6>
      {user.manager ? '' : <h6>Head</h6>}
      {showPeer && (
        <Button
          variant="link"
          onClick={() => {
            setType('reportee');
            setBossDetails(user.id);
            setshowPeer(false);
            setaddTrigger(!addTrigger);
          }}
        >
          Reportees
        </Button>
      )}
    </div>
  );
}
