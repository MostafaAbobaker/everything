export interface IMenu {
  key: number
  label: string
  parentId: number
  secondLevels: SecondLevel[]
}

export interface SecondLevel {
  key: number
  label: string
  parentId: any
  thirdLevels: ThreeLevel[]
}

export interface ThreeLevel {
  key: number
  label: string
  parentId: any
}


