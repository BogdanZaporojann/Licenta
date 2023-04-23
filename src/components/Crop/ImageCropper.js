import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import style from "./Crop.modules.scss"
import "./crop.css"
import Modal from 'react-modal';
import classNames from "classnames";


Modal.setAppElement('#root');

function ImageCropper({ handleModalWidth, image, onCropDone, onCropCancel }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };


  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);


  const [cropIsShow, setCropIsShow] = useState(true)



  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };


  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };

  return (
    <div>
      <div>
        {/* <button onClick={openModal}>Open Cropper</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={
            {
              content: {
                padding: '0',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                borderRadius: '0  ',
                width: `700px`,
                height: `700px`
              }
            }
          }
        >
 */}

        <div>
          <div>
            <Cropper
              image={image}
              aspect={aspectRatio}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  height: "660px",
                  width: "660px"
                }
              }}
            />
          </div>
          <div style={{ color: "white", position: "absolute", bottom: 0 }}>
            <select className="aspect-ratios" onChange={onAspectRatioChange}>
              <option value={1 / 1}>1:1</option>
              <option value={5 / 4}>5:4</option>
              <option value={4 / 3}>4:3</option>
              <option value={3 / 2}>3:2</option>
              <option value={5 / 3}>5:3</option>
              <option value={16 / 9}>16:9</option>
              <option value={3 / 1}>3:1</option>
            </select>
          </div>
          <div style={{ position: "absolute", top: 0, display: "flex", justifyContent: "space-between" }}>


            {cropIsShow ? (<button
              onClick={() => {
                onCropDone(croppedArea, true);
                setCropIsShow(false)
                console.log(cropIsShow)
              }}
            >CROP
            </button>) : null}
          </div>
        </div>
        {/* </Modal> */}
      </div>


    </div >
  );
}

export default ImageCropper;