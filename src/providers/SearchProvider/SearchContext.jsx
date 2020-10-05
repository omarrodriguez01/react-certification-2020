import React, { useReducer, createContext } from 'react';
import SearchReducer from '../../reducers/SearchReducer';

export const SearchContext = createContext();

const defaultSearchState = {
  trending_videos: { items: [] },
  search_results: { items: [] },
  related_videos: { items: [] },
  video_details: { snippet: {} },
  favorite_videos: { items: [] },
};

function SearchProvider({ children }) {
  const [searchState, dispatchSearch] = useReducer(SearchReducer, defaultSearchState);
  return (
    <SearchContext.Provider value={{ searchState, dispatchSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
