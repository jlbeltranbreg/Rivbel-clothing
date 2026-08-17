"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

const SUGGESTIONS_EN = [
  "What sizes do the polos come in?",
  "What's the Sevilla Blanc made of?",
  "How should I care for linen shirts?",
  "What fits like a medium?",
];

const SUGGESTIONS_ES = [
  "¿Qué tallas tenéis en los polos?",
  "¿De qué está hecha la Sevilla Blanc?",
  "¿Cómo lavo una camisa de lino?",
  "¿Qué medidas tiene la talla M?",
];

export default function ChatAdvisor() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const greeting =
    lang === "es"
      ? "Hola. Soy el asesor de estilo de RIVBEL. Puedo ayudarte con tallas, materiales o cualquier duda sobre nuestras prendas."
      : "Hello. I'm the RIVBEL style advisor. I can help with sizing, materials, or anything else about our pieces.";

  const placeholder =
    lang === "es" ? "Escribe tu consulta…" : "Ask about sizing, fabric…";

  const suggestions = lang === "es" ? SUGGESTIONS_ES : SUGGESTIONS_EN;

  useEffect(() => {
    if (open && !greeted) {
      setMessages([{ role: "assistant", content: greeting }]);
      setGreeted(true);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, greeted, greeting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || data.error || "…" }]);
    } catch {
      setMessages([...next, { role: "assistant", content: lang === "es" ? "Lo siento, ha habido un problema. Inténtalo de nuevo." : "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .rivbel-chat-btn:hover { background: var(--burgundy) !important; }
        .rivbel-chat-btn:focus-visible { outline: 2px solid var(--off-white); outline-offset: 4px; border-radius: 50%; }
        .rivbel-chat-send:hover { background: var(--navy) !important; color: var(--off-white) !important; }
        .rivbel-chat-send:focus-visible { outline: 2px solid var(--burgundy); outline-offset: 3px; border-radius: 2px; }
        .rivbel-chat-suggestion:hover { background: rgba(123,34,53,0.08) !important; border-color: var(--burgundy) !important; color: var(--burgundy) !important; }
        .rivbel-chat-suggestion:focus-visible { outline: 2px solid var(--burgundy); outline-offset: 2px; border-radius: 2px; }
        .rivbel-chat-scroll::-webkit-scrollbar { width: 3px; }
        .rivbel-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .rivbel-chat-scroll::-webkit-scrollbar-thumb { background: rgba(123,34,53,0.25); border-radius: 2px; }
      `}} />

      {/* Floating button */}
      <motion.button
        className="rivbel-chat-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? (lang === "es" ? "Cerrar asesor" : "Close advisor") : (lang === "es" ? "Abrir asesor de estilo" : "Open style advisor")}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.8, duration: 0.4, ease: EASE }}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "var(--navy-dark)",
          border: "1px solid rgba(124,32,53,0.4)",
          color: "var(--off-white)",
          cursor: "pointer",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          touchAction: "manipulation",
          transition: "background 0.2s ease",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
            >
              <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={lang === "es" ? "Asesor de estilo RIVBEL" : "RIVBEL Style Advisor"}
            aria-modal="false"
            initial={{ opacity: 0, y: reduce ? 0 : 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              position: "fixed",
              bottom: "92px",
              right: "28px",
              width: "clamp(300px, 90vw, 360px)",
              background: "var(--linen)",
              border: "1px solid rgba(124,32,53,0.2)",
              borderRadius: "4px",
              boxShadow: "0 12px 48px rgba(15,29,58,0.22), 0 2px 8px rgba(15,29,58,0.1)",
              zIndex: 199,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              maxHeight: "min(520px, 75vh)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 18px",
                background: "var(--navy-dark)",
                borderBottom: "1px solid rgba(124,32,53,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Castle mark */}
              <img
                src="/rivbel-logo.png"
                alt=""
                aria-hidden="true"
                width={22}
                height={18}
                style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }}
              />
              <div>
                <p style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--off-white)",
                  margin: 0,
                }}>
                  RIVBEL
                </p>
                <p style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 300,
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(247,243,237,0.45)",
                  margin: 0,
                }}>
                  {lang === "es" ? "Asesor de Estilo" : "Style Advisor"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="rivbel-chat-scroll"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 16px 8px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "9px 12px",
                      borderRadius: "3px",
                      background: m.role === "user" ? "var(--navy-dark)" : "rgba(123,34,53,0.06)",
                      border: m.role === "user" ? "none" : "1px solid rgba(123,34,53,0.12)",
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 300,
                      fontSize: "11px",
                      lineHeight: 1.65,
                      letterSpacing: "0.02em",
                      color: m.role === "user" ? "var(--off-white)" : "var(--charcoal)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    padding: "10px 14px",
                    background: "rgba(123,34,53,0.06)",
                    border: "1px solid rgba(123,34,53,0.12)",
                    borderRadius: "3px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}>
                    {[0, 1, 2].map((j) => (
                      <motion.span
                        key={j}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.2 }}
                        style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--burgundy)", display: "block" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions (only when no conversation yet) */}
              {messages.length === 1 && !loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rivbel-chat-suggestion"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(123,34,53,0.2)",
                        borderRadius: "2px",
                        padding: "7px 10px",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 400,
                        fontSize: "10px",
                        letterSpacing: "0.04em",
                        color: "var(--warm-grey)",
                        cursor: "pointer",
                        textAlign: "left",
                        touchAction: "manipulation",
                        transition: "background 0.15s ease, border-color 0.15s ease, color 0.15s ease",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(123,34,53,0.12)" }} />

            {/* Input row */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                gap: "8px",
                background: "var(--linen)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                autoComplete="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 300,
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  color: "var(--charcoal)",
                  padding: "4px 0",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="rivbel-chat-send"
                aria-label={lang === "es" ? "Enviar" : "Send"}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(123,34,53,0.3)",
                  borderRadius: "2px",
                  padding: "6px 10px",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  color: input.trim() && !loading ? "var(--burgundy)" : "rgba(123,34,53,0.3)",
                  touchAction: "manipulation",
                  transition: "background 0.15s ease, color 0.15s ease",
                  opacity: input.trim() && !loading ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
