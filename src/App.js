import React, { useEffect, useRef, useState } from "react";
import { getData, getSearchList } from "./utilities";
import {
  TbCalendar,
  TbExternalLink,
  TbEdit,
  TbMessages,
  TbSearch,
  TbRefresh,
} from "react-icons/tb";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [openSearchList, setOpenSearchList] = useState(false);
  const inputRef = useRef(null);

  const getList = async (e) => {
    try {
      if (e !== null && typeof e !== "undefined") e.preventDefault();
      setOpenSearchList(false);
      setLoading(true);
      if (searchQuery.length > 2) {
        // Delete elements
        while (searchData.length > 0) {
          searchData.pop();
        }

        // Add elements
        for (let index = 0; index < searchList.length; index++) {
          const query = searchList[index];
          const res = await getData(query);
          searchData.push(res.data);
        }
        setSearchData(searchData);
        setLoading(false);
      } else {
        setLoading(false);
        setSearchData([]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onSearch = async (text) => {
    setSearchQuery(text);
    try {
      if (text.length > 2) {
        setOpenSearchList(true);
        const queries = await getSearchList(text);
        setSearchList(queries);
      } else {
        setOpenSearchList(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className="container mx-auto">
      <section className="main">
        <form action="#!" method="get" onSubmit={getList}>
          <div className="input-wrapper">
            <TbSearch className="search-icon" />
            <input
              ref={inputRef}
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
              className={
                openSearchList && searchList.length > 0
                  ? "search-input active"
                  : "search-input"
              }
              required
              defaultValue={searchQuery}
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            {openSearchList && searchList.length > 0 ? (
              <ul className="search-list">
                {searchList.map((item, i) => {
                  return (
                    <li key={i}>
                      <button
                        className="list-item"
                        onMouseMove={() => setSearchQuery(item)}
                        onClick={async () => {
                          await onSearch(item);
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </form>
        <div className="content-items">
          {loading ? (
            <TbRefresh className="animate-spin text-9xl w-full flex items-center justify-center" />
          ) : (
            searchData
              .filter((elm) => elm.type !== "no-extract")
              // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              // .sort((a, b) => a.title.localeCompare(b.title))
              .map((elm, i) => {
                const isImage =
                  elm.originalimage !== null &&
                  elm.originalimage !== undefined &&
                  typeof elm.originalimage !== "undefined";
                return (
                  <div
                    key={i}
                    className="info-box"
                    style={
                      isImage
                        ? {
                            backgroundImage:
                              "url(" +
                              (isImage ? elm.originalimage.source : null) +
                              ")",
                          }
                        : {}
                    }
                  >
                    {/* <img
                        src={isImage ? elm.originalimage.source : null}
                        alt={elm.title}
                        className="thumb"
                        width={isImage ? elm.originalimage.width : 0}
                        height={isImage ? elm.originalimage.height : 0}
                      /> */}
                    <div className="body">
                      <h1 className="title">{elm.title}</h1>
                      <p className="desc">{elm.description}</p>
                      <p className="extract">{elm.extract}</p>
                      <div className="btn-group">
                        <p className="inline-btn">
                          <TbCalendar className="icon-left" />
                          {new Date(elm.timestamp).toLocaleDateString()}
                        </p>
                        <a
                          href={elm.content_urls.desktop.page}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-btn"
                        >
                          Visit <TbExternalLink className="icon-right" />
                        </a>
                        <a
                          href={elm.content_urls.desktop.edit}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-btn"
                        >
                          Edit <TbEdit className="icon-right" />
                        </a>
                        <a
                          href={elm.content_urls.desktop.talk}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-btn"
                        >
                          Talk <TbMessages className="icon-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
