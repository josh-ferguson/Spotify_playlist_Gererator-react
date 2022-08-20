import React from "react";
import "./Modal.css";

export class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.clsModal = this.clsModal.bind(this);
    }
    
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }
    
    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    clsModal() {
        this.props.onClsModal();
    }
    
    render() {
        return (
          <div className="modal-container">
            <div className="modal">
                <h2 className="modal_title">Playlist Saved to Spotify</h2>
                <button className="modal_btn" onClick={this.clsModal}>Confirm</button>
            </div>
          </div>
        );
    }

}