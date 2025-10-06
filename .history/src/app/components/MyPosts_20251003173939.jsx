'use client';
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import PostCard from "./PostCard";
import ProtectedPage from "./ProtectedPage";
import { useTheme } from "next-themes";

export default function MyPosts({ userId }) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const { theme } = useTheme();

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if (status === "loading") return <p>Yükleniyor...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;
  if (posts.length === 0) return <p>Henüz gönderi yok.</p>;

  return (
    <ProtectedPage>
      <div className="flex flex-wrap gap-6" style={{ margin: "2% 10%" }}>
        <AnimatePresence>
          {posts.map(post => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex flex-col items-start"
            >
              <PostCard post={post} theme={theme} style={{ width: "300px" }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ProtectedPage>
  );
}
