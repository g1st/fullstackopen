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
  },
  {
    likes: 0,
    user: [
      {
        username: 'username1',
        name: 'name1',
        id: '5ddc22cd30f7187e18a93180'
      }
    ],
    title: 'wed',
    author: 'wed',
    url: 'wed',
    id: '5deb8615a5d59f3b6dce761f'
  }
];

const getAll = () => Promise.resolve(blogs);

const setToken = newToken => {
  const token = `bearer ${newToken}`;
};

export default { getAll, setToken };
