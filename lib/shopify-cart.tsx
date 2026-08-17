"use client";
import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from "react";

const CART_KEY = "rivbel-cart-v2";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CartItem = {
  id:           string;   // "{slug}-{size}" — unique per product+size combo
  name:         string;
  variantTitle: string;   // size label e.g. "M"
  price:        number;
  image:        string;
  quantity:     number;
};

export type AddItemInput = Omit<CartItem, "quantity">;

// ── Reducer ───────────────────────────────────────────────────────────────────

type State = { items: CartItem[]; open: boolean };

type Action =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD";        input: AddItemInput }
  | { type: "REMOVE";     id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "OPEN" }
  | { type: "CLOSE" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };
    case "ADD": {
      const exists = state.items.find(i => i.id === action.input.id);
      return {
        ...state,
        items: exists
          ? state.items.map(i => i.id === action.input.id ? { ...i, quantity: i.quantity + 1 } : i)
          : [...state.items, { ...action.input, quantity: 1 }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) return { ...state, items: state.items.filter(i => i.id !== action.id) };
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: action.quantity } : i) };
    case "OPEN":  return { ...state, open: true };
    case "CLOSE": return { ...state, open: false };
    default:      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

type CtxType = {
  items:       CartItem[];
  count:       number;
  total:       number;
  checkoutUrl: string;
  loading:     boolean;
  open:        boolean;
  addItem:     (input: AddItemInput) => Promise<void>;
  removeItem:  (id: string)          => Promise<void>;
  updateQty:   (id: string, qty: number) => Promise<void>;
  openCart:    () => void;
  closeCart:   () => void;
};

const CartCtx = createContext<CtxType | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ShopifyCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false });

  // Restore cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.items)); } catch { /* ignore */ }
  }, [state.items]);

  const addItem = useCallback(async (input: AddItemInput) => {
    dispatch({ type: "ADD", input });
    dispatch({ type: "OPEN" });
  }, []);

  const removeItem = useCallback(async (id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const updateQty = useCallback(async (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", id, quantity });
  }, []);

  const openCart  = useCallback(() => dispatch({ type: "OPEN" }),  []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartCtx.Provider value={{
      items: state.items, count, total,
      checkoutUrl: "/checkout",
      loading: false, open: state.open,
      addItem, removeItem, updateQty, openCart, closeCart,
    }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be inside ShopifyCartProvider");
  return ctx;
}
