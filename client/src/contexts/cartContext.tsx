import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { product } from "../data/product";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
};
interface Props {
  [propsName: string]: any;
}
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartProducts");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotal();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((pre) => {
      let updatedCart;
      if (pre) {
        updatedCart = [...pre, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to cart!");
      localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filterProducts);
        toast.success("Product removed to cart!");
        localStorage.setItem(
          "eShopCartProducts",
          JSON.stringify(filterProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Ops maximum quantity");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }
        localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
        setCartProducts(updatedCart);
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity <= 1) {
        return toast.error("Ops can't decrease quantity");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartProducts", JSON.stringify(null));
  }, [cartProducts]);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};
