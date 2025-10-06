import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <div>
      <button
      onClick={() => router.push("/create-post")}
      className="fixed bottom-15 right-18 rounded-full  shadow-xl transition-all duration-300 w-[5%] h-[10%] hover:bg-blue-700"
      
    >
      <FaPlus 
      size={30} 
      className=" flex justify-center items-center  bg-violet-500  text-white"
       />
        </button>
    </div>
    
  );
}
