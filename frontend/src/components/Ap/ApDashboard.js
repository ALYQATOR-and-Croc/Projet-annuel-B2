import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import PersonIcon from '@mui/icons-material/Person';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 80vh; 
  width: inherit;
  padding: 30px;
`;

const DashboardItem = styled(Link)`
  flex-basis: calc(40% - 20px);
  margin-left:20px;
  margin-right:20px;
  color: white;
  height: calc(40% - 20px);
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  background-color: #4BBDB7;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 10px; /* Arrondir les angles */
  text-decoration: none;
  overflow: hidden; /* Masquer le dépassement du contenu */
  &:hover {
    background-color: #239489;
  }
  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.values.sm}px) {
      flex-basis: 100%;
      height: auto;
    }
  `}
`;
const Title = styled.h2`
  font-size: 25px;
  margin: 0;
  padding: 10px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 10px;
`;

const Dashboard = () => {

  return (
    <DashboardContainer>
      <DashboardItem to="/ap/user">
        <PersonIcon></PersonIcon><Title>
            Utilisateur</Title>
             <Text>Permet d'ajouter ou modifier des utilisateurs (étudiants, intervenants...)
             </Text>
      </DashboardItem>
      <DashboardItem to="/ap/educ">
      <SchoolRoundedIcon></SchoolRoundedIcon><Title>
            Éducation</Title>
             <Text> Permet d'ajouter ou modifier une promotion, une matière, une classe ou un cours.
             </Text>
      </DashboardItem>
      <DashboardItem to="/ap/absence">
      <AccessTimeIcon></AccessTimeIcon><Title>
            Absences/Retard</Title>
             <Text>Permet de retirer les absences ou retards d'un élève lorsqu'ils l'ont justifié.
             </Text>
      </DashboardItem>
    </DashboardContainer>
  );
};

export default Dashboard;

