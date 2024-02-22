import { useEffect, useRef, useState, useCallback } from "react";
import { useLocalStorage } from "@/app/hooks";

interface ScrollSectionProps {
  scrolled: boolean;
  sectionActive: string;
}

const useScrollSections = (): ScrollSectionProps => {
  const [sectionActive, setSectionActive] = useLocalStorage(
    "section active",
    "home"
  );
  const sectionRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
    sectionRef.current = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    console.log("Scrolling:", window.scrollY);
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    localStorage.setItem("scrolled", scrolled.toString());
  }, [scrolled]);

  const handleScrollSection = useCallback(() => {
    sectionRef.current.forEach((section) => {
      const sectionTop = section.offsetTop - 300;
      if (window.scrollY >= sectionTop) {
        setSectionActive(section.getAttribute("id") || "");
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollSection);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScrollSection);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, handleScrollSection]);

  return { scrolled, sectionActive };
};

export default useScrollSections;
