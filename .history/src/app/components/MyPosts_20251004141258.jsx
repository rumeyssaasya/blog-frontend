'use client';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../redux/slices/postsSlice";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "./PostCard";

export default function MyProfile() {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const singlePost = useSelector(state => state.posts.singlePost);
  const posts = useSelector(state => state.posts.items);

  useEffect(() => {
    if (user?._id) {
      dispatch(getPostById(user._id));
    }
  }, [dispatch, user?._id]);

 if (!singlePost) return <p>Post yükleniyor...</p>;

  return (
    <div style={{ margin: "2% 10%" }}>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.content}</p>
      {singlePost.image && (
        <img 
          src={`http://localhost:5000/${singlePost.image.replace(/\\/g, "/")}`} 
          alt={singlePost.title} 
        />
      )}
    </div>
  );
}
