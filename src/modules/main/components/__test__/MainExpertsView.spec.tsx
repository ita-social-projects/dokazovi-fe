/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MainExpertsView } from '../MainExpertsView';
import { store } from '../../../../store/store';
import { ExpertBlock } from '../../../../lib/components/ExpertBlock';

type ComponentProps = React.ComponentProps<typeof ExpertBlock>;

const baseProps: ComponentProps = {
 expert: {
  firstName: 'Myhailo',
  secondName: 'Ordynskyi',
  phone: '+380987089024',
  photo: 'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
 }
};

function renderUI(props: Partial<ComponentProps> = {}) {
  const rtlProps = render(<ExpertBlock {...baseProps} {...props} />);
  return {
    ...rtlProps,
    rerender: (newProps: Partial<ComponentProps>) =>
      rtlProps.rerender(<ExpertBlock {...baseProps} {...props} {...newProps} />)
  };
}

describe('MainExpertsView', () => {
  it('renders ExpertBlocks equal to experts fetched', () => {
    render(
      <Provider store={store}>
        <MainExpertsView />
      </Provider>,
    );
    const resultLength = store.getState().main.experts.length;
    const blocks = screen.queryAllByTestId('expertBlock');
    expect(blocks).toHaveLength(resultLength);
  });

  it('renders images equal to number of experts', () => {
    render(
      <Provider store={store}>
        <MainExpertsView />
      </Provider>,
    );
    const resultLength = store.getState().main.experts.length;
    const images = screen.queryAllByAltText('doctor');
    expect(images).toHaveLength(resultLength);
  });

  it("reacts to expert change", () => {
    const { rerender } = renderUI(baseProps);

    rerender({expert:{
      firstName: 'Myhailo',
      secondName: 'Ordynskyi',
      phone: '+3809870890rg'
    }
    });
  });
});
