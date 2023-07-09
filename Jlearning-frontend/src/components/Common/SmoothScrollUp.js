

import { useEffect } from "react";

const SmoothScrollUp = () => {
  useEffect(() => window.scrollTo({
    top: 0,
    behavior: "smooth",
  }), []);

  return null;
}

export default SmoothScrollUp;
