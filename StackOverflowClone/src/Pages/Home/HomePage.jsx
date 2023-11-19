import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeCard from '../../Components/WelcomeCard/WelcomeCard';
import { auth, db } from '../../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';


import './style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [questionsAsked, setQuestionsAsked] = useState(0);


  const user = auth.currentUser;
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
  
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.userName || '');
            setQuestionsAsked(userData.questionsAsked || 0);
          } else {
            // Handle case where user data doesn't exist
            console.log('User data not found');
          }
        } catch (error) {
          // Handle any errors that occur during data retrieval
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserData();
  }, [user]);
  
  return (
    <div>
      <div className="card-container">
        <WelcomeCard
          icon="pi pi-user"
          buttonText="Update User"
          buttonType="Primary"
          handleButtonClick={() => navigate('/settings')}
          message={`Welcome, ${userName}`}
          isOutlined={true}
        />
        <WelcomeCard
          buttonText="Search Contents"
          buttonType="info"
          handleButtonClick={() => navigate('/questions')}
          icon="pi pi-search"
          isOutlined={true}
          message="You are getting stuck at somewhere in your code? Feel free to find answers and ask questions."
        />
        <WelcomeCard
          icon="pi pi-search"
          isOutlined={true}
          message={`Questions Asked: ${questionsAsked}`}
        />
      </div>
    </div>
  )
}

export default HomePage;
