import React, { Component } from 'react';

const Base = (props) => {
  return ( 
    <React.Fragment>
      <div className="container">
        <div className="card" style={{marginTop: "20px"}}>
          <div className="card-body">
            {props.children}
          </div>
        </div>
      </div>
      
    </React.Fragment>
  );
}

export default Base;