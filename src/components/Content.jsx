import React from "react";
import Sidebar from "./sidebar";
import GridExampleContainer from "./products";

const Content = (props) => {
  const onclicked = (index) => {
    props.onclicked(index);
  };

  return (
    <div className="content">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="products">
        <GridExampleContainer onclicked={onclicked} />
      </div>
    </div>
  );
};

export default Content;
