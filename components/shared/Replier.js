import { useState } from 'react';

function Replier({ isOpen, onClose, closeBtn: CloseBtn, onSubmit, replyTo }) {
  const [reply, setReply] = useState({ title: '', content: '' });
  const handleChange = e => {
    const { name, value } = e.target;
    setReply({ ...reply, [name]: value });
  };

  const resetReplier = () => {
    setReply({ title: '', content: '' });
  };
  return (
    <div className={`reply-controls ${isOpen ? 'is-open' : ''}`}>
      <div className="reply-area">
        {replyTo && (
          <div className="reply-to">
            Reply To: <span className="text ml-2">User1</span>{' '}
          </div>
        )}
        <div className="fj-editor-input mt-2">
          <input
            value={reply.title}
            onChange={handleChange}
            name="title"
            placeholder="Topic title"
            type="text"
          ></input>
        </div>
        <div className="fj-editor">
          <div className="fj-editor-textarea-wrapper">
            <textarea
              value={reply.content}
              onChange={handleChange}
              name="content"
              placeholder="Type here"
            ></textarea>
          </div>
          <div className="fj-editor-preview-wrapper">
            <div className="preview">
              <p></p>
            </div>
          </div>
        </div>
        <div className="submit-area">
          <div className="send mr-auto">
            <button
              onClick={() => {
                onSubmit(reply, resetReplier);
              }}
              className="btn btn-main bg-blue py-2 ttu"
            >
              Reply
            </button>
            {/* <a className="btn py-2 ttu gray-10" onClick={onClose}>
              Cancel
            </a> */}
            <CloseBtn />
          </div>
          <div>
            <a className="btn py-2 ttu gray-10">hide preview</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Replier;
