import React, { useState } from 'react';
import { Form, Input, Button, Table, Select, Divider, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserCreationForm = ({ addUser, userList, userTypes, addType, userSkill }) => {
  const [form] = Form.useForm();
  const [storeuserType, setStoreUserType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => {
        const matchedRole = (role === 1);
        return matchedRole ? "Admin User" : "Normal User"

      },
    },
    {
      title: 'User Type',
      dataIndex: 'user_type',
      render: (user_type) => {
        const matchedType = userTypes.find((type) => type.user_type === user_type);
        return matchedType ? matchedType.type_name : 'Unknown';
      },
    },
    {
      title: 'User Skills',
      dataIndex: 'user_skills',
      render: (user_skills) => {
        if (user_skills === null) {
          return <span style={{color:"red"}}>Not Updated</span>;
        }
  
        const skillIds = JSON.parse(user_skills);
        const matchedSkills = skillIds.map((skillId) => {
          const matchedSkill = userSkill.find((skill) => skill.id === skillId);
          return matchedSkill ? matchedSkill.skill_name : 'Not Updated';
        });
        return matchedSkills.join(', ');
      },
    },
  ]

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handelAdd = () => {
    addType(storeuserType)
    setStoreUserType(null);
  }

  const handleSubmit = (values) => {
    const newUser = { username: values.username, password: values.password, email: values.email, role: values.role, user_type: values.user_type };
    addUser(newUser);
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
    <div style={{textAlign:"end", margin:"10px"}}>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusOutlined />New User
      </Button>
    </div>

      <Table
        dataSource={userList}
        columns={columns}
        bordered
        pagination={false}
      />

      <Modal title="Create New User"
        open={isModalOpen} onCancel={handleCancel}
        footer={[]}
      >

        <Form
         labelCol={{ span: 6 }}
         wrapperCol={{ span: 14 }}
         style={{marginTop:"7%"}}
        //layout="horizontal"
        form={form} 
        onFinish={handleSubmit}>
          <Form.Item required label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item required label="Password" name="password">
            <Input.Password  />
          </Form.Item>
          <Form.Item required label="Email ID" name="email">
            <Input />
          </Form.Item>
          <Form.Item required label="Role" name="role">
            <Select options={[
              {
                value: 0,
                label: 'Normal User',
              },
              {
                value: 1,
                label: 'Admin User',
              },
            ]} />
          </Form.Item>
          <Form.Item required label="User Type" name="user_type">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => String(option.props.children).toLowerCase().includes(String(input).toLowerCase())}
              placeholder="Select User Type"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Please enter item"
                      // ref={inputRef}
                      value={storeuserType}
                      onChange={e => setStoreUserType(e.target.value)}
                    />
                    <Button type="text" icon={<PlusOutlined />}
                      onClick={handelAdd}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
            >
              {userTypes.map((o) => <Option key={o.user_type} value={o.user_type}> {o.type_name} </Option>)}
            </Select>
          </Form.Item>
          <div style={{textAlign:"end"}}>
          <Form.Item> <Button type="primary" htmlType="submit"> Create User </Button> </Form.Item>
          </div>
        </Form>

      </Modal>
    </>
  );
};

export default UserCreationForm;
