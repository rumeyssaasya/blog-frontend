"use client"
import UserProfile from "../../components/UserProfile";
import MyPosts from "../../components/MyPosts";
import React from "react";
import { useParams } from "next/navigation";
import PostCard from "@/app/components/PostCard";

export default function UserPage({ params }) {
    const { id } = useParams();
    const posts = useSelector(state => state.posts.items);
    const postsStatus = useSelector(state => state.posts.status);
    const userId = id;

  return (
    <div>
      <UserProfile userId={id} />
      <PostCard key={post._id} post={post} theme={theme}/>
    </div>
  );
}
