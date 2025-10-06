import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <div>
      <button
      onClick={() => router.push("/create-post")}
      className="fixed bottom-15 right-18 bg-violet-500 rounded-full  shadow-xl transition-all duration-300 w-[5%] h-[5%] hover:bg-blue-700"
      
    >
      <FaPlus 
      size={30} 
      className=" text-center text-white"
       />
        </button>
    </div>
    
  );
}
