"use client";

import { useEffect, useState } from "react";

export const useWindow = () => {
  const [_window, setWindow] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindow(window);
    }
  }, []);

  return _window;
};
