/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { ExpertsViewCard } from '../../../../lib/components/Experts/ExpertsViewCard';
import { store } from '../../../../store/store';
import { ExpertBlock } from '../../../../lib/components/Experts/ExpertBlock';
import { experts } from '../../../../__mocks__/experts';

type ComponentPropsType = React.ComponentProps<typeof ExpertBlock>;

const baseProps: ComponentPropsType = {
  expert: {
    firstName: 'Myhailo',
    lastName: 'Ordynskyi',
    id: 1,
    avatar:
      'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
  },
};

function renderUI(props: Partial<ComponentPropsType> = {}) {
  const rtlProps = render(<ExpertBlock {...baseProps} {...props} />);
  return {
    ...rtlProps,
    rerender: (newProps: Partial<ComponentPropsType>) =>
      rtlProps.rerender(
        <ExpertBlock {...baseProps} {...props} {...newProps} />,
      ),
  };
}

describe('MainExpertsView', () => {
  it('renders ExpertBlocks equal to experts fetched', () => {
    render(
      <Provider store={store}>
        <ExpertsViewCard cards={experts} />
      </Provider>,
    );
    const resultLength = 11;
    const blocks = screen.queryAllByAltText(/doctor/i);
    expect(blocks).toHaveLength(resultLength);
  });

  it('has title Experts', () => {
    render(
      <Provider store={store}>
        <ExpertsViewCard cards={experts} />
      </Provider>,
    );
    const renderedMainExpertsView = screen.queryAllByText(/Експерти/i);
    expect(renderedMainExpertsView).toBeTruthy();
  });

  it('reacts to expert change', () => {
    const { rerender } = renderUI(baseProps);

    rerender({
      expert: {
        firstName: 'Myhailo',
        lastName: 'Ordynskyi',
        id: 1,
      },
    });
  });
});
