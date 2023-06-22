import React, { useEffect, useState } from "react";
import {
  getAccessToken,
  getUsersWithToken,
  filterStudentUsers,
} from "../hooks/gettingUsers";
import { Form } from "react-bootstrap";

const LoadStudents = ({ selectedValue, onSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await getAccessToken();
        const usersData = await getUsersWithToken(access_token);
        console.log(usersData); // Log the usersData variable

        const studentUsers = filterStudentUsers(usersData);
        console.log(studentUsers); // Log the studentUsers array

        setUsers(studentUsers);
      } catch (error) {
        console.error("Failed to process request:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Form.Select
      value={selectedValue}
      onChange={(e) => onSelect(e.target.value)}
      required
    >
      <option value="">Select a student</option>
      {users.map((user) => (
        <option key={user.id} value={user.name}>
          {user.username}
        </option>
      ))}
    </Form.Select>
  );
};

export default LoadStudents;
