'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getPostById } from "../../redux/slices/postsSlice";
import PostCard from "../../components/PostCard";

export default function PostDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.id; // /posts/[id] route’dan geliyor
  const post = useSelector(state => state.posts.singlePost);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [dispatch, postId]);

  if (!post) return <p>Post yükleniyor...</p>;

  return (
    <div style={{ margin: "2% 10%" }}>
      <PostCard post={post} theme="light" />
    </div>
  );
}
