import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import ls from 'local-storage'

const Login = () => {
  const [form] = Form.useForm();
  const history = useNavigate();

  const handleLogin = (values) => {
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:values.username, password: values.password }),
    })
    .then((response) => response.json())
    .then((data) => {
    if(!(data.error)){
      const { userId, role, userName, user_type, userSkills } = data;
      ls.set('userId', userId)
      ls.set('role', role)
      ls.set('userName', userName)
      ls.set('user_type',user_type)
      ls.set('userSkills',userSkills)
      history('/dashboard');
    }
    else{
        notification.error({message:(data.error)})
    }
    })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
    form.resetFields();
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Form onFinish={handleLogin}>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item style={{textAlign:"center"}}> <Button type="primary" htmlType="submit"> Login </Button> </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default Login;
