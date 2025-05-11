import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(`http://localhost:5000/photosOfUser/${userId}`);
      const photosTmp = await response.json();
      console.log("photosTmp: ", photosTmp);
      setPhotos(photosTmp);
    }
    fetchPhotos();
  }, [])

  if (!photos) {
    return <Typography>Đang tải ảnh...</Typography>;
  }

  return (
    <>
      {
        photos.map((photo) => (
          <div key={photo._id}>
            <img
              src={`http://localhost:5000/images/${photo.file_name}`}
              alt="user photo"
              style={{ width: "30%", height: "auto" }}
            />
            <div>
              Thời gian đăng: {photo.date_time}
            </div>
            <div>
              <div>Bình luận:</div>
              {
                photo.comments && photo.comments.length > 0 ? (
                  <ul>
                    {photo.comments.map((comment, index) => (
                      <li key={index}>
                        {comment.user.first_name}: {comment.comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>Không có bình luận</div>
                )
              }
            </div>
          </div>
        ))
      }
    </>
  );
}

export default UserPhotos;
