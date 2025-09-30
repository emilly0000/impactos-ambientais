"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import "../globals.css";

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
    return (
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Link inválido.</p>
      </main>
    );
  }

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <main className="flex items-center justify-center h-screen bg-[var(--background)]">
        <div className="bg-[var(--foreground)] p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-[var(--background)]">Redefinir Senha</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--background)]">
                Nova Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Redefinir Senha
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-green-500 text-center">
              Senha alterada com sucesso — você será redirecionado.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-500 text-center">
              Erro ao resetar. Token inválido ou expirado.
            </p>
          )}
        </div>
      </main>
    </Suspense>
  );
}
