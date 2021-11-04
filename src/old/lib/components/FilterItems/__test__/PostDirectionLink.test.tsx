import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { PostDirectionLink } from '../PostDirectionLink';

const history = createMemoryHistory();

const directionMock = {
  id: 7,
  name: 'ophthalmology',
  label: 'Офтальмологія',
  color: '#00ffff',
  hasPosts: true,
  hasDoctors: true,
};

describe('Component renders correctly', () => {
  it('should render direction name', () => {
    render(
      <Router history={history}>
        <PostDirectionLink direction={directionMock} />
      </Router>,
    );
    expect(screen.getByText('Офтальмологія')).toBeInTheDocument();
  });

  it('should update path by click', () => {
    const { container } = render(
      <Router history={history}>
        <PostDirectionLink direction={directionMock} />
      </Router>,
    );
    const element = container.firstElementChild;
    fireEvent.click(element);
    expect(history.length).toEqual(2);
  });
});
