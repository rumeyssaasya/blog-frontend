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

  const [profilePic, setProfilePic] = useState(null); // resim için state

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = e => setProfilePic(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      await dispatch(updateUser({ id: user._id, data, token }));
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
        className="absolute inset-0 bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-violet-600 rounded-lg w-96 flex flex-col gap-4 z-10"
        style={{ padding: "3rem" }}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Kullanıcı adı"
          className="border px-3 py-2 rounded"
        />

        <input
          type="email"
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

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
