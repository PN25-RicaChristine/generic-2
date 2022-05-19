import React, { useEffect, useState, Component} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state={
      value: '',
      inputted: ''
    }
  }

  componentDidMount() {
    this.setState({value: this.props.data})
  }

  onEditorChange = (value, delta, source, editor) => {
    this.setState({
      value: editor.getContents(),
      inputted: value
    });
  }

  render(){
    return (
      <div style={{float: 'left',
        width: '100%', paddingLeft: '2%', marginTop: '2%'}}>
        <ReactQuill theme="snow" value={this.state.value}  onChange={this.onEditorChange}/>
        <Button title={'Save'} onClick={() => this.props.handleInput(this.state.inputted)} 
          style={{
            backgroundColor: 'transparent',
            float: 'right',
            color: Colors.footerIcons
          }}/>
      </div>
    );
  }
}

export default TextEditor;
