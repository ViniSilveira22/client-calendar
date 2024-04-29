import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
} from "@nextui-org/react";

type User = {
  id: number;
  name: string;
  role: string;
  status: string;
};

const INITIAL_USERS: User[] = [
  { id: 1, name: "John Doe", role: "Admin", status: "active" },
  { id: 2, name: "Jane Doe", role: "User", status: "paused" },
  { id: 3, name: "Alice Smith", role: "User", status: "active" },
];

export default function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", role: "", status: "" });

  const handleDelete = (id: number): void => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAdd = (): void => {
    setUsers([...users, newUser]);
    setNewUser({ id: 0, name: "", role: "", status: "" }); // Reset new user state
  };

  return (
    <div>
      <h1>Users</h1>
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              />
            </TableCell>
            <TableCell>
              <Input
                placeholder="Status"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              />
            </TableCell>
            <TableCell>
              <Button onClick={handleAdd}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
