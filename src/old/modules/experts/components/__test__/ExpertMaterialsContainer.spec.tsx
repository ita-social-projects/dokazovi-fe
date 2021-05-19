import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpertMaterialsContainer from '../ExpertMaterialsContainer';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { useHistory } from 'react-router-dom';

beforeEach(() =>
  render(
    <Provider store={store}>
      <ExpertMaterialsContainer expertId={13} />
    </Provider>,
  ),
);

describe('ExpertInfo testing', () => {
  it('Is expert avatar existing?', () => {
    screen.debug();
    const [article, video, story] = screen.getAllByRole('checkbox');
    expect(article).toBeInTheDocument();
  });
});
