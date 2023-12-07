import React from "react";
import classes from './EditModal.module.css';

const EditModal = ({ children, visible, setVisible }) => {

  const rootClasses = [classes.EditModal]

  if(visible === true){
    rootClasses.push(classes.active)

  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={classes.EditModalContent} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default EditModal;