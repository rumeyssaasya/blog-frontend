import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
  const router = useRouter();

  return (
    <div>
        <button
            onClick={() => router.push("/create-post")}
            className="fixed bottom-10 right-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-700 shadow-lg hover:bg-violet-800 transition-all duration-300"
            style={{ backgroundColor: '#7008e7', boxShadow: '0 4px 12px rgba(112, 8, 231, 0.3)' ,hover: boxShadow: '0 6px 16px rgba(112, 8, 231, 0.5)', cursor: 'pointer' }}
        >
            <FaPlus size={28} className="text-white" />
        </button>
    </div>
    
  );
}
