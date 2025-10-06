'use client';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "./PostCard";

export default function MyProfile() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Redux store'dan user bilgisi
  const user = useSelector(state => state.auth.user);

  const posts = useSelector(state => state.posts.items);
  const postsStatus = useSelector(state => state.posts.status);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserPosts(user._id));
    }
  }, [dispatch, user?._id]);

  if (!user) return <p>Kullanıcı bulunamadı</p>;

  return (
    <ProtectedPage>
      <div>
        {postsStatus === 'loading' ? (
          <p>Yükleniyor...</p>
        ) : posts.length === 0 ? (
          <p>Henüz gönderi yok.</p>
        ) : (
          <div className="flex flex-wrap gap-6" style={{ margin: "2% 10%" }}>
            {posts.map(post => (
               <PostCard key={post._id} post={post} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}
