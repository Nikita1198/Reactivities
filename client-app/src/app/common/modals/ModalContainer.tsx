import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";
import { Box, Modal } from "@mui/material";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal 
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}>
        <Box sx={style}>
            {modalStore.modal.body}
        </Box>
    </Modal>
  );
});
