import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostCreationButtons } from './PostCreationButtons';

describe('PostCreationButton test', () => {
  const publish = jest.fn();
  const mockPost = {
    id: 8,
    title: 'Як підготуватися до вакцинації',
    content:
      '<p>https://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i...',
    author: {
      firstName: 'Bill',
      id: 56,
      lastName: 'Yamamoto',
      mainInstitution: {
        city: {
          id: 190,
          name: 'Київ',
        },
        id: 10,
        name: 'UNICEF Ukraine',
      },
    },
    directions: [{ id: 7, name: 'pediatrics' }],
    type: { id: 1, name: 'Стаття' },
    status: 'ARCHIVED',
    createdAt: '25.10.2021',
    publishedAt: '25.10.2021',
    origins: [{ id: 1, name: 'Думка експерта', parameter: null }],
    preview:
      'cvj;qdksjn;ckjnqsd;jkcvnq;sjdhcfn;wejqnhc;vksdnc;jkasdn;jkfd;skcn',
  };

  it('should render properly', () => {
    const { asFragment } = render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        onSaveClick={jest.fn}
        isAdmin
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
        onSaveClick={jest.fn}
        isModal={{ isTooLong: true, isEmpty: false, isEnoughLength: false }}
        isAdmin
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
        onSaveClick={jest.fn}
        isModal={{ isEmpty: true, isEnoughLength: false }}
        isAdmin
      />,
    );
    const publishButton = screen.getByText('Зберегти');
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
        onSaveClick={jest.fn}
        isModal={{ isEmpty: false, isEnoughLength: true }}
        isAdmin
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
        isAdmin
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        onSaveClick={jest.fn}
        isModal={{ isEmpty: false, isEnoughLength: false, isVideoEmpty: true }}
        post={mockPost}
      />,
    );
    const publishButton = screen.getByText('Опублікувати');
    userEvent.click(publishButton);
    expect(screen.getByText('Додайте, будь ласка, відео')).toBeInTheDocument();
  });
  it('should render hasBackGroundImg Modal', () => {
    render(
      <PostCreationButtons
        action="updating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        onSaveClick={jest.fn}
        previewing
        isModal={{
          isEmpty: false,
          isEnoughLength: false,
          hasBackGroundImg: true,
        }}
        post={mockPost}
        isAdmin
      />,
    );
    const publishButton = screen.getByText('Опублікувати');
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
        onSaveClick={jest.fn}
        previewing
        isAdmin
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
        onSaveClick={jest.fn}
        previewing
      />,
    );
    const cancelButton = screen.getByText('Відмінити редагування');
    userEvent.click(cancelButton);
    expect(
      screen.getByText(`Ви дійсно бажаєте відмінити Редагування?`),
    ).toBeInTheDocument();
  });
  it('should render sendToReview Button for Author user', () => {
    render(
      <PostCreationButtons
        action="creating"
        onPublishClick={publish}
        onPreviewClick={jest.fn}
        onSaveClick={jest.fn}
        isAdmin={false}
      />,
    );
    expect(screen.getByText('Відправити на модерацію')).toBeInTheDocument();
  });
});
