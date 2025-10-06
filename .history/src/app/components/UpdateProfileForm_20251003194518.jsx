import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/slices/usersSlices";

export default function UpdateProfileForm({ user, token, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio || "",
  });

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id: user._id, data: formData, token }));
      alert("Kullanıcı bilgileri güncellendi");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Güncelleme başarısız");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blur ve yarı şeffaf arka plan */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <form 
        onSubmit={handleSubmit} 
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-96 flex flex-col gap-4 z-10"
      >
        <input 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          placeholder="Username" 
          className="border px-3 py-2 rounded"
        />
        <input 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email" 
          className="border px-3 py-2 rounded"
        />
        <textarea 
          name="bio" 
          value={formData.bio} 
          onChange={handleChange} 
          placeholder="Bio" 
          className="border px-3 py-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 border rounded"
          >
            İptal
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
