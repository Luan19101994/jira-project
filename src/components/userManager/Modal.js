import React from 'react'
import {  Modal } from 'antd';

function ModalConfirm(props) {
  return (
    <Modal title={`Bạn có chắc muốn xóa người dùng `} open={props.status} onOk={props.confirm} onCancel={props.cancel}>
        {props.title}
    </Modal>
  )
}

export default ModalConfirm