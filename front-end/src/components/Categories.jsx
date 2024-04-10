import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../utils/hooks';

const CategoryList = styled.nav`
  /* position: fixed;
  top: 100px;
  left: 10px; */
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

const Category = ({ categories, setSelectedCategory, setCurrentPage }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')

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
      {searchValue === '' && (
        <CategoryItem key={-1} theme={theme} onClick={() => {
          setSelectedCategory(-1)
          setCurrentPage(0)
        }}>
          Tous
        </CategoryItem>
      )}
      {categories
        .filter(({nomCat}) => (nomCat.toLowerCase().includes(searchValue.toLowerCase())))
        .map(({ idCat, nomCat }) => (
          <CategoryItem key={idCat} theme={theme} onClick={() => {
            setSelectedCategory(idCat)
            setCurrentPage(0)
          }}>
            {nomCat}
          </CategoryItem>
        ))}
    </CategoryList>
  );
};

export default Category;