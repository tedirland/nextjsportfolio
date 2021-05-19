import BaseLayout from '@/layouts/BaseLayout';
import { useState, useRef } from 'react';
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
  useCreatePost,
} from '../../../apolloLogic/actions';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '@/components/forum/PostItem';
import Replier from '@/components/shared/Replier';
import { toast } from 'react-toastify';
import AppPagination from '@/components/shared/AppPagination';

const useInitialData = (slug, pagination) => {
  const { data: dataT } = useGetTopicBySlug({
    variables: { slug },
  });
  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination },
    fetchPolicy: 'cache-and-network',
  });
  const { data: dataU } = useGetUser();
  const topic = (dataT && dataT.topicBySlug) || {};
  const postData = (dataP && dataP.postsByTopic) || { posts: [], count: 0 };
  const user = (dataU && dataU.user) || null;

  return { topic, ...postData, user, fetchMore };
};

const PostPage = () => {
  const router = useRouter();
  const { slug, pageNum = 1, pageSize = 5 } = router.query;
  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });
  const { topic, posts, user, fetchMore, ...rest } = useInitialData(
    slug,
    pagination
  );

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts
        posts={posts}
        topic={topic}
        user={user}
        fetchMore={fetchMore}
        {...rest}
        {...pagination}
        onPageChange={(pageNum, pageSize) => {
          router.push(
            '/forum/topics/[slug]',
            `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
            { shallow: true }
          );

          setPagination({ pageNum, pageSize });
        }}
      />
    </BaseLayout>
  );
};

const Posts = ({ posts, topic, user, fetchMore, ...pagination }) => {
  const pageEnd = useRef();
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setIsReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const { pageSize, count, pageNum } = pagination;

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }
    reply.topic = topic._id;
    await createPost({ variables: reply });
    let lastPage = Math.ceil(count / pageSize);
    if (count === 0) {
      lastPage = 1;
    }

    lastPage === pageNum &&
      (await fetchMore({
        variables: { pageSize, pageNum: lastPage },
        updateQuery: (previousResults, { fetchMoreResult }) => {
          return Object.assign({}, previousResults, {
            postsByTopic: { ...fetchMoreResult.postsByTopic },
          });
        },
      }));
    resetReplier();
    cleanUp();
  };

  const cleanUp = () => {
    setIsReplierOpen(false);
    toast.success('Your post has been created!', { autoClose: 2000 });
    scrollToEnd();
  };

  const scrollToEnd = () =>
    pageEnd.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="mb-5">
      <div className="fj-post-list">
        {topic._id && pagination.pageNum === 1 && (
          <PostItem className="topic-post-lead" post={topic} />
        )}
        {posts.map(post => (
          <div key={post._id} className="row">
            <div className="col-md-9">
              <PostItem
                post={post}
                canReply={user !== null}
                onReply={reply => {
                  setReplyTo(reply);
                  setIsReplierOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setIsReplierOpen(true);
                  }}
                  className="btn btn-lg btn-outline-primary"
                >
                  Create New Post
                </button>
              </div>
            )}

            <div className="pagination-container ml-auto">
              <AppPagination {...pagination} />
            </div>
          </div>
        </div>
      </div>
      <div ref={pageEnd}></div>
      <Replier
        isOpen={isReplierOpen}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        onSubmit={handleCreatePost}
        onClose={() => setIsReplierOpen(false)}
        closeBtn={() => (
          <a
            className="btn py-2 ttu gray-10"
            onClick={() => setIsReplierOpen(false)}
          >
            Cancel
          </a>
        )}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });
