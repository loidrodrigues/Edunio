import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

// Use uma chave secreta mais robusta em produção
const SECRET_KEY = (process.env.JWT_SECRET ||
  "sua_chave_secreta_super_segura_aqui_com_pelo_menos_32_caracteres") as jwt.Secret;

export function generateToken(payload: object, expiresIn = "1h") {
  try {
    return jwt.sign(payload, SECRET_KEY, { expiresIn } as jwt.SignOptions);
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
}

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    // Remove 'Bearer ' prefix if present
    const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    // Decode token without verifying signature
    const decoded: DecodedToken = jwtDecode(actualToken);

    // Check expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.error("Token expirado");
      return null;
    }

    return decoded;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

export function isLoggedIn() {
  // No server-side, sempre retorna false
  if (typeof window === "undefined") return false;

  try {
    const token = localStorage.getItem("token");
    console.log(
      "Token recuperado do localStorage:",
      token ? "Presente" : "Ausente"
    );

    if (!token) return false;

    const decoded = verifyToken(token);
    console.log("Token decodificado:", decoded);

    return decoded !== null;
  } catch (error) {
    console.error("Erro ao verificar login:", error);
    return false;
  }
}

export function getUserFromToken() {
  if (typeof window === "undefined") return null;

  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded as any;
  } catch (error) {
    console.error("Erro ao obter usuário do token:", error);
    return null;
  }
}

// Nova função para debug - verifica se há problemas com o token atual
export function debugToken() {
  if (typeof window === "undefined") {
    console.log("Executando no servidor - localStorage não disponível");
    return;
  }

  const token = localStorage.getItem("token");
  console.log("=== DEBUG DO TOKEN ===");
  console.log("Token presente:", !!token);

  if (token) {
    console.log("Comprimento do token:", token.length);
    console.log("Token parece JWT:", token.split(".").length === 3);

    // Tentativa de decodificação sem verificação (apenas para debug)
    try {
      const parts = token.split(".");
      if (parts.length === 3) {
        const header = JSON.parse(Buffer.from(parts[0], "base64").toString());
        const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
        console.log("Header:", header);
        console.log("Payload:", payload);
        console.log("Expira em:", new Date(payload.exp * 1000));
        console.log("Tempo atual:", new Date());
        console.log("Token expirado:", payload.exp * 1000 < Date.now());
      }
    } catch (e) {
      console.error("Falha ao decodificar token para debug:", e);
    }

    // Verificação real
    const decoded = verifyToken(token);
    console.log("Token válido:", decoded !== null);
  }
  console.log("=== FIM DEBUG ===");
}
