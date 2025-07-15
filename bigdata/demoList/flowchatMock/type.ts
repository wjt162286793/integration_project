export interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}