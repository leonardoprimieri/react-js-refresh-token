import { FormEvent, useContext, useState } from "react";
import { PageContainer } from "../../components/page-container/page-container";

import { AuthContext } from "../../contexts/auth/auth-provider";
import useAuth from "../../hooks/auth/use-auth";

export const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <PageContainer destinationPage='Home' pageLink='/' pageName='Login'>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: 300, gap: 16, padding: 30 }}
      >
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </PageContainer>
  );
};
