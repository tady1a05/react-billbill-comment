import './App.css';
import React, { useEffect, useRef, useState } from "react";

function Comment({ comment, deleteComment }) {

  return (<comment-history className={`block  commentHistory`}>
    <user-name className={`block greyText`}>{comment.userName}</user-name>
    <comment className={'block comment'}>{comment.content}</comment>
    <comment-info className={'block'}>
      <span className={`greyText`}>{`${comment.createdDate.getFullYear()}-${comment.createdDate.getMonth() + 1}-${comment.createdDate.getDate()} ${comment.createdDate.getHours()}:${comment.createdDate.getMinutes()}:${comment.createdDate.getSeconds()}`} </span>
      <span className={`greyText`} style={{ marginLeft: '15px' }}>liked:</span>
      <span className={`greyText`}>{comment.liked}</span>
      <a href="#" className={`greyText`} style={{ textDecoration: 'none', marginLeft: '15px' }} onClick={() => deleteComment(comment.id)}>delete</a>
    </comment-info>
    <line-break className={`block lineBreak`} />
  </comment-history>);
}

function App() {
  const [comments, setComments] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    async function initData() {
      let response = await fetch("http://localhost:8000/commets");
      let res = await response.json();
      res.forEach(element => {
        element.createdDate = new Date(element.createdDate);
      });
      setComments(res);
    }
    initData();
  }, [])

  const postComment = () => {
    let tempComments = [...comments];

    tempComments.unshift({
      id: crypto.randomUUID(),
      userName: "Jack",
      content: inputVal,
      liked: Math.floor(Math.random() * 100),
      createdDate: new Date()
    })

    setComments(tempComments);
    setInputVal('');
    inputRef.current.focus();
    console.dir(inputRef.current);
  }

  const deleteComment = (id) => {
    let tempComments = [...comments];
    tempComments = tempComments.filter(tempComment => tempComment.id !== id);
    setComments(tempComments);
  }

  const sortCommentsByLikedDesc = () => {
    let tempComments = [...comments];
    tempComments.sort((a, b) => {
      return b.liked - a.liked
    })
    setComments(tempComments);
  }

  const sortCommentsByCreatedDateAsc = () => {
    let tempComments = [...comments];
    tempComments.sort((a, b) => {
      return b.createdDate - a.createdDate
    })
    setComments(tempComments);
  }

  return (
    <div>
      <comment-header className={'block'}>
        <comment-header-left>
          <span style={{ fontSize: '21px', fontWeight: 'bold' }}>Comment</span>
          <span className={'greyText'} style={{ marginLeft: '3px', marginRight: '3px' }}>{comments.length}</span>
        </comment-header-left>
        <comment-header-right style={{ position: 'relative', marginLeft: '15px' }}>
          <a href="#" className={'greyText'} style={{ textDecoration: 'none', paddingRight: '6px' }} onClick={() => sortCommentsByCreatedDateAsc()}>latest</a>
          <a href="#" className={'greyText'} style={{ textDecoration: 'none', paddingLeft: '6px' }} onClick={() => sortCommentsByLikedDesc()}>hotest</a>
          <div className={'greyLine'} />
        </comment-header-right>
      </comment-header>
      <comment-body className={'block'} style={{ padding: '10px' }}>
        <comment-area className={'block'}>
          <icon className={'icon'}></icon>
          <input className={'commentAreaText'} style={{ marginLeft: '10px', marginRight: '10px', paddingLeft: '10px' }} placeholder="Write a comment" value={inputVal} ref={inputRef} onChange={(e) => setInputVal(e.target.value)} />
          <button className={'commentBtn'} onClick={() => postComment()}>POST</button>
        </comment-area>
        {comments.map(comment =>
          <Comment comment={comment} deleteComment={deleteComment} />
        )}
      </comment-body>
    </div >
  );
}

export default App;
