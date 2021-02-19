import { Modal} from 'antd';
import { onRemove } from './Functions'; 

export const imageModal = (src, file, fileList, updateFileList) => {
    Modal.confirm({
        title: 'Image Preview',
        icon: null,
        content: <img alt="example" style={{ width: '100%' }} src={src} />,
        okText:"Keep Image",
        cancelText: "Delete Image",
        onOk() {},
        onCancel() {
            onRemove(file, fileList, updateFileList)
        },
    });
}