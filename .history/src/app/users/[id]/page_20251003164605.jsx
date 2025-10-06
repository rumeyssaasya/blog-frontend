import UserProfile from "../../components/UserProfile";
import MyPosts from "../../components/MyPosts";

export default function UserPage({ params }) {
  const { id } = params; // /users/:id

  return (
    <div>
      {/* Kullanıcı profili */}
      <UserProfile userId={id} />

      {/* Kullanıcının postları */}
      <MyPosts userId={id} />
    </div>
  );
}
