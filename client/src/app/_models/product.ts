import { Brand } from "./brand";
import { Category } from "./category";
import { Photo } from "./Photo";

export interface Product {
    id: number;
    skn: string;
    productName: string;
    productDesc: string;
    photoUrl: string;
    category: Category;
    brand: Brand;
    photos: Photo[];
    recommendedMinimumAge: number;
    recommendedGender: string;
    productPrice: number;
    availableQty: number;
    minOrderQty: number;
  }

 
  
  
  