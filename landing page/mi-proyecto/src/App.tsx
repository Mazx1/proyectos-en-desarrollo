import React from 'react';
import arepita from './assets/arepita.jpg';
import './App.css';

interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isSpecial: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Arepa de Jamón y Queso', price: '$4.500', isSpecial: false },
  { name: 'Arepa Huevo, Jamón y Queso', price: '$6.000', isSpecial: false },
  { name: 'Arepa Huevo, Plátano, Queso', price: '$7.500', isSpecial: false },
  { name: 'San Criollo', price: '$17.000', description: 'Carne, Pollo, Huevos, Chorizo, Doble Queso, Tocineta, Salsa', isSpecial: true },
  { name: 'Monster', price: '$12.000', description: 'Chorizo, Tocineta, Jamón, Huevos', isSpecial: true },
  { name: 'Mixta Especial', price: '$15.000', description: 'Carne, Pollo, Chicharrón, Tocineta, Queso', isSpecial: true },
  { name: 'Mixta', price: '$13.000', description: 'Carne, Pollo, Jamón, Tocineta, Queso', isSpecial: false },
  { name: 'Diabólica', price: '$14.000', description: 'Carne, Pollo, Huevos, Plátano, Queso Fundido', isSpecial: true },
  { name: 'Extraordinaria', price: '$21.000', description: 'Carne, Pollo, Chorizo, Jamón, Queso, Tocineta, Chicharrón', isSpecial: true },
  { name: 'Burguer Especial', price: '$15.500', description: 'Carne de Hamburguesa, Carne, Pollo, Tocineta, Salsa', isSpecial: true },
  { name: 'Burguer', price: '$12.500', description: 'Carne Hamburguesa, Tocineta, Jamón, Queso', isSpecial: false },
  { name: 'Choriperro Super', price: '$14.000', description: 'Chorizo, Carne, Queso, Jamón, Salsa, Papas Chip', isSpecial: true },
];

const MenuApp: React.FC = () => {
  const midIndex = Math.ceil(menuItems.length / 2);
  const leftColumn = menuItems.slice(0, midIndex);
  const rightColumn = menuItems.slice(midIndex);

  const renderMenuItem = (item: MenuItem, index: number) => (
    <div key={index} className="menu-item">
      <div className="item-header">
        <span className={item.isSpecial ? 'item-name-special' : 'item-name-normal'}>
          {item.name}
        </span>
        <span className="item-price">{item.price}</span>
      </div>
      {item.description && (
        <div className="item-description">{item.description}</div>
      )}
    </div>
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo-text">EL PARADERO</h1>
        <div className="sub-logo">DE LA AREPA</div>
        
        <img 
          src={arepita} 
          alt="Arepa Rellena Especial" 
          className="main-image" 
        />
        
        <p className="slogan">"Más que una arepa, ¡una experiencia!"</p>
      </header>

      <div className="menu-container">
        <div className="menu-column">
          {leftColumn.map(renderMenuItem)}
        </div>
        <div className="menu-column">
          {rightColumn.map(renderMenuItem)}
        </div>
      </div>

      <footer className="footer">
        <div className="domicilios">HACEMOS DOMICILIOS</div>
        <a 
          href="https://wa.me/573213445439" 
          className="whatsapp-btn" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-2.32 0-4.591.901-6.393 2.536a8.88 8.88 0 0 0-2.583 6.309c0 2.316.901 4.591 2.536 6.393a8.88 8.88 0 0 0 6.309 2.583c2.316 0 4.591-.901 6.393-2.536a8.88 8.88 0 0 0 2.583-6.309c0-2.316-.901-4.591-2.536-6.393a8.88 8.88 0 0 0-6.309-2.583zm-.031 16c-3.723 0-6.75-3.027-6.75-6.75s3.027-6.75 6.75-6.75 6.75 3.027 6.75 6.75-3.027 6.75-6.75 6.75z"/>
            <path d="M18.8 6.2C17.1 4.5 14.8 3.5 12.3 3.5 7.3 3.5 3.3 7.5 3.3 12.5c0 1.6.4 3.2 1.2 4.6l-1.3 4.8 4.9-1.3c1.4.7 2.9 1.1 4.5 1.1 5 0 9-4 9-9.1.1-2.4-.9-4.7-2.7-6.4zm-6.5 13.9c-1.4 0-2.7-.4-3.9-1.1l-.3-.2-2.9.8.8-2.8-.2-.3c-.7-1.1-1.1-2.5-1.1-3.9 0-3.9 3.1-7 7-7 1.9 0 3.6.7 4.9 2 1.3 1.3 2 3.1 2 4.9.1 3.9-3 7.1-6.9 7.1zm3.8-5.3c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1-.2-.1-.8-.3-1.6-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1 0-.3-.1-.4-.1-.2-.4-1-.6-1.3-.2-.4-.3-.3-.4-.3h-.4c-.1 0-.3.1-.4.2-.6.7-1 1.6-1 2.6 0 1.3.5 2.5 1.4 3.6 1.1 1.4 2.6 2.3 4.3 2.7.4.1.8.1 1.1.1 1.1 0 2.1-.4 2.9-1.2.3-.3.5-.6.6-.9 0-.2 0-.4-.1-.5z"/>
          </svg>
          3213445439
        </a>
        <div className="order-now">¡ESCRÍBENOS Y ORDENA YA!</div>
      </footer>
    </div>
  );
};

export default MenuApp;