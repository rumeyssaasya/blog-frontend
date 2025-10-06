'use client'

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/postsSlice";
import { MdOutlinePerson } from "react-icons/md";
import PostCard from "./PostCard";
import { useTheme } from "next-themes";

export default function PostsPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const { theme } = useTheme();

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [dispatch, status]);

  return (
    <div className="container px-5 py-6 mx-auto">
      {status === "loading" && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === "succeeded" && (
        <div className="flex flex-col items-center justify-center gap-6">
          {posts.map((post) => (
            <div key={post._id} className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <MdOutlinePerson size={30} style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} />
                <p className="text-l mt-4">{post.author.username}</p>
              </div>

              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {status === "failed" && (
        <p className="text-center text-red-500">Yükleme hatası: {posts.error}</p>
      )}
    </div>
  );
}
