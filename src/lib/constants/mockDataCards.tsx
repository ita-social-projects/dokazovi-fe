import { IExpert, ExpertStatus } from '../types';

const cards: IExpert[] = [
  {
    status: ExpertStatus.ACTIVE,
    firstName: 'Oleksandr',
    secondName: 'Adamenko',
    email: 'adamenko@gmail.com',
    phone: '+380980000000',
    photo:
      'https://purepng.com/public/uploads/large/purepng.com-manmanadult-malemale-childboy-beingmens-1421526920869cscbo.png',
  },
  {
    status: ExpertStatus.DELETED,
    firstName: 'Andriy',
    secondName: 'Bushyn',
    email: 'byshin@gmail.com',
    phone: '+380987770000',
    photo:
      'https://purepng.com/public/uploads/large/purepng.com-manmanadult-malemale-childboy-beingmens-1421526920869cscbo.png',
  },
  {
    status: ExpertStatus.NEW,
    firstName: 'Leonid',
    secondName: 'Liah',
    email: 'liah@gmail.com',
    phone: '+380988090000',
    photo:
      'https://purepng.com/public/uploads/large/purepng.com-manmanadult-malemale-childboy-beingmens-1421526920869cscbo.png',
  },
];

export default cards;
