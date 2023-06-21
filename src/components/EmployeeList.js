import React from 'react';
import { Table } from 'antd';

const EmployeeList = ({ employees }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
    },
  ];

  return (
    <>
     <h1>Employee Skill List</h1>
    <Table
      dataSource={employees}
      columns={columns}
      bordered
      pagination={false}
    />
    </>
  );
};

export default EmployeeList;
