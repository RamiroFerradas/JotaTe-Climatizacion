import { useEffect, useRef, useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface ScrollSectionProps {
  scrolled: boolean;
  sectionActive: string;
}

const useScrollSections = (): ScrollSectionProps => {
  const [scrolled, setScrolled] = useLocalStorage("scrolled", false);
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

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  const handleScrollSection = useCallback(() => {
    sectionRef.current.forEach((section) => {
      const sectionTop = section.offsetTop - 300;
      if (window.pageYOffset >= sectionTop) {
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
