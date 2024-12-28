import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Posts({ posts }) {
  const isNew = (date) => {
    const postDate = new Date(date);
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
    return postDate >= oneWeekAgo;
  };

  return (
    <ul>
      {posts.map((post, index) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h3 className='text-xl font-semibold flex items-center'>
              {isNew(post.date) && (
                <span className='inline-block bg-red-400 text-white text-xs rounded-full px-2 py-1 mr-2'>
                  NEW
                </span>
              )}
              {post.title}
            </h3>
            <p className='text-gray-700'>
              {post.description.length > 50
                ? `${post.description.substring(0, 50)}...`
                : post.description}
            </p>
            <div className='text-sm text-gray-500 mt-2'>
              <span>
                {post.author} | {post.date}
              </span>
            </div>
          </Link>
          {index < posts.length - 1 && <hr className='my-4 border-gray-300' />}
        </li>
      ))}
    </ul>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
