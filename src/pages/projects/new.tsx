import { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import axios from 'axios';

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

  const onFinish = async (values: { title: string; description: string }) => {
    try {
      const response = await axios.post('http://15.165.202.64/api/v1/projects', {
        title: values.title,
        description: values.description,
        managerId: 0 // Set the appropriate managerId if needed
      });
      if (response.status === 200) {
        message.success('Project created successfully');
        onCreate(values); // Update the project list
        handleOk();
      }
    } catch (error) {
      message.error('Failed to create project');
      console.error(error);
    }
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

      <Modal title="새 프로젝트 생성" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
