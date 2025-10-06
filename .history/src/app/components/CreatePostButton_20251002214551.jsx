import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create-post")}
      className="fixed bottom-15 right-18 bg-violet-500 rounded-full  shadow-lg transition-all duration-300 w-[10%] h-[]"
      style={{padding:'5px',hover:bg-blue-700}}
      
    >
      <FaPlus 
      size={20} 
      className=" items-center bg-blue-600  text-white"
       />
    </button>
  );
}
