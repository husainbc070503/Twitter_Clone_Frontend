import React, { useState } from "react";
import ListsTop from "../components/Lists/ListsTop";
import PinnedLists from "../components/Lists/PinnedLists";
import NewLists from "../components/Lists/NewLists";
import "../components/Lists/Lists.css";
import Lists_I_am_In from "../components/Lists/Lists_I_am_In";

const Lists = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="border">
      <ListsTop search={search} setSearch={setSearch} />
      <PinnedLists />
      <NewLists />
      <Lists_I_am_In />
    </div>
  );
};

export default Lists;
