import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpertInfo from '../ExpertInfo';
import { experts } from '../../../../__mocks__/experts';

beforeEach(() => render(<ExpertInfo expert={experts[0]} />));

describe('ExpertInfo testing', () => {
  it('Is expert avatar existing?', () => {
    const avatar = screen.getByAltText(/Photo/i);
    expect(avatar).toBeInTheDocument();
  });

  it('Is expert name existing?', () => {
    const expertFullName = `${experts[0].firstName} ${experts[0].lastName}`;
    const name = screen.getByText(expertFullName);
    expect(name).toBeInTheDocument();
  });

  it('Is divider existing?', () => {
    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
  });

  it('Is directions existing?', () => {
    const { container } = render(<ExpertInfo expert={experts[0]} />);
    const directions = container.querySelector('#box');
    expect(directions).toBeInTheDocument();
  });
});
