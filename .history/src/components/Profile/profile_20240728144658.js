// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lockStatus, setLockStatus] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('http://localhost:8000/api/users/{id}'); // Thay {id} bằng ID của người dùng
                setUser(response.data);
                setLockStatus(response.data.LockEnable);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const handleLockToggle = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${user.id}/lock`, {
                LockEnable: !lockStatus
            });
            setLockStatus(!lockStatus);
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating lock status:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <Card>
            <Card.Header>Thông tin người dùng</Card.Header>
            <Card.Body>
                <Card.Title>{user.examinee ? user.examinee.name : user.username}</Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {user.email}
                </Card.Text>
                <Card.Text>
                    <strong>Lock Status:</strong> {lockStatus ? 'Locked' : 'Unlocked'}
                </Card.Text>
                <Form>
                    <Form.Check
                        type="switch"
                        id="lock-toggle"
                        label="Lock Account"
                        checked={lockStatus}
                        onChange={handleLockToggle}
                    />
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserInfo;
