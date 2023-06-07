

import { useEffect } from "react";

 const ScrollUp = () => {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);

  return null;
}

export default ScrollUp;
