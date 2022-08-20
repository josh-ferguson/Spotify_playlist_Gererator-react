import React from "react";
import "./Loading.css";

export class LoadingSpinner extends React.Component{
  constructor(props) {
    super(props);
}

componentDidMount() {
    document.body.style.overflow = 'hidden';
}

componentWillUnmount() {
    document.body.style.overflow = 'unset';
}

  render() {
    return (
      <div className="page">
        <div className="spinner-container">
          <div className="loading-spinner">
          </div>
          <p>Saving Playlist</p>
        </div>
      </div>
    );
  }
}