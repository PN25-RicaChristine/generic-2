import React from 'react';
import { BasicStyles } from 'common'
import Colors from 'common/Colors'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class RightClick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { menu } = this.props;
        return (
            <div style={{
                position: 'relative',
                right: 0,
                top: 0,
                height: 250,
                width: 250,
                backgroundColor: Colors.white,
                borderRadius: 5,
                zIndex: 1,
                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
            }}

                onMouseLeave={() => {
                    this.props.close()
                }}
            >
                <span style={{
                    position: 'relative',
                    top: this.props.from == 'file' ? -180 : 0,
                    paddingTop: 20,
                    paddingBottom: 20
                }}>
                    {
                        menu && menu.map((item, index) => (
                            <label style={{
                                width: '100%',
                                padding: 10,
                                zIndex: 999,
                                color: item.color
                            }}
                                className="href-link-dropdown"
                                key={index}
                                onClick={() => this.props.onClick(item)}
                            >
                                <FontAwesomeIcon icon={item.icon} size={'lg'} />
                                <b style={{
                                    paddingLeft: 10
                                }}>{item.title}</b>

                            </label>
                        ))
                    }
                </span>
            </div>
        )
    }
}

export default withRouter(RightClick);