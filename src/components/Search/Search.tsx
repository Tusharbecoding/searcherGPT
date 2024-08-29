//@ts-nocheck

import { AnimatedText } from "@/components/AnimatedText";
import { FilterButtons } from "@/components/FilterButtons";
import { SearchBar } from "@/components/SearchBar";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { SearchResult, SearchResultProps } from "../SearchResult";

export type SearchProps = {
  query?: string;
  onQueryChange?: (query: string) => void;
  searching?: boolean;
  results?: SearchResultProps["files"];
  onSearch?: (query: string, filter: string) => void;
  selectedFiles?: SearchResultProps["selected"];
  onSelect?: SearchResultProps["onSelect"];
  compact?: boolean;
};

export const Search: React.FC<SearchProps> = ({
  query,
  onQueryChange,
  searching,
  results,
  onSearch,
  selectedFiles,
  onSelect,
  compact,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (query: string) => {
    try {
      if (!onSearch) throw new Error("Search function is not provided.");
      onSearch(query, selectedFilter);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredResults = useMemo(() => {
    try {
      if (!results) throw new Error("Results data is not available.");
      const files = results.filter((file) => {
        const matchesFilter =
          selectedFilter === "All" ||
          file.extension === `.${selectedFilter.toLowerCase()}`;
        const matchesQuery =
          !query || file.name.toLowerCase().includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
      });
      return files;
    } catch (error) {
      setError(error.message);
      return [];
    }
  }, [results, query, selectedFilter]);

  useEffect(() => {
    if (error) {
      console.error("An error occurred:", error);
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <SearchBar
        className={clsx(
          "transition",
          "mb-10",
          compact && ["opacity-0", "invisible", "h-0", "mb-0"]
        )}
        value={query}
        pending={searching}
        onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
        onSubmit={() => {
          handleSearch(query || "");
        }}
      />
      <FilterButtons
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      {error && <div className="text-red-500">Error: {error}</div>}
      <div>
        {typeof results !== "undefined" && !error && (
          <SearchResult
            title={
              <div className="flex flex-row items-center gap-2">
                <AnimatedText
                  maxTime={500}
                  text={compact ? query! : "Search results"}
                />
              </div>
            }
            description={
              <AnimatedText
                maxTime={500}
                text={
                  compact
                    ? `Ask me anything to help with your studies!`
                    : `Select at least one file to start a new conversation.`
                }
              />
            }
            selected={selectedFiles}
            onSelect={onSelect}
            files={filteredResults}
            hideList={compact}
            compactOverview={compact}
          />
        )}
      </div>
    </div>
  );
};
