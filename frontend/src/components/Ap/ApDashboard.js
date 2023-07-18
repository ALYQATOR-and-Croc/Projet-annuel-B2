import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: 85vh; /* Occupe la hauteur complète de la fenêtre */
  width: 95vw; /* Occupe la largeur complète de la fenêtre */
  padding: 30px;
`;

const DashboardItem = styled(Link)`
  flex-basis: calc(50% - 20px);
  color: white;
  height: calc(50% - 20px);
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
             <Text>Permet d'ajouter ou modifier des administrateurs, étudiants, attachés de promotion,
                   responsables pédagogiques, reprographes et intervenants.
             </Text>
      </DashboardItem>
      <DashboardItem to="/ap/infra">
      <ApartmentIcon></ApartmentIcon><Title>
            Infrastructure</Title>
             <Text>Permet d'ajouter ou modifier une salle, un campus ou une école. 
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

