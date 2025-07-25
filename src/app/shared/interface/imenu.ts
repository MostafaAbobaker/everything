export interface IMenu {
  id: number
  name: string
  nameAr: string
  levelNumber: number
  parentId: number
  subCount: number
  imageUrl: string
  iconUrl: string
  hassub: number
  secondLevels: SecondLevel[]
}

export interface SecondLevel {
  id: number
  name: string
  nameAr: string
  threeLevels: ThreeLevel[]
}

export interface ThreeLevel {
  id: number
  name: string
  nameAr: string
}


