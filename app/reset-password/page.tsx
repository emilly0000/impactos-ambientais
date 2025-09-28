"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [searchParams, setSearchParams] = useState({ token: "", email: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      token: params.get("token") || "",
      email: params.get("email") || "",
    });
  }, []);

  const { token, email } = searchParams;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<null | "success" | "error" | "loading">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword: password }),
      });
      if (res.ok) {
        setStatus("success");
        // opcional: redirecionar pro login após 2s
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!token || !email) {
    return <p>Link inválido.</p>;
  }

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <main className="...">
        <form onSubmit={handleSubmit}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Redefinir senha</button>
        </form>

        {status === "success" && <p>Senha alterada com sucesso — você será redirecionado.</p>}
        {status === "error" && <p>Erro ao resetar. Token inválido ou expirado.</p>}
      </main>
    </Suspense>
  );
}
