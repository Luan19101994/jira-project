import React from 'react'
import { Modal } from 'antd';

function ModalConfirm(props) {
  return (
    <Modal title={`Bạn có chắc muốn xóa dự án ` + props.value.projectName} open={props.status} onOk={props.confirm} onCancel={props.cancel}>
      {props.title}
    </Modal>
  )
}

export default ModalConfirm