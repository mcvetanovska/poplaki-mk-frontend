import React, { useEffect, useState } from "react";
import "../complaints/Complaints.css";
import { useParams } from "react-router-dom";
import api from "../../axios/axios";
import CustomContainer from "../customContainer/CustomContainer";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";

function ComplaintsDetails() {
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/complaints/${id}`)
      .then((res) => {
        setComplaint(res.data);
        setComments(res.data.comments || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleVote = (upvote) => {
    api
      .post(`/complaints/${id}/votes`, { complaintId: id, upvote })
      .then(() => {
        setComplaint((prev) => ({
          ...prev,
          voteCount: prev.voteCount + (upvote ? 1 : -1),
        }));
      })
      .catch((err) => console.error("Error voting:", err));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    api
      .post(`/complaints/${id}/comments`, {
        complaintId: id,
        text: newComment,
      })
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setNewComment("");
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  return (
    <div
      className="d-flex justify-content-start align-items-center"
      style={{
        minHeight: `80vh`,
        width: "80%",
        margin: "0 auto",
        flexDirection: "column",
      }}
    >
      {complaint ? (
        <div className="complaints">
          {/* Complaint Details */}
          <div className="complaint-card">
            <div className="complaint-details-header">
              <img
                src={`http://localhost:8080/uploads/logos/${complaint.company.logo}`}
                alt={`${complaint.company.logo} logo`}
                className="company-details-logo"
              />
              <h1 className="company-name"> → {complaint.company.name}</h1>
            </div>
            <div className="complaint-body">
              <h2 className="complaint-title">{complaint.title}</h2>
              <p className="complaint-description">{complaint.description}</p>
            </div>

            <div className="voting-section d-flex gap-2">
              <button
                onClick={() => handleVote(true)}
                className="vote-button upvote"
              >
                ▲
              </button>
              <button
                onClick={() => handleVote(false)}
                className="vote-button downvote"
              >
                ▼
              </button>
              <span className="vote-count">Гласови: {complaint.voteCount}</span>
            </div>
          </div>

          <div className="comments-section mt-4 mb-4">
            <h3>Коментари</h3>
            <ul className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <li key={comment.id} className="comment-card">
                    <div className="comment-header d-flex align-items-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/icons/user.jpg`}
                        alt="Корисник"
                        className="comment-user-image"
                      />
                      <strong className="comment-user-name">
                        {comment.nickname
                          .split("@")[0]
                          .charAt(0)
                          .toUpperCase() +
                          comment.nickname.split("@")[0].slice(1)}
                      </strong>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </li>
                ))
              ) : (
                <p>Сè уште нема коментари. Бидете првиот што ќе коментира!</p>
              )}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Додајте коментар..."
              className="comment-input"
            />
            <button onClick={handleAddComment} className="form-button mt-2">
              Испрати
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default ComplaintsDetails;
