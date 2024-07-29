import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with actual method to get the logged-in user ID
        const getUserId = () => localStorage.getItem('userId');

        const fetchUserProfile = async () => {
            try {
                const userId = getUserId();
                if (!userId) {
                    throw new Error('No user ID found');
                }

                const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (!user) {
        return <Alert variant="warning">No user data available</Alert>;
    }

    return (
        <Container>
            <Card>
                <Card.Header>Profile</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Full Name:</strong> {user.examinee.FullName}</ListGroup.Item>
                        <ListGroup.Item><strong>Email:</strong> {user.Email}</ListGroup.Item>
                        <ListGroup.Item><strong>Phone:</strong> {user.Phone}</ListGroup.Item>
                        <ListGroup.Item><strong>Birth Date:</strong> {user.examinee.Birth}</ListGroup.Item>
                        <ListGroup.Item><strong>Gender:</strong> {user.examinee.Gender}</ListGroup.Item>
                        <ListGroup.Item><strong>Address:</strong> {user.examinee.AddressDetail}</ListGroup.Item>
                        <ListGroup.Item><strong>Grade ID:</strong> {user.examinee.GradeId}</ListGroup.Item>
                        <ListGroup.Item><strong>Account Created On:</strong> {user.CreateDate}</ListGroup.Item>
                        <ListGroup.Item><strong>Lock Status:</strong> {user.LockEnable ? 'Locked' : 'Unlocked'}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
