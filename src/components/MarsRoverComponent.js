import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function MarsRover(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <div>
        <Gallery
          photos={props.marsrovers.map((x) => ({
            src: x.img_src,
            alt: x.rover.name,
            height: 3,
            width: 4,
          }))}
          onClick={openLightbox}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={props.marsrovers.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.rover.name + ": " + x.camera.full_name,
                  src: x.img_src,
                  alt: x.rover.name,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </>
  );
}
