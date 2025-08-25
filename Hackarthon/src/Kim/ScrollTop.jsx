import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 최상단 스크롤
const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;