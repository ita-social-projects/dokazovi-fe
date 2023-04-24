import { IExpert } from 'old/lib/types';

export interface INewAuthorValues {
  avatar?: string;
  firstName: string;
  lastName: string;
  regionId: number | null;
  cityId: number | null;
  bio: string;
  email?: string;
  socialNetwork: (string | null)[];
  work: string;
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
  socialNetworks: string[];
  socialNetwoksRequired: string;
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
  visitFields: IVisitFields;
  errorMessages: IErrorFields;
  setNewAuthorValues: React.Dispatch<React.SetStateAction<INewAuthorValues>>;
  blurHandler: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export interface IEditAuthorProps {
  author?: IExpert;
}
