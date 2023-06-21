import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tabs, Row, Col } from 'antd';
import ls from 'local-storage'
import UserCreationForm from './UserCreationForm';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const { TabPane } = Tabs;

const Dashboard = () => {
    const history = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [userList, setUsers] = useState([]);
    const [userTypes, setuserTypes] = useState([]);

    const role = ls.get('role')

    useEffect(() => {
        getemployee();
        getusers();
        userType();
      }, []);

    const userType = () => {
        fetch('http://localhost:5000/api/userType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results);
                setuserTypes(data.results);
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };
    

    const addUser = (user) => {
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                getusers();
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const getemployee = () => {
        fetch('http://localhost:5000/api/getemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data.results);
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const getusers = () => {
        fetch('http://localhost:5000/api/usersList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.data);
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const storeType = (storeuserType) => {
        console.log(storeuserType);
        if(storeuserType){
        fetch('http://localhost:5000/api/setUserType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({type_name: storeuserType}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                userType()
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
          }
    };

    const handleLogout = () => {
        ls.clear();
        history('/');
    }

    return (
        <>
        <Row style={{margin:"15px"}} span={24}>
        <Col style={{textAlign:"center", paddingLeft:"7%", fontWeight:"bold", fontSize:"24px"}} span={22}>Welcome to the Dashboard</Col>
        <Col style={{textAlign:"end"}} span={2}>
        <Button onClick={handleLogout}>Logout</Button>
        </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {role === 1 ? (
        <Tabs defaultActiveKey="1">
          <TabPane tab="User" key="1">
            <UserCreationForm addUser={addUser} storeType={storeType} userList={userList} userTypes={userTypes}/>
          </TabPane>

          <TabPane tab="Set Employee Skill" key="2">
            <EmployeeList employees={employees} />
          </TabPane>

          <TabPane tab="Your Skill" key="3">
            <EmployeeForm />
          </TabPane>
        </Tabs>
        ):(
            <EmployeeForm />
        )}
            
        </div>
        </>
    );
};

export default Dashboard;
