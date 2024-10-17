/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  title: string;
  thumbnail: string;
  price: number;
  selectedSize: string;
  quantity: number;
  description: string;
  id: string;
  category: string;
}

interface CartStore {
  cart: CartItem[];
  addItemToCart: (item: object) => void;
  getItemQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  increaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalCost: () => number;
}

interface StateStore {
  user: string;
  updateUser: (user: string) => void;
  openCartSidebar: boolean;
  setOpenCartSidebar: () => void;
}

export const stateStore = create<StateStore>((set) => ({
  user: "",
  openCartSidebar: false,
  updateUser: (user) => set((state) => ({ user: user })),
  setOpenCartSidebar: () =>
    set((state) => ({ openCartSidebar: !state.openCartSidebar })),
}));

export const cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItemToCart: (newItem: any) =>
        set((state) => {
          const checkItem = state.cart.find(
            (item: any) => item.id === newItem.id
          );
          if (checkItem) {
            return {
              cart: state.cart.map((item: any) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { cart: [...state.cart, newItem] };
          }
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item: any) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item: any) =>
            item.id === id
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
              : item
          ),
        })),
      clearCart: () => set(() => ({ cart: [] })),
      getItemQuantity: (id) => {
        const state = get();
        const item = state.cart.find((item) => item.id === id);
        return item ? item?.quantity : 1;
      },
      getTotalCost: () => {
        const state: any = cartStore.getState();
        return state.cart.reduce(
          (total: any, item: any) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
      // storage: () => localStorage
    }
  )
);
