import * as React from 'react';
import LightBox from '../LightBox';
import { Left } from '../icons';
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute' as 'absolute',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 0,
};

function Gallery({ index, setImage, images, setGallery, lightBox, setLightBox }) {
    useEffect(() => {

    }, [lightBox])

    const handleLightBox = __i__ => {
        setImage(__i__);
        setLightBox(true);
    }

    return (
        <div className="image-gallery">
            <div className="header">
                <span className="cursor-pointer" onClick={() => setGallery(false)}>
                    <Left />
                </span>
            </div>

            <div className="gallery-container">
                <div className="center">
                    <div className="gallery">
                        {
                            images.map((item, index) => <img
                                key={index}
                                src={item.src}
                                style={{ width: '100%', cursor: 'pointer' }}
                                onClick={() => handleLightBox(index)}
                                alt={`index: ${index} of ${images.length}`}
                            />)
                        }
                    </div>
                </div>
            </div>
            <React.Fragment>
                <Modal
                    open={lightBox}
                    onClose={() => { setLightBox(false); }}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Slide direction="up" in={lightBox} mountOnEnter unmountOnExit>
                        <Box sx={{ ...style }}>
                            <LightBox
                                index={index}
                                setImage={setImage}
                                images={images}
                                lightBox={lightBox}
                                setLightBox={setLightBox}
                            />
                        </Box>
                    </Slide>
                </Modal>
            </React.Fragment>
        </div>
    );
}

export default Gallery;
