export type ChartOverviewData = {
  dailyUserValues: number[]
  applicationDomainDistribution: Array<{ key: string; value: number }>
  mainRegions: Array<{ key: string; value: number }>
  moduleUsageDistribution: Array<{ key: string; value: number }>
  mainAssetGrowth: Array<{ key: string; values: number[] }>
  map: {
    points: Array<{ value: [number, number]; itemStyle?: { color: string } }>
    lines: Array<{ coords: [[number, number], [number, number]]; lineStyle?: { color: string } }>
  }
}

export type ApiResponse<T> = {
  code: number
  msg: string
  data: T
}
