import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();

  return <h1>{id}</h1>;
};

export default PostDetail;
