type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};
type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
