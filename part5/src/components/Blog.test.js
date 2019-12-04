import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const blogs = [
    {
      likes: 45,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      id: '5a422aa71b54a676234d17f8'
    },
    {
      likes: 8,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      id: '5a422a851b54a676234d17f7'
    },
    {
      likes: 10,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      id: '5a422ba71b54a676234d17fb'
    },
    {
      likes: 12,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      id: '5a422b3a1b54a676234d17f9'
    },
    {
      likes: 13,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'First class tests',
      author: 'Robert C. Martin',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      id: '5a422b891b54a676234d17fa'
    },
    {
      likes: 2,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      id: '5a422bc61b54a676234d17fc'
    },
    {
      likes: 3,
      user: [
        {
          username: 'username1',
          name: 'name1',
          id: '5ddc22cd30f7187e18a93180'
        }
      ],
      title: 'we',
      author: 'wedw',
      url: 'we',
      id: '5de6baae77c5f61c0c0f7b6e'
    }
  ];
  const user = {
    token: 'abc',
    name: 'john',
    username: 'johnasito',
    id: '123'
  };
  beforeEach(() => {
    component = render(<Blog blog={blogs[0]} blogs={blogs} user={user} />);
  });

  test('initially renders title and author component', () => {
    expect(component.container).toHaveTextContent('Edsger W. Dijkstra');
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    );
  });

  test('initially do not render url, likes, username or button', () => {
    expect(component.container).not.toHaveTextContent('www.');
    expect(component.container).not.toHaveTextContent('likes:');
    expect(component.container).not.toHaveTextContent('added by');
    const button = component.container.querySelector('button');
    expect(button).toBeNull();
  });

  test('on blog title click additional information becomes visible', () => {
    const blogTitle = component.getByTestId('more-info');
    fireEvent.click(blogTitle);
    const button = component.container.querySelector('button');

    expect(component.container).toHaveTextContent('www.');
    expect(component.container).toHaveTextContent('likes:');
    expect(component.container).toHaveTextContent('added by');
    expect(button).not.toBeNull();
  });
});
