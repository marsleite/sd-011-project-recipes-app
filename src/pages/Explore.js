import React from 'react';
import { Link } from 'react-router-dom';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/Header';
import '../styles/Explore.css';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" renderButton />
      <div className="explore-container">
        <Link to="/explorar/comidas" data-testid="explore-food">Explorar Comidas</Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks">Explorar Bebidas</Link>
      </div>
      <LowerMenu />
    </div>
  );
}
