const CartInfos = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      height: '75vh',
      width: '15%',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      
    }}>
      <input type="text" placeholder="Nom du client" />
      <input type="text" placeholder="Numéro de téléphone mobile" />
      <input type="text" placeholder="Adresse" />
      <input type="text" placeholder="Email" />
      <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10%', borderRadius: '5px', border: 'none' }}>Valider</button>
    </div>
  );
}

export default CartInfos;
