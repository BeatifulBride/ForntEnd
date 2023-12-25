import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import React from 'react';
import LikeButtonCSS from './LikeButton.module.css';

class LikeButton extends React.Component{
    state ={
        isChecked : false,  //체크가 되었는지 확인하는 state
        notice : '',        //아래 하단의 좋아요의 표현 state
    };

    //좋아요 버튼 핸들러
    onClick = () => {
        this.state.isChecked?
            this.setState({
                isChecked: false,
                noteice:'',
            })
            :
            this.setState({
                isChecked:true,         //true 일 때 빨간색
                notice: '좋아요 1회',
            });
    }
    render(){
        return(
            <React.Fragment>
                <div className={LikeButtonCSS.icons_list}>
                    {this.state.isChecked ?
                        <HeartFilled className={LikeButtonCSS.button_red} onClick={this.onClick}/> :
                        <HeartOutlined className={LikeButtonCSS.button} onClick={this.onClick}/>}
                    <h3>{this.state.notice}</h3>
                </div>
            </React.Fragment>
        )
    }
}
export default LikeButton;