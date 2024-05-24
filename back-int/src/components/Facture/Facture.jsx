import React,{useEffect, useState } from 'react';

const Facture = ({ selectedProduct, test, test1 }) => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
     if (selectedProduct) {
          setItems([...items, { productName: selectedProduct.nomPro, price: selectedProduct.prix, quantity: '1' }]);
       }

     }, [selectedProduct]);
    
    const handleAddItem = () => {
       
        setItems([...items, { productName:'', price:'' , quantity: '' }]);
        
    };


    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [name]: value };
        setItems(newItems);
    };
    let total=0;

    
    return (
       <div className="absolute top-20 left-0 h-full w-1/3 bg-orange-200 shadow-md p-4 text-center" style={{ overflowY: 'auto' }}>
           <h1 className="text-4xl font-bold mb-4">Facture</h1>
           
           <div className="mb-4 flex items-center font-bold">
               <div className="w-1/3">Nom du produit</div>
               <div className="w-1/3">Prix unitaire</div>
               <div className="w-1/3">Quantité</div>
           </div>
           {items.map((item, index) => (
               <div key={index} className="mb-4 flex items-center">
                   <input
                       type="text"
                       name="productName"
                       value={item.productName}
                       onChange={(e) => handleInputChange(index, e)}
                       placeholder="Nom du produit"
                       className="w-1/3 bg-orange-100 p-2 rounded mb-2 mr-2"
                   />
                <input
                    type="text"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Prix unitaire"
                    className="w-1/3 bg-orange-100 p-2 rounded mb-2 mr-2"
                />
                <input
                    type="text"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Quantité"
                    className="w-1/3 bg-orange-100 p-2 rounded mb-2 mr-2"
                />
            </div>
            
        ))}

{items.forEach(item => {
    total += item.quantity * item.price;
})}

           Total: <input type="text" placeholder="Total" value={total} className="w-full bg-orange-100 p-2 mb-4 rounded" />
           Montant versé:<input type="text" placeholder="Montant versé" className="w-full bg-orange-100 p-2 mb-4 rounded" />
           Remise:<input type="text" placeholder="Remise" className="w-full bg-orange-100 p-2 mb-4 rounded" />
           TVA:<input type="text" placeholder="TVA" className="w-full bg-orange-100 p-2 mb-4 rounded" />

           <button className="bg-primary text-white p-2 rounded mr-2">Enregistrer</button>
           <button className="bg-primary text-white p-2 rounded">Imprimer</button>
       </div>
    );
};

export default Facture;