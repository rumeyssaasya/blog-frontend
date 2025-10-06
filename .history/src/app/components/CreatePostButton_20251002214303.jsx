import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create-post")}
      className="fixed bottom-15 right-18  rounded-full  shadow-lg transition-all duration-300"
      
    >
      <FaPlus 
      size={20} 
      className="bg-blue-600 hover:bg-blue-700 text-white"
      style={{padding:'15px'}} />
    </button>
  );
}
