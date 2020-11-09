export interface IExperts {
    userId: number,
    emailId: string,
    password: string,
    status: ExpertStatus,
    firstName: string,
    secondName: string,
    qualification: string,
    phone: string,
    bio: string,
    createdAt: Date,
}

enum ExpertStatus {
    'new',
  'active',
  'deleted'
}

export interface IExpertInstitution{
    userId: number,
    institutionId: number,
    isPrimary: boolean
}

export interface IExpertCategory {
    userId: number,
    categoryId: number
}

export interface IExpertSource {
    userId: number,
    sourceId: number
}

export interface IExpertRole {
    roleId: number,
    userId: number
}
