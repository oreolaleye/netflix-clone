import React from 'react';
import { useHistory } from "react-router-dom";
import plus from "../images/plus.svg";

function Modal(props) {
    const history = useHistory();

    const divStyle ={
        display: props.displayModal ? "block" : "none"
    }
    const closeModal =(e) =>{
        e.stopPropagation();
        props.closeModal();
    }

    const toVideo = () =>{
        history.push(props.bannerData.video);
    }


    return (
        <div>
            <div className="modal">
                <div className="inner_modal_scroll">
                    <div className="inner_modal">
                        <div className="modal_close">
                        <button type="button" className="modal_close_icon" data-dismiss="modal" ria-label="Close" onClick={closeModal} >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        
                        </div>
                        <video className="modal_video" autoPlay   poster={props.bannerData.bannerImage}>
                            <source src={props.bannerData.video} type="video/mp4" />
                        </video>
                        <div className="modal_video_title">
                            <h1>{props.bannerData.title}</h1>
                            <button className="btn-1" onClick={()=> window.location.href=props.bannerData.video}>▶️ Play</button>
                        </div>
                        <div className="modal_desc">
                            <div className="modal_desc_left">
                                <div className="modal_desc_left_top">
                                    <span>{props.bannerData.year}</span>
                                    <span>{props.bannerData.rating}</span>
                                    <span>{props.bannerData.duration}</span>
                                </div>
                                <div>
                                    <p>{props.bannerData.synopsis}</p>
                                </div>
                            </div>
                            <div className="modal_desc_right">
                                <div>
                                    <p><span>Cast: </span>{props.bannerData.cast}</p>
                                </div>
                                <div>
                                    <p><span>Genre: </span>{props.bannerData.genre}</p>
                                </div>
                                <div>
                                    <p><span>This movie is: </span>Exciting</p>
                                </div>
                            </div>
                        </div>
                        <div className="more">
                            <h2>More Like This</h2>
                            <div className="more_card_div">
                                {props.mainData.slice(0,12).map(action => 
                                    <div className="more_card">
                                    <div>
                                        <span className="length">{action.duration}</span>
                                        <img className="more_img" src={action.smallImage} alt={action.title} />
                                    </div>
                                    <div className="more_year">
                                        <p><span>{action.rating}</span>{action.year}</p>
                                        <img src={plus} alt="More" />
                                    </div>
                                    <div className="more_desc">
                                        <p>{action.synopsis}</p>
                                    </div>
                                </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
