const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = likesArr => {
  if (likesArr.length === 0) return 0;
  if (likesArr.length === 1) return likesArr[0].likes;

  return likesArr.reduce((acc, cur) => {
    return acc + cur.likes;
  }, 0);
};

const favoriteBlog = blogs => {
  const mosteFavorite = blogs.reduce(
    (acc, cur) => (cur.likes >= acc.likes ? cur : acc),
    { likes: 0 }
  );

  delete mosteFavorite._id;
  delete mosteFavorite.__v;
  delete mosteFavorite.url;

  return mosteFavorite;
};

const mostBlogs = blogs => {
  const countedByAuthor = _.countBy(blogs, 'author');
  const maxBlogsKey = _.maxBy(
    Object.keys(countedByAuthor),
    o => countedByAuthor[o]
  );

  const result = {
    author: maxBlogsKey,
    blogs: countedByAuthor[maxBlogsKey]
  };

  return result;
};

const mostLikes = blogs => {
  const grouped = _.groupBy(blogs, 'author');
  const countedLikes = _.reduce(
    grouped,
    (result, value, key) => {
      result[key] = value.reduce((acc, cur) => acc + cur.likes, 0);
      return result;
    },
    {}
  );
  const maxLikesKey = _.maxBy(Object.keys(countedLikes), o => countedLikes[o]);

  const result = {
    author: maxLikesKey,
    likes: countedLikes[maxLikesKey]
  };
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
