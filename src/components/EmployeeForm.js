import React from 'react';
import { Form, Input, Button } from 'antd';

const EmployeeForm = ({ addEmployee }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const employee = { name: values.name, skills: (values.skills).split(',').map((skill) => skill.trim()) };
    fetch('http://localhost:5000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error storing employee skills:', error);
      });
    form.resetFields();
  };
  

  return (
    <div>
    <h1>Enter Your Skills</h1>
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="name" label="Employee Name"> 
      <Input placeholder="Employee Name" /> 
      </Form.Item>
      <Form.Item name="skills" label="Skills (comma-separated)"> 
      <Input placeholder="Skills (comma-separated)"/> 
      </Form.Item>
      <Form.Item> <Button type="primary" htmlType="submit"> Add Employee </Button> </Form.Item>
    </Form>
    </div>
  );
};

export default EmployeeForm;
