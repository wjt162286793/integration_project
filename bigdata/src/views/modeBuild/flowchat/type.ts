export interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}
export interface dataInfoItemType{
  id:string;
  data:{
    label:string;
    desc:string;
    status:string | null;
    [propName:string]:any
  }
}

export type FunFromUseState = React.Dispatch<React.SetStateAction<Node | null>>
