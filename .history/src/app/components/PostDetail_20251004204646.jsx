'use client';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";

export default function MyProfile() {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const singlePost = useSelector(state => state.posts.singlePost);
  const posts = useSelector(state => state.posts.items);

 if (!singlePost) return <p>Post yükleniyor...</p>;

  return (
    <div style={{ margin: "2% 10%" }}>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.content}</p>
       {Array.isArray(singlePost.tags) && singlePost.tags.length > 0 && (
        <p style={{ color: theme === "dark" ? "lightGray" : "#18191a", marginBottom: "12px" }}>
          {"#" + singlePost.tags.join(" #")}
        </p>
      )}
      {singlePost.image && (
        <img 
          src={`http://localhost:5000/${singlePost.image.replace(/\\/g, "/")}`} 
          alt={singlePost.title} 
        />
      )}
      <input
      />
    </div>
  );
}
