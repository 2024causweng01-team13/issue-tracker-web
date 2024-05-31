import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface CreateProjectProps {
  onCreate: (values: { title: string; description: string }) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onCreate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: { title: string; description: string }) => {
    onCreate(values);
    handleOk(); 
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: 'var(--grey)', borderColor: 'var(--midGrey)', color: 'white' }}
      >
        새 프로젝트 생성
      </Button>

      <Modal title="새 프로젝트 생성" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          name="create_project"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="프로젝트 제목"
            rules={[{ required: true, message: '프로젝트 제목을 입력해주세요.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="프로젝트 설명"
            rules={[{ required: true, message: '프로젝트 설명을 입력해주세요.' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              생성
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProject;
