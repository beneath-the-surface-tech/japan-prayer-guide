import React from 'react';
import styles from './lightbox.module.css';
import { Cross, Heart, LeftArrow, RightArrow, Share } from '../icons';

const LightBox = ({ index, setImage, images, lightBox, setLightBox }) =>{

    const handleSwitch = type =>{
        if(type==="inc" && index+1 !== images.length) {
            setImage(index + 1);
        }
        if(type==="dec" && index !== 0){
            setImage(index - 1);
        }
    }

    return(
        <div className={styles.lightbox}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span onClick={()=>setLightBox(!lightBox)} className={styles.headLeft}><span style={{ marginTop: "6px"}}><Cross/></span> <span>Close</span></span>
                    <span>{ index+1 }/{images.length}</span>
                    <span className={styles.headRight}><Share/> <Heart/></span>
                </div>
                <div className={styles.body}>
                <div className={styles.auto}>
                    { index !== 0 && <span className={styles.arrow} onClick={()=>handleSwitch("dec")}><LeftArrow/></span> }
                </div>
                <div className={styles.box}>
                    <img
                        src={images[index].src}
                        style={{height: '100%', cursor: 'pointer'}}
                        alt="light box"
                    />
                    <h1>{images[index].title}</h1>
                </div>
                <div className={styles.auto}>
                    {index+1 !== images.length && <span className={styles.arrow} onClick={()=>handleSwitch("inc")}><RightArrow/></span>}
                    
                </div>
            </div>
            </div>
            
        </div>
    )
}
export default LightBox;