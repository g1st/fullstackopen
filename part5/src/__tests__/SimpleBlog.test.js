import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import SimpleBlog from '../components/SimpleBlog';

describe('<SimpleBlog />', () => {
  let component;
  beforeEach(() => {
    const blog = {
      title: 'blog title',
      author: 'John Doe',
      likes: 123
    };

    component = render(<SimpleBlog blog={blog} />);
  });

  test('component renders the title and author', () => {
    const title = component.getByTestId('titleDiv');
    expect(title).toHaveTextContent('blog title');
    expect(title).toHaveTextContent('John Doe');
  });

  test('component renders likes', () => {
    const likes = component.getByTestId('likesDiv');
    expect(likes).toHaveTextContent('123');
  });

  test('function gets called correctly after button presses', () => {
    const blog = {
      title: 'blog title',
      author: 'John Doe',
      likes: 123
    };
    const cb = jest.fn();
    const mockComponent = render(<SimpleBlog blog={blog} onClick={cb} />);
    const button = mockComponent.container.querySelector('button');

    fireEvent.click(button);
    fireEvent.click(button);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});
