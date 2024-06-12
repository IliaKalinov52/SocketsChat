import React from 'react';
import { Stack } from 'react-bootstrap';
import DotOnlineIcon from '../../../ui/icons/DotOnlineIcon';

export default function UsersList({ users }) {
  return (
    <Stack>
      <h6>Users online</h6>
      {users.map((user) => (
        <div className="p-2" key={user.id}>
          <DotOnlineIcon />
          {user.name}
        </div>
      ))}
    </Stack>
  );
}
