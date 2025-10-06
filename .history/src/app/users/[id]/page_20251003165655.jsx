"use client"
import UserProfile from "../../components/UserProfile";
import MyPosts from "../../components/MyPosts";

export default function UserPage({ params }) {
  const { id } = React.use(params)

  return (
    <div>
      <UserProfile userId={id} />
      <MyPosts userId={id} />
    </div>
  );
}
