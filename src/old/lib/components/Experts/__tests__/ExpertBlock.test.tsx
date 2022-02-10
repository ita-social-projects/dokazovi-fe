import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ExpertBlock } from '../ExpertBlock';
import { IExpert } from '../../../types';

const MOCK_DATA: IExpert = {
  id: 6,
  firstName: 'Таржеман',
  lastName: 'Соколов',
  email: 't.sokolov@mail.com',
  qualification: 'Кандидат медичних наук',
  phone: '+380633335533',
  avatar: 'https://i.pravatar.cc/300?img=44',
  bio:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
  socialNetwork: 'https://www.youtube.com',
  directions: [
    {
      id: 4,
      name: 'therapy',
      label: 'Терапія',
      color: '#ffee58',
      hasDoctors: true,
      hasPosts: true,
    },
  ],
  mainInstitution: {
    id: 4,
    city: {
      id: 119,
      name: 'Дніпро',
    },
    name: 'Медікум',
  },
  lastAddedPost: {
    id: 246,
    title: 'Sit amet consectetur',
  },
};

describe('ExpertBlock test', () => {
  it('should render component and match snapshot', () => {
    const { asFragment } = render(<ExpertBlock expert={MOCK_DATA} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render Expert's image", () => {
    render(<ExpertBlock expert={MOCK_DATA} />);
    expect(screen.getByAltText('doctor')).toBeInTheDocument();
  });
  it('should handle redirect to Expert page ', () => {
    const history = createMemoryHistory();
    history.push(`/experts/${MOCK_DATA.id}`);
    render(
      <Router history={history}>
        <ExpertBlock expert={MOCK_DATA} />
      </Router>,
    );
    fireEvent.click(screen.getByAltText('doctor'));
    expect(history.location.pathname).toBe('/experts/6');
  });
});
