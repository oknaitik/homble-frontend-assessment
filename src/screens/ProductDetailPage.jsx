// src/screens/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../axios';
import { Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequest(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (loading) {
    return <div><CircularProgress /></div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h5">${product.sellingPrice}</Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{product.description}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Allergen Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{product.allergenInfo}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Usage Instructions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{product.usageInstructions}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductDetailPage;