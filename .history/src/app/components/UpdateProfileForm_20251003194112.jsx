import { useDispatch } from "react-redux";
import { useState } from "react";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 flex flex-col gap-4">
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>İptal</button>
          <button type="submit">Kaydet</button>
        </div>
      </form>
    </div>
  );
}
