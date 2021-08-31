import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../styles/components/loading.css';

export default function Loading() {
  return (
    <div className="loading-style">
      <Spinner animation="border" variant="dark" />
    </div>
  );
}
