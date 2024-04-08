import React from 'react';
import { categories } from './categories';
import { products } from './products';
import HorizontalScrollMenu from 'react-horizontal-scrolling-menu';

// Composant pour afficher les produits d'une catégorie
const CategoryProducts = ({ categoryId }) => {
  const categoryProducts = products.filter(product => product.categorie.idCategorie === categoryId);

  return (
    <div className="category-products">
      {categoryProducts.map(product => (
        <div key={product.codePro} className="product-item">
          <img src={product.image} alt={product.nomPro} />
          <p>{product.nomPro}</p>
          <p>{product.price} €</p>
        </div>
      ))}
    </div>
  );
};

// Composant pour afficher les produits de toutes les catégories dans un menu horizontal
const ProductsMenu = () => {
  return (
    <div className="products-menu">
      {categories.map(category => (
        <div key={category.idCategorie} className="category">
          <h2>{category.nomCat}</h2>
          <HorizontalScrollMenu>
            <CategoryProducts categoryId={category.idCategorie} />
          </HorizontalScrollMenu>
        </div>
      ))}
    </div>
  );
};

export default ProductsMenu;
