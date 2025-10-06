import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push("/create-post")}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "60px",
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          backgroundColor: "#7008e7",
          boxShadow: "0 4px 12px rgba(112, 8, 231, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#5b06ba")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7008e7")}
      >
        <FaPlus size={30} style={{ color: "white" }} />
      </button>
    </div>
  );
}
