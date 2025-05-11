import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./styles.css";


import { Link } from "react-router-dom";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const [error, setError] = useState(null); // Thêm state error

  // Fetch dữ liệu người dùng từ BE sử dụng async/await
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/list");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        setError("Loi fetchUsers: ", error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
        and <a href="https://mui.com/components/dividers/">Dividers</a> to
        display your users like so:
      </Typography>

      <List component="nav">
        {userList.map((item) => (
          <>
            <ListItem key={item.id}>
              <Link to={`/users/${item._id}`}>
                <ListItemText primary={item.first_name} />
              </Link>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>

      <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography>
    </div>
  );
}

export default UserList;
