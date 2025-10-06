import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create-post")}
      className="fixed bottom-15 right-18 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300"
    >
      <FaPlus size={20} />
    </button>
  );
}
