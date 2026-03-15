"use client";

import { useEffect, useState } from "react";

export default function InstallApp() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault();
      setPrompt(e);
    });
  }, []);

  const install = () => {
    if (prompt) {
      prompt.prompt();
    }
  };

  if (!prompt) return null;

  return (
    <button
      onClick={install}
      className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-xl"
    >
      Installer l'application
    </button>
  );
}