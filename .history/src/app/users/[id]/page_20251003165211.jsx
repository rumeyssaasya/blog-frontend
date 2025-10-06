import UserProfile from "../../components/UserProfile";
import MyPosts from "../../components/MyPosts";

export default function UserPage({ params }) {
  const { id } = params; // /users/:id

  return (
    <div>
        <div style={{
        backgroundColor: theme === "dark" ? "#2e1065" : "#c4b5fd"}}>
            <UserProfile userId={id} />
        </div>
      
      <MyPosts userId={id} />
    </div>
  );
}
