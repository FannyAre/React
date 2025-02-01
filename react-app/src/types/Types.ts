export type Category = {
  strCategory:string;
}  
export type Meal={
  strMeal:string,
  strMealThumb:string,  
  idMeal:string,     
  favorite:boolean 
}
 export type SearchForm = {
  search: string;
}
export type MealDetails={
  [key:string]:string;
}  