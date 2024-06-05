import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
    state = {
        content: '',
        comments: [],
    }
    
    commentChange = evt => {
      const {name, value} = evt.target;
      this.setState({
        [name]: value,
      }
      )
    }

    submitHandler = evt => {
      evt.preventDefault();
      const {comments, content} = this.state;

      if(content === '') {
        return;
      }

      const copyComments = comments.slice();
      copyComments.push(content);

      this.setState({comments: copyComments});
      this.setState({content: ''});
    }

    addComment() {
      //tutaj skończyłem
      const {comments} = this.state;
      const commentsList = comments.map(item => {
        return (
          <li>{item}</li>
        );
      })

      return commentsList;
    }

    render() {
        const {title, body} = this.props;
        return (
            <article>
                <h1>{ title }</h1>
                <p>{ body }</p>
                <section>
                    <form onSubmit = {this.submitHandler}>
                        <div>
                            <label>
                                <textarea 
                                    style={{ "minWidth": "300px", "minHeight": "120px" }} 
                                    name="content" value = {this.state.content} onChange = {this.commentChange}
                                />
                            </label>
                        </div>
                        <div><input type="submit" value="dodaj komentarz" /></div>
                    </form>
                    <ul>
                        {this.addComment()}
                    </ul>
                </section>
            </article>
        )
    }
}

root.render(
    <Article 
        title="Programowanie jest super!"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam..."
    />
);
