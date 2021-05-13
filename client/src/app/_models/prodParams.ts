import { Product } from "./product";

export class ProdParams {
    brand: string = "All";
    category: string = "All";
    searchString: string = "";
    MinAge = 0;
    MaxAge = 100;
    Gender: string = "All";
    OrderBy: string = "low";
    pageNumber :number = 1;
    pageSize :number = 5;
}