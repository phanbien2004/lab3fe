import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";


function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const dataUser = await response.json();
        setUser(dataUser);
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };
    fetchUserDetail();
  }, [userId]); // Cập nhật lại khi userId thay đổi

  if (!user) {
    return <Typography>Loading...</Typography>; // Trả về giao diện chờ
  }

  return (
    <>
      <Typography variant="h6">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: user.description }} />
      </Typography>
      <Link to={`/photoOf/${userId}`} className="link">
        View Photos
      </Link>
    </>
  );
}

export default UserDetail;
