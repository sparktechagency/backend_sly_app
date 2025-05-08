export const refineOrderData = (arrayOfOrders: any) => {
  const refinedData: any = [];
  for (let i = 0; i < arrayOfOrders.length; i++) {
    const singleOrderData = arrayOfOrders[i].toObject();
    singleOrderData.productsData = JSON.parse(singleOrderData.productsData);
    refinedData.push(singleOrderData);
  }
  return refinedData;
};
