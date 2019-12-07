import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Togglable from '../components/Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    );
  });

  test('renders its children', () => {
    const testDiv = component.container.querySelector('.testDiv');
    expect(testDiv).not.toBeNull();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
    fireEvent.click(button);
    expect(div).toHaveStyle('display: block');
    // or
    // expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const closeButton = component.getByText('cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
