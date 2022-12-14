import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Comment } from './Comment';
import styles from './Post.module.css';
import { Avatar } from './Avatar';

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([
    'Muitoo Massa!' 
  ]);
const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBr
  })

  const publishDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })

  function handleCrateNewComment() {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('');

    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function deleteComment(commentToDelete) {
     const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
  }

   const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.rule}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}> Publicado {publishDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          // usar switch
          if(line.type === 'paragraph') {
            return <p>{line.content}</p>
          } else if(line.type === 'link') {
            return <p><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        
        <textarea name="comment" placeholder="Deixe um comentário" value={newCommentText}
          onChange={handleNewCommentChange} onInvalid={handleNewCommentInvalid}
          required/>

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

        <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} onDeleteComment={deleteComment} content={comment} />
        })}
      </div>

    </article>
    
  )
}