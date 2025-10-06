import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <div>
        <button
      onClick={() => router.push("/create-post")}
      className="fixed bottom-15 right-18 bg-violet-500 rounded-full  shadow-lg transition-all duration-300 w-[10%] h-[] hover:bg-blue-700"
      
    >
      <FaPlus 
      size={30} 
      className=" items-center text-white"
       />
        </button>
    </div>
    
  );
}
