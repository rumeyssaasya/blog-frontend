import { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import PostCard from "./PostCard";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/postsSlice";

export default function PostsPage() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // İlk başta tüm postları çek
    dispatch(fetchPosts()).then(res => setPosts(res.payload));
  }, [dispatch]);

  return (
    <div>
      <SearchComponent onResults={setPosts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
