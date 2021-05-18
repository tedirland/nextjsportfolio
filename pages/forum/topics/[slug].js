import BaseLayout from '@/layouts/BaseLayout';
import { useState } from 'react';
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
} from '../../../apolloLogic/actions';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '@/components/forum/PostItem';
import Replier from '@/components/shared/Replier';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
  const { data: dataP } = useGetPostsByTopic({ variables: { slug } });
  const { data: dataU } = useGetUser();
  const topic = (dataT && dataT.topicBySlug) || {};
  const posts = (dataP && dataP.postsByTopic) || [];
  const user = (dataU && dataU.user) || null;

  return { topic, posts, user };
};

const PostPage = () => {
  const { topic, posts, user } = useInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts posts={posts} topic={topic} user={user} />
    </BaseLayout>
  );
};

const Posts = ({ posts, topic, user }) => {
  const [isReplierOpen, setIsReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  return (
    <section className="mb-5">
      <div className="fj-post-list">
        {topic._id && <PostItem className="topic-post-lead" post={topic} />}
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
          </div>
        </div>
      </div>
      <Replier
        isOpen={isReplierOpen}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        onSubmit={() => {}}
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
