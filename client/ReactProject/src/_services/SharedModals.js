import { Modal } from 'antd';

export const emailNotFound = () => {
    Modal.warning({
        title: 'Email not found',
        content: (
            <div>
                <p>Please check the spelling is correct</p>
            </div>
        ),
        onOk() {},
    });
  }