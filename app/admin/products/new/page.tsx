import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import React from "react";

function CreateProductPage() {
  return (
    <div>
      <Heading>CreateProductPage</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </div>
  );
}

export default CreateProductPage;
