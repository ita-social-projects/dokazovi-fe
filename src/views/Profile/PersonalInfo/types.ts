export interface INewAuthorValues {
  avatar: string;
  firstName: string;
  lastName: string;
  regionId: number;
  cityId: number;
  bio: string;
  email: string;
  socialNetwork: (string | null)[];
}

export interface IErrorFields {
  avatar: string;
  lastName: string;
  firstName: string;
  regionId: string;
  cityId: string;
  email: string;
  work: string;
  bio: string;
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
  linkedin: string;
  socialNetwoks: string;
}

export interface IVisitFields {
  lastName: boolean;
  firstName: boolean;
  region: boolean;
  city: boolean;
  email: boolean;
  work: boolean;
  bio: boolean;
  facebook: boolean;
  instagram: boolean;
  youtube: boolean;
  twitter: boolean;
  linkedin: boolean;
}

export interface IRegionCityHandlerProps {
  newAuthorValues: INewAuthorValues;
  errorFields: IErrorFields;
  visitFields: IVisitFields;
  setNewAuthorValues: React.Dispatch<React.SetStateAction<INewAuthorValues>>;
  setErrorFields: React.Dispatch<React.SetStateAction<IErrorFields>>;
  blurHandler: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}
