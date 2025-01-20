export function formatCurrenct(amount: number) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getImagePath(imagePath: string) {
  const clouBase = "https://res.cloudinary.com";

  if (imagePath.startsWith(clouBase)) {
    return imagePath;
  } else {
    return `/products/${imagePath}.jpg`;
  }
}
