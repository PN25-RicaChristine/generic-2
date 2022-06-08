import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import { Pagination } from 'react-bootstrap'
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  onPrev(){
    const { selected } = this.props;
    if(selected > 0){
      this.props.onRetrieve(selected - 1)
    }
  }

  onNext(){
    const { selected, last } = this.props;
    console.log('>>>', selected, last);
    if(selected < last){
      this.props.onRetrieve(selected + 1)
    }
  }


  render() {
    const { pages, selected } = this.props;
    return (
        <div style={{
          display: 'flex',
          justifyContent: 'right'
        }}>
        <Pagination size="lg">
          {
            selected > 2 && (
                <Pagination.First 
                  onClick={() => this.props.onRetrieve(0)}/>
            )}
            { selected > 1 && (
                <Pagination.Prev 
                  onClick={() => this.onPrev()} />
            )
          }
          {
            pages && pages.map((item) => (
              <Pagination.Item
                active={item===selected ? true : false}
                onClick={() => this.props.onRetrieve(item)}
                >{item}</Pagination.Item>
            ))
          }
          <Pagination.Next 
            onClick={() => this.onNext()}/>
          <Pagination.Last
            onClick={() => this.props.onRetrieve(this.props.last)}/>
        </Pagination>
      </div>
    )
  }
}
