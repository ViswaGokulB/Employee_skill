import React,  { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const EmployeeList = ({ userTypes, userSkill, addSkill }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userTypeId, setUserTypeId] = useState(null);
  const [skill, setSkill] = useState(null);
  const columns = [
    {
      title: 'Type Name',
      dataIndex: 'type_name',
    },
    {
      title: 'Skills',
      dataIndex: 'user_type',
      key: 'user_type',
      render: (user_type) => {
        if(userSkill){
        const matchedTypes = userSkill.filter((o) => o.user_type_id === user_type);
        const skillNames = matchedTypes.map((type) => type.skill_name);
        return skillNames.length > 0 ? skillNames.join(', ') : ' - ';
        }
      },
    },
    {
      title: 'Add',
      dataIndex: 'user_type',
      key: 'add',
      render: (user_type) => (
        <Button type="primary" onClick={() => addSkills(user_type)}> <PlusOutlined />Add</Button>
      ),
    },
  ];

  const addSkills = (user_type) => {
    setUserTypeId(user_type);
    setIsModalOpen(true);
   
  }

  const handleOk = () => {
    setIsModalOpen(false);
    setSkill(null)
    const newSkill = {user_type_id: userTypeId, skill_name : skill}
    addSkill(newSkill);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Table
      dataSource={userTypes}
      columns={columns}
      bordered
      pagination={false}
    />
     <Modal title="ADD Skills" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <label>Enter Skills to Add</label>
        <Input value={skill} onChange={(e)=>setSkill(e.target.value)}></Input>
      </Modal>
    </>
  );
};

export default EmployeeList;
