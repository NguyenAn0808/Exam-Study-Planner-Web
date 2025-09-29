/// <reference types="vite/client" />

interface ImportMetaEnv {
  // readonly VITE_OPENAI_API_KEY: string // Moved to backend for security
  // Add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}