import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('../services/blogService.js');
import App from '../App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.getByTestId('app'));

    const blogs = component.container.querySelector('.blogs');

    expect(blogs.children.length).toBe(0);
  });
});
