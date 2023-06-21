import React, { useState } from 'react';
import { Form, Input, Button, Table, Select, Divider, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserCreationForm = ({ addUser, userList, userTypes, storeType }) => {
  const [form] = Form.useForm();
  const [storeuserType, setStoreUserType] = useState(null);
  console.log(storeuserType);

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
    },
  ]

  

 const handelAdd =() =>{
  storeType(storeuserType)
  setStoreUserType(null);
 }

  const handleSubmit = (values) => {
    const newUser = { username: values.username, password: values.password, email: values.email, role: values.role, user_type: values.user_type };
    addUser(newUser);
    form.resetFields();
  };

  return (
    <>
      <Table
        dataSource={userList}
        columns={columns}
        bordered
        pagination={false}
      />

      <Form form={form} onFinish={handleSubmit}>
        <h2>Create New User</h2>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role">
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
        <Form.Item label="User Type" name="user_type">
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
        { userTypes.map((o) => <Option key={o.user_type} value={o.user_type}> {o.type_name} </Option>) }
        </Select>
        </Form.Item>
        <Form.Item> <Button type="primary" htmlType="submit"> Create User </Button> </Form.Item>
      </Form>
    </>
  );
};

export default UserCreationForm;
