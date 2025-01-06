import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Posts({ posts }) {
  const isNew = (date) => {
    const postDate = new Date(date);
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
    return postDate >= oneWeekAgo;
  };

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {sortedPosts && sortedPosts.length > 0 ? (
        <ul>
          {sortedPosts.map((post, index) => (
            <li key={post.postId}>
              <Link to={`/post/${post.postId}`}>
                <h3 className='text-xl font-semibold flex items-center'>
                  {isNew(post.createdAt) && (
                    <span className='inline-block bg-red-400 text-white text-xs rounded-full px-2 py-1 mr-2'>
                      NEW
                    </span>
                  )}
                  {post.title}
                </h3>
                <p className='text-gray-700'>
                  {post.contents.length > 50
                    ? `${post.contents.substring(0, 50)}...`
                    : post.contents}
                </p>
                <div className='text-sm text-gray-500 mt-2'>
                  <span>
                    {post.author} | {new Date(post.createdAt).getFullYear()}-
                    {(new Date(post.createdAt).getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}
                    -
                    {new Date(post.createdAt)
                      .getDate()
                      .toString()
                      .padStart(2, '0')}
                  </span>
                </div>
              </Link>
              {index < sortedPosts.length - 1 && (
                <hr className='my-4 border-gray-300' />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      contents: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};
