import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';

import Backdrop from '@mui/material/Backdrop';
import Gallery from '../../components/Gallery';


const style = {
    position: 'absolute' as 'absolute',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    p: 4
};

export default function NestedModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [lightBox, setLightBox] = React.useState(false);
    const [index, setImage] = React.useState(0);

    const images = [
        { src: "/images/0.png", title: "scrambled it to make a type specimen book" },
        { src: "/images/1.png", title: "now use Lorem Ipsum as their default model text" },
        { src: "/images/2.png", title: "Various versions have evolved over the years" },
        { src: "/images/3.png", title: "Lorem Ipsum available" },
        { src: "/images/4.png", title: "you need to be sure there" },
        { src: "/images/5.png", title: "making this the first true generator on the Internet" },
        { src: "/images/3.png", title: "look even slightly believable" },
        { src: "/images/2.png", title: "Various versions have evolved" },
        { src: "/images/4.png", title: "Ipsum as their default model tex" },
        { src: "/images/0.png", title: "scrambled it to make a type" },
        { src: "/images/5.png", title: "making this the first true" },
        { src: "/images/1.png", title: "Various versions have evolved" },
        { src: "/images/3.png", title: "making this the first true" },
        { src: "/images/0.png", title: "scrambled it to make a type" },
        { src: "/images/1.png", title: "Various versions have evolved" },
        { src: "/images/2.png", title: "Ipsum as their default model tex" },
        { src: "/images/4.png", title: "making this the first true" },
        { src: "/images/5.png", title: "scrambled it to make a type" }
    ]


    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <div className="container">
                <div className="gallery">
                    {
                        images.splice(0, 4).map((item, index) => <img
                            key={index}
                            src={item.src}
                            style={{ width: '100%', cursor: 'pointer', marginBottom: 10 }}
                            //  onClick={()=>setModal(true)}
                            onClick={handleOpen}
                            alt="logo"
                        />)
                    }
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >

                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Box sx={{ ...style, width: '100%' }}>
                        <Gallery
                            images={images}
                            setGallery={setOpen}
                            index={index}
                            setImage={setImage}
                            lightBox={lightBox}
                            setLightBox={setLightBox}
                        />
                    </Box>
                </Slide>
            </Modal>
        </div>
    );
}