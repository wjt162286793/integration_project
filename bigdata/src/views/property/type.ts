export interface DataType {
  id: number;
  name: string;
  price: number;
  source: string;
  tags: string[];
  type:string;
  level:number;
  status: string;
  liable_name: string;
  create_time: string;
  update_time: string;
}

export interface queryType{
    name:string;
    level:number | null;
    status:string;
}
export interface optionsType{
    label:string;
    value:number | string;
}