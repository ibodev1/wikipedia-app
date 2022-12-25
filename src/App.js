import React, { useEffect, useState } from "react";
import { getData, getSearchList } from "./utilities";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      getSearchList(searchQuery).then(queries => {
        queries.forEach(query => {
          getData(query).then(res => {
            setSearchData(oldArray => [...oldArray, res.data]);
            setLoading(false);
          })
        });
      });
    } else {
      setLoading(false);
      setSearchData([]);
    }
  }, [, searchQuery]);

  if (!loading) {
    console.log(searchData);
  }
  return (
    <div className="container">
      <input type="search" name="search" id="search" placeholder="Search..." required onChange={(e) => setSearchQuery(e.target.value)} />
      {
        loading ? "Loading..." : (
          searchData.filter(elm => elm.type !== "no-extract").map(elm => {
            return (
              <>
              <h1><b>{elm.title}</b></h1>
              <p>{elm.description}</p>
              </>
            )
          })
        )
      }
    </div>
  );
}

export default App;
