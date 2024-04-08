import React from 'react';
import { categories } from './datas/categories';
import { products } from './datas/products';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const ProductsMenu = () => {
  // Fonction pour filtrer les produits par catégorie
  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.categorie.idCategorie === categoryId);
  };

  return (
    <div className="products-menu">
      {categories.map(category => (
        <div key={category.idCategorie}>
          <h2>{category.nomCat}</h2>
          <ScrollMenu>
            {getProductsByCategory(category.idCategorie).map(product => (
              <div key={product.codePro}>
                {/* Afficher les détails du produit ici */}
                <img src={product.image} alt={product.nomPro} />
                <p>{product.nomPro}</p>
                <p>{product.price} €</p>
              </div>
            ))}
          </ScrollMenu>
        </div>
      ))}
    </div>
  );
};

export default ProductsMenu;
