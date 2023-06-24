import React, { useEffect, useState } from 'react';
import { Form, Button, Select, Row, Col } from 'antd';
import ls from 'local-storage';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeeForm = ({ initalUserSkills, userSkill, updateSkills }) => {
  const [form] = Form.useForm();
  const [filterUserType, setFilterUserType] = useState([]);
  const [editSkill, setEditSkill] = useState(false);
  const user_type = ls.get('user_type')
  const userID = ls.get('userId')

  useEffect(() => {
    const data = userSkill.filter((o) => o.user_type_id === user_type)
    setFilterUserType(data)
    form.setFieldsValue({ skills: initalUserSkills ? JSON.parse(initalUserSkills) : undefined });
    if(initalUserSkills){
      setEditSkill(true);
    }
  }, [initalUserSkills, userSkill])


  const handleSubmit = (values) => {
    const updateSkill = {skills: JSON.stringify(values.skills), userId: userID}
    updateSkills(updateSkill)
  };


  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={18}>
          <Form.Item style={{marginLeft:"5%"}} required name="skills" label="Your Skills">
            <Select
              mode="multiple"
              showSearch
              optionFilterProp="children"
              disabled={editSkill}
              filterOption={(input, option) => String(option.props.children).toLowerCase().includes(String(input).toLowerCase())}
              placeholder="Select your skill"
            >
              {filterUserType.map((o) => <Option key={o.id} value={o.id}> {o.skill_name} </Option>)}
            </Select>
          </Form.Item>
          </Col>
          {editSkill &&(
          <Col span={2} style={{textAlign:"left", padding:"2px"}}>
          <div onClick={()=>setEditSkill(false)}>
          <EditOutlined />
          </div>
          </Col>
          )}
          <Col span={4}>
          <Form.Item style={{ paddingLeft: "20%"}}> <Button type="primary" htmlType="submit"> Submit </Button> </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EmployeeForm;
