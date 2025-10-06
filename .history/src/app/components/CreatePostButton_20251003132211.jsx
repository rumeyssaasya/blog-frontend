"use client"

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import CreatePost from "./CreatePost"

export default function CreatePostButton() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div>
              {/* Buton */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "80px",
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          backgroundColor: "#7008e7",
          border: "solid 2px white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20, // modalın altında kalmaması için
        }}
      >
        <FaPlus size={30} color="white" />
      </button>
      </div>
      <div>
              {/* Modal */}
      {open && (
        <CreatePost
          onClose={() => setOpen(false)}
          style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      )}
      </div>



    </div>
  )
}
