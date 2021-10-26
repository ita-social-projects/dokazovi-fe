import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostCreationButtons } from './PostCreationButtons';

describe('PostCreationButton test', () => {
  const publish = jest.fn();

  it('should render properly', () => {
    const { asFragment } = render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render isTooLong Modal', () => {
    render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        isModal={{ isTooLong: true, isEmpty: false, isEnoughLength: false }}
      />,
    );
    const publishButton = screen.getByText('Опублікувати');
    userEvent.click(publishButton);
    expect(screen.getByText('Ви ввели забагато символів')).toBeInTheDocument();
  });
  it('should render isEmpty Modal', () => {
    render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        isModal={{ isEmpty: true, isEnoughLength: false }}
      />,
    );
    const publishButton = screen.getByText('Опублікувати');
    userEvent.click(publishButton);
    expect(
      screen.getByText(
        'Заповніть, будь-ласка, обов`язкові поля, помічені зірочкою',
      ),
    ).toBeInTheDocument();
  });
  it('should render isEnoughLength Modal', () => {
    render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        isModal={{ isEmpty: false, isEnoughLength: true }}
      />,
    );
    const publishButton = screen.getByText('Опублікувати');
    userEvent.click(publishButton);
    expect(
      screen.getByText('Ви ввели недостатньо символів'),
    ).toBeInTheDocument();
  });
  it('should render isVideoEmpty Modal', () => {
    render(
      <PostCreationButtons
        action="updating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        isModal={{ isEmpty: false, isEnoughLength: false, isVideoEmpty: true }}
      />,
    );
    const publishButton = screen.getByText('Зберегти');
    userEvent.click(publishButton);
    expect(screen.getByText('Додайте, будь ласка, відео')).toBeInTheDocument();
  });
  it('should render hasBackGroundImg Modal', () => {
    render(
      <PostCreationButtons
        action="updating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        previewing
        isModal={{
          isEmpty: false,
          isEnoughLength: false,
          hasBackGroundImg: true,
        }}
      />,
    );
    const publishButton = screen.getByText('Зберегти');
    userEvent.click(publishButton);
    expect(
      screen.getByText(`Фонове зображення обов'язкове`),
    ).toBeInTheDocument();
  });
  it('should render Confirmation Modal with correct text when user create post', () => {
    const cancelHandlerClick = jest.fn();
    render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onCancelClick={cancelHandlerClick}
        onPreviewClick={jest.fn}
        previewing
      />,
    );
    const cancelButton = screen.getByText('Відмінити створення');
    userEvent.click(cancelButton);
    expect(
      screen.getByText(`Ви дійсно бажаєте відмінити Створення?`),
    ).toBeInTheDocument();
  });
  it('should render Confirmation Modal with correct text when user update post', () => {
    const cancelHandlerClick = jest.fn();
    render(
      <PostCreationButtons
        action="updating"
        onPublishClick={publish}
        onCancelClick={cancelHandlerClick}
        onPreviewClick={jest.fn}
        previewing
      />,
    );
    const cancelButton = screen.getByText('Відмінити редагування');
    userEvent.click(cancelButton);
    expect(
      screen.getByText(`Ви дійсно бажаєте відмінити Редагування?`),
    ).toBeInTheDocument();
  });
});
