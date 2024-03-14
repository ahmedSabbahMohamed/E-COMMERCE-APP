import React from 'react'
import { Button } from 'react-bootstrap';
import { logOut } from '../../actions/events';
import { IoMdLogOut } from 'react-icons/io';

function Logout() {
  return (
    <Button onClick={() => logOut()} variant="danger">
      Logout
      <IoMdLogOut />
    </Button>
  );
}

export default Logout