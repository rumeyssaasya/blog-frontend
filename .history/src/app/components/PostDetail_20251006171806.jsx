{activeTab === 'posts' && (
  <section style={sectionStyle}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: '#6D28D9' }}>Postlar</h2>

    {/* Create Post */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
      <input value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Başlık" style={inputStyle} />
      <input value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} placeholder="İçerik" style={inputStyle} />
      <input value={newPost.tags} onChange={e => setNewPost({ ...newPost, tags: e.target.value })} placeholder="Tagler (virgülle)" style={inputStyle} />
      <input type="file" onChange={e => setNewPost({ ...newPost, image: e.target.files?.[0] || null })} style={inputStyle} />
      <button onClick={() => { dispatch(createPostByAdmin({ ...newPost })); setNewPost({ title: '', content: '', tags: '', image: null }); }} style={{ ...buttonStyle, backgroundColor: '#10B981' }}>Oluştur</button>
    </div>

    {/* Edit Post Form */}
    {editPost.id && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', padding: '16px', backgroundColor: '#F3E8FF', borderRadius: '12px' }}>
        <input value={editPost.title} onChange={e => setEditPost({ ...editPost, title: e.target.value })} placeholder="Başlık" style={inputStyle} />
        <input value={editPost.content} onChange={e => setEditPost({ ...editPost, content: e.target.value })} placeholder="İçerik" style={inputStyle} />
        <input value={editPost.tags} onChange={e => setEditPost({ ...editPost, tags: e.target.value })} placeholder="Tagler (virgülle)" style={inputStyle} />
        <input type="file" onChange={e => setEditPost({ ...editPost, image: e.target.files?.[0] || null })} style={inputStyle} />
        <button onClick={handleUpdatePost} style={{ ...buttonStyle, backgroundColor: '#7C3AED' }}>Güncelle</button>
        <button onClick={() => setEditPost({ id: null, title: '', content: '', tags: '', image: null, author: null })} style={{ ...buttonStyle, backgroundColor: '#9CA3AF' }}>İptal</button>
      </div>
    )}

    {/* Posts List */}
    {posts.map(post => (
      <div key={post._id} style={cardStyle} onClick={() => { setSelectedPostId(post._id); setSelectedCommentId(null); }}>
        <span>{post.title} -- {post.author?.username || "Anonim"}</span>
      </div>
    ))}

    {/* Post Detail */}
    {selectedPost && (
      <div ref={postDetailRef} style={{ marginTop: '24px', padding: '16px', border: '1px solid #C4B5FD', borderRadius: '12px', backgroundColor: '#F3E8FF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{selectedPost.title}</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setEditPost({ id: selectedPost._id, title: selectedPost.title, content: selectedPost.content, tags: Array.isArray(selectedPost.tags) ? selectedPost.tags.join(',') : selectedPost.tags || '', image: null, author: selectedPost.author })} style={{ ...buttonStyle, backgroundColor: '#3B82F6' }}>Düzenle</button>
            <button onClick={() => { dispatch(deletePostByAdmin(selectedPost._id)); setSelectedPostId(null); }} style={{ ...buttonStyle, backgroundColor: '#EF4444' }}>Sil</button>
          </div>
        </div>
        <p style={{ marginBottom: '12px' }}>{selectedPost.content}</p>
        <p style={{ fontStyle: 'italic', marginBottom: '16px' }}>Tags: {Array.isArray(selectedPost.tags) ? selectedPost.tags.join(', ') : selectedPost.tags}</p>

        {/* Post Image */}
        {selectedPost.image && (
          <div style={{ marginBottom: '16px' }}>
            <img 
              src={`http://localhost:5000/${selectedPost.image.replace(/\\/g, "/")}`} 
              alt={selectedPost.title} 
              style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '8px' }}
            />
          </div>
        )}

        <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Yorumlar</h4>
        {/* DÜZELTİLMİŞ KISIM - Burada yanlış koşul vardı */}
        {postComments.length === 0 ? (
          <p>Bu post için yorum yok.</p>
        ) : (
          postComments.map(comment => (
            <div key={comment._id} style={{ ...cardStyle, justifyContent: 'space-between' }} onClick={() => setSelectedCommentId(comment._id)}>
              <span>{comment.author?.username || "Anonim"}: {comment.content}</span>
            </div>
          ))
        )}

        {/* Selected Comment Detail */}
        {selectedComment && (
          <div ref={commentDetailRef} style={{ marginTop: '16px', padding: '12px', border: '1px solid #C4B5FD', borderRadius: '12px', backgroundColor: '#EDE9FE' }}>
            <h5 style={{ fontWeight: '600', marginBottom: '12px' }}>Yorum Detayı</h5>
            <textarea
              value={editComment.id === selectedComment._id ? editComment.content : selectedComment.content}
              onChange={e => setEditComment({ id: selectedComment._id, content: e.target.value })}
              style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #C4B5FD', minHeight: '80px' }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => {setEditComment({ id: null, content: '' }); setSelectedCommentId(null); }} style={{ ...buttonStyle, backgroundColor: '#3B82F6' }}>Kaydet</button>
              <button onClick={() => { dispatch(deleteCommentByAdmin(selectedComment._id)); setSelectedCommentId(null); }} style={{ ...buttonStyle, backgroundColor: '#EF4444' }}>Sil</button>
              <button onClick={() => setSelectedCommentId(null)} style={{ ...buttonStyle, backgroundColor: '#9CA3AF' }}>İptal</button>
            </div>
          </div>
        )}
      </div>
    )}
  </section>
)}