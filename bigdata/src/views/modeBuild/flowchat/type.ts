export interface NodeStatus {
  id: string
  status: 'default' | 'pending' | 'running' | 'success' | 'failed' | 'skipped'
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
