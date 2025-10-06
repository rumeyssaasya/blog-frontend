import React from 'react'

const page = () => {
  return (
    <div>
       <div style={containerStyle}>
          <motion.div style={cardStyle}>
            <AnimatePresence mode="wait">
                <motion.div key="login" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                  <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#5d0ec0" }}>Giriş Yap</h2>
                  <form>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} autoComplete="username" />
                    <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} autoComplete="current-password" />
                    <button type="button" style={buttonStyle} onClick={handleLogin}>Giriş Yap</button>
                    {authState.status === 'loading' && <p>Yükleniyor...</p>}
                    {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
                    <button type="button" style={{ ...buttonStyle, backgroundColor: "#8e51ff" }} onClick={() => setIsLogin(false)}>Kayıt Ol</button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="register" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}>
                  <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#8e51ff" }}>Kayıt Ol</h2>
                  <form>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                    <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                    <button type="button" style={buttonStyle} onClick={handleRegister}>Kayıt Ol</button>
                    {authState.status === 'loading' && <p>Yükleniyor...</p>}
                    {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
                    <button type="button" style={{ ...buttonStyle, backgroundColor: "#5d0ec0" }} onClick={() => setIsLogin(true)}>Giriş Yap</button>
                  </form>
                </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
    </div>
  )
}

export default page