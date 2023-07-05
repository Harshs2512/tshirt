import { useState, useContext, createContext, useEffect } from "react";

const WishlistContext = createContext();
const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let existingWishItem = localStorage.getItem("wishlist");
    if (existingWishItem) setWishlist(JSON.parse(existingWishItem));
  }, []);

  return (
    <WishlistContext.Provider value={[wishlist, setWishlist]}>
      {children}
    </WishlistContext.Provider>
  );
};

// custom hook
const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };
