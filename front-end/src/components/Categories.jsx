import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosClient from '../axiosClient';
import { useTheme } from '../utils/hooks';

const CategoryList = styled.nav`
  height: 100%;
  overflow-y: scroll;
  background-color: #7d5ba6; // Couleur violette pour le fond
  scrollbar-width: thin; // Barre de défilement plus fine
  scrollbar-color: #5e437b #e0d0f5; // Couleur de la barre de défilement et du fond
`;

const CategoryItem = styled.div`
  padding: 10px;
  color: white; // Texte en blanc pour contraster avec le fond violet
  &:hover {
    background-color: #5e437b; // Changement de fond au survol
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #5e437b; // Bordure violette
  border-radius: 5px; // Bordures arrondies
`;

const categories = [
    { id: 1, name: 'Vêtements pour enfants décontractés' },
    { id: 2, name: 'Vêtements pour enfants formels' },
    { id: 3, name: "Vêtements d'extérieur pour enfants" },
    { id: 4, name: 'Vêtements de sport pour enfants' },
    { id: 5, name: 'Chaussures pour enfants' },
    { id: 6, name: 'Vêtements pour adolescents' },
    { id: 7, name: 'Jeans pour adolescents' },
    { id: 8, name: 'T-shirts pour adolescents' },
    { id: 9, name: 'Vêtements pour jeunes adultes' },
    { id: 10, name: 'Vêtements de sport pour jeunes adultes' },
    { id: 11, name: 'Vêtements décontractés pour jeunes adultes' },
    { id: 12, name: 'Vêtements formels pour jeunes adultes' },
    { id: 13, name: 'Chaussures pour jeunes adultes' },
    { id: 14, name: 'Vêtements pour adultes' },
    { id: 15, name: 'Vêtements de sport pour adultes' },
    { id: 16, name: 'Vêtements décontractés pour adultes' },
    { id: 17, name: 'Vêtements formels pour adultes' },
    { id: 18, name: 'Chaussures pour adultes' },
    { id: 19, name: 'Vêtements de nuit pour adultes' },
    { id: 20, name: "Vêtements d'extérieur pour adultes" },
  ];

const Category = () => {
    const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');

//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     Fetch categories from API
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosClient.get('/categories'); // Adjust the endpoint as needed
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories', error);
//       }
//     };

//     fetchCategories();
//   }, []);

  return (
    <CategoryList>
      <SearchBar 
        type="text" 
        placeholder="Rechercher des catégories..." 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {categories
        .filter(category => category.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((category) => (
          <CategoryItem key={category.id} theme={theme}>
            {category.name}
          </CategoryItem>
        ))}
    </CategoryList>
  );
};

export default Category;