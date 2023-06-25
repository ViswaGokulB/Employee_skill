import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tabs, Row, Col, notification } from 'antd';
import ls from 'local-storage';
import UserCreationForm from './UserCreationForm';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const { TabPane } = Tabs;

const Dashboard = () => {
    const history = useNavigate();
    const [userList, setUsers] = useState([]);
    const [userTypes, setuserTypes] = useState([]);
    const [userSkill, setUserSkill] = useState([]);
    const [initalUserSkills, setInitalUserSkills] = useState(null);
    const [Percentage, setPercentage] = useState(null);
    const userName = ls.get('userName')
    const userId = ls.get('userId')
    const role = ls.get('role')

    useEffect(() => {
        getSkills();
        getusers();
        getuserType();
        getuserSkills();
        getPercentage(userId);
    }, [userId]);

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

    const getPercentage = (userId) => {
        fetch('http://localhost:5000/api/showPercentage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId:userId}),
        })
            .then((response) => response.json())
            .then((data) => {
                setPercentage(data.results);
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const getuserType = () => {
        fetch('http://localhost:5000/api/userType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((res) => {
                setuserTypes(res.results);
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const getSkills = () => {
        fetch('http://localhost:5000/api/userSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserSkill(data.data)
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const getuserSkills = () => {
        fetch('http://localhost:5000/api/getuserSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
        })
            .then((response) => response.json())
            .then((data) => {
                setInitalUserSkills(data.userSkills)
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }

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
                getusers();
                if ((data.errorMessage).includes("Duplicate entry")) {
                    notification.error({ message: "Email Already Exist" })
                }
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    const addType = (storeuserType) => {
        if (storeuserType) {
            fetch('http://localhost:5000/api/setUserType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type_name: storeuserType }),
            })
                .then((response) => response.json())
                .then((data) => {
                    getuserType();
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                });
        }
    };

    const addSkill = (newSkill) => {
        if (newSkill) {
            fetch('http://localhost:5000/api/setskills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSkill),
            })
                .then((response) => response.json())
                .then((data) => {
                    getSkills();
                    if ((data.errorMessage).includes("Duplicate entry")) {
                        notification.error({ message: "Duplicate entry" })
                    }
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                });
        }
    };

    const updateSkills = (updateSkill) => {
        fetch('http://localhost:5000/api/updateSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateSkill),
        })
            .then((response) => response.json())
            .then((data) => {
                getuserSkills();
                getusers();
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });

    }

    const savePercentage = (newPercentage) => {
        fetch('http://localhost:5000/api/savePercentage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPercentage),
        })
            .then((response) => response.json())
            .then((data) => {
                getuserSkills();
                getusers();
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });

    }

    const handleLogout = () => {
        ls.clear();
        history('/');
    }

    return (
        <>
            <Row style={{ margin: "15px" }} span={24}>
                <Col style={{ textAlign: "center", paddingLeft: "17%", fontWeight: "bold", fontSize: "24px" }} span={20}>Welcome to the Dashboard</Col>
                <Col style={{ textAlign: "end" }} span={4}>
                    <span style={{paddingRight:"7px"}}>{userName}</span>
                    <Button onClick={handleLogout}>Logout</Button>
                </Col>
            </Row>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Your Skill" key="1">
                        <EmployeeForm
                            initalUserSkills={initalUserSkills}
                            userSkill={userSkill}
                            updateSkills={updateSkills}
                            Percentage={Percentage}
                            savePercentage={savePercentage}
                        />

                    </TabPane>
                    {role === 1 && (
                        <>
                            <TabPane tab="User LIst" key="2">
                                <UserCreationForm
                                    addUser={addUser}
                                    addType={addType}
                                    userSkill={userSkill}
                                    userList={userList}
                                    userTypes={userTypes}
                                />
                            </TabPane>
                            <TabPane tab="Set Employee Skill" key="3">
                                <EmployeeList
                                    userTypes={userTypes}
                                    userSkill={userSkill}
                                    addSkill={addSkill}
                                />
                            </TabPane>


                        </>
                    )}
                </Tabs>

            </div>
        </>
    );
};

export default Dashboard;
