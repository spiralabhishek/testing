"use client";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const DynamicSearch = ({ query }: { query: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searching, setSearching] = useState(false);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const pulser = useDebouncedCallback(() => setSearching(false), 1000);

  return (
    <>
      <AnimatePresence>
        {searching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-full animate-pulse duration-75 w-3 h-3 bg-primary-blue absolute top-1 left-1"
          ></motion.div>
        )}
      </AnimatePresence>
      <Input
        type="text"
        placeholder="חיפוש"
        className="rounded-full w-[160px] h-[42px] pr-8"
        onChange={(e) => {
          handleSearch(e.target.value);
          setSearching(true);
          pulser();
        }}
      />
    </>
  );
};

export default DynamicSearch;
