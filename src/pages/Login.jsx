import React, { useState } from "react";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = () => {
    // const { data } = axios.post("/", {
    //   id: id,
    //   password: password,
    // });
    // if (data?.username) localStorage.setItem("name", data.username);
  };
  return (
    <div>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={loginHandler}>로그인</button>
    </div>
  );
}

export default Login;
