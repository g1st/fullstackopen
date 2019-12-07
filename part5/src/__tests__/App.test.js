import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
jest.mock('../services/blogService.js');
import App from '../App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.getByText('Bloglist'));
    const blogs = component.container.querySelector('.blogs');

    expect(blogs).toBeNull();
  });

  test('when user is logged in blogs are rendered to the page', async () => {
    const user = {
      username: 'test',
      token: '123abc123',
      name: 'John Doe'
    };

    localStorage.setItem('user', JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.getByText('Bloglist'));

    const blogs = component.container.querySelector('.blogs');

    expect(blogs.children.length).toBe(8);
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    );
    expect(component.container).toHaveTextContent('React patterns');
    expect(component.container).toHaveTextContent('TDD harms architecture');
  });
});
