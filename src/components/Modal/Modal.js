import React, { Component } from "react";
import { Overlay, ModalContainer } from "./Modal.css.jsx";

export default class Modal extends Component {
  onKeyDown = (event) => {
    const { onClose } = this.props;

    if (event.code === "Escape") {
      onClose();
    }
  };

  onBackdropClick = ({ target, currentTarget }) => {
    const { onClose } = this.props;

    if (target === currentTarget) {
      onClose();
    }
  };

  render() {
    const { children, isOpen } = this.props;

    return (
      <>
        {isOpen && (
          <Overlay onClick={this.onBackdropClick}>
            <ModalContainer>{children}</ModalContainer>
          </Overlay>
        )}
      </>
    );
  }
}
