import React from "react";
import SearchAutocomplete from "../components/CitySearch/components/search-autocomplete";

const SearchRoot = ({ setState, isOrigin }) => {
  const [search, setSearch] = React.useState({
    keyword: "",
    city: true,
    airport: true,
    page: 0,
  });

  const [dataSource, setDataSource] = React.useState({
    meta: { count: 0 },
    data: [],
  });

  const [loading, setLoading] = React.useState(false);

  return (
    <div className="search-panel inputDiv">
      <SearchAutocomplete
        search={search}
        setSearch={setSearch}
        setState={setState}
        isOrigin={isOrigin}
      />
    </div>
  );
};

export default SearchRoot;
