import React, {Component} from 'react';

class CommentBox extends Component {
    
    constructor(props){
        super(props)

        this.state ={
        comment: ''
        }
    }

    handleCommentChange = event => {
        this.setState({
            comment: event.target.value
        })
    }
    render(){
    return (
        <div>
        <form> 
            <div>
            <label>Comment</label>
            <textarea type="text" value={this.state.comment} onChange={this.handleCommentChange}/>
            </div>
        </form>
        </div>
    )}
}

export default CommentBox