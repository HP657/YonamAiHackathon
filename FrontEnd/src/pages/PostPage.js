export default function PostListPage() {
  const posts = [
    {
      id: 1,
      title: '게시물 제목 1',
      author: '홍길동',
      date: '2023-10-01',
      summary: '게시물의 간단한 요약이나 설명이 여기에 들어갑니다.',
    },
    {
      id: 2,
      title: '게시물 제목 2',
      author: '이몽룡',
      date: '2023-10-02',
      summary: '게시물의 간단한 요약이나 설명이 여기에 들어갑니다.',
    },
    {
      id: 3,
      title: '게시물 제목 3',
      author: '성춘향',
      date: '2023-10-03',
      summary: '게시물의 간단한 요약이나 설명이 여기에 들어갑니다.',
    },
    {
      id: 4,
      title: '게시물 제목 4',
      author: '장길산',
      date: '2023-10-04',
      summary: '게시물의 간단한 요약이나 설명이 여기에 들어갑니다.',
    },
    {
      id: 5,
      title: '게시물 제목 5',
      author: '임꺽정',
      date: '2023-10-05',
      summary: '게시물의 간단한 요약이나 설명이 여기에 들어갑니다.',
    },
    {
      id: 6,
      title: '게시물 제목 6',
      author: '박문수',
      date: '2023-10-06',
      summary: '게시물의 간단한 요약이나 설명이 여기에 들어갑니다.',
    },
  ];

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>게시물 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className='mb-4 border-b pb-4'>
            <h2 className='text-2xl font-semibold'>{post.title}</h2>
            <p className='text-sm text-gray-500'>
              작성자: {post.author} | 날짜: {post.date}
            </p>
            <p className='text-gray-700 mt-2'>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
