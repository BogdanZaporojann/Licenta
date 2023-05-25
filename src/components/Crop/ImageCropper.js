























// import React, { useEffect, useState } from "react";
// import Cropper from "react-easy-crop";
// import "./crop.css"
// import Modal from 'react-modal';
// import classNames from "classnames";
// import './styles.css'

// Modal.setAppElement('#root');

// function ImageCropper({ image, onCropDone }) {
//   const [modalIsOpen, setModalIsOpen] = useState(true);

//   const openModal = () => {
//     setModalIsOpen(true);
//   };
//   const closeModal = () => {
//     setModalIsOpen(false);
//   };


//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedArea, setCroppedArea] = useState(null);
//   const [aspectRatio, setAspectRatio] = useState(4 / 3);


//   const [cropIsShow, setCropIsShow] = useState(true)



//   const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
//     setCroppedArea(croppedAreaPixels);
//   };


//   const onAspectRatioChange = (event) => {
//     setAspectRatio(event.target.value);
//   };

//   return (
//     // <div>
//     //   <div>


//     // <div>
//     <Modal
//       isOpen={true}
//       style={
//         {
//           content: {
//             padding: '0',
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             transform: 'translate(-50%, -50%)',
//             border: 'none',
//             borderRadius: '0  ',
//             width: `450px`,
//             height: "550px",
//             border: "1px solid black",
//             borderRadius: "20px",
//             overflow: "hidden",
//             objectFit: "contain"
//           }
//         }}>
//       <div>
//         <div className="crop-container">
//           <Cropper
//             image={image}
//             crop={crop}
//             zoom={zoom}
//             aspect={aspectRatio}
//             onCropChange={setCrop}
//             onCropComplete={onCropComplete}
//             onZoomChange={setZoom}
//           />
//         </div>
//         <div className="controls">
//           <input
//             type="range"
//             value={zoom}
//             min={1}
//             max={3}
//             step={0.1}
//             aria-labelledby="Zoom"
//             onChange={(e) => {
//               setZoom(e.target.value)
//             }}
//             className="zoom-range"
//           />
//           <div style={{ color: "white", position: "absolute", top: -100 }}>
//             <select className="aspect-ratios" onChange={onAspectRatioChange}>
//               <option value={1 / 1}>1:1</option>
//               <option value={5 / 4}>5:4</option>
//               <option value={4 / 3}>4:3</option>
//               <option value={3 / 2}>3:2</option>
//               <option value={5 / 3}>5:3</option>
//               <option value={16 / 9}>16:9</option>
//               <option value={3 / 1}>3:1</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </ Modal>
//     // <div>
//     //   <Cropper
//     //     image={image}
//     //     aspect={aspectRatio}
//     //     crop={crop}
//     //     zoom={zoom}
//     //     onCropChange={setCrop}
//     //     onZoomChange={setZoom}
//     //     onCropComplete={onCropComplete}
//     //     style={{
//     //       containerStyle: {
//     //         height: "660px",
//     //         width: "660px"
//     //       }
//     //     }}
//     //   />
//     // </div>
//     //      <div style={{ color: "white", position: "absolute", bottom: 0 }}>
//     //       <select className="aspect-ratios" onChange={onAspectRatioChange}>
//     //         <option value={1 / 1}>1:1</option>
//     //         <option value={5 / 4}>5:4</option>
//     //         <option value={4 / 3}>4:3</option>
//     //         <option value={3 / 2}>3:2</option>
//     //         <option value={5 / 3}>5:3</option>
//     //         <option value={16 / 9}>16:9</option>
//     //         <option value={3 / 1}>3:1</option>
//     //       </select>
//     //     </div>
//     //     <div style={{ position: "absolute", top: 0, display: "flex", justifyContent: "space-between" }}>


//     //       {cropIsShow ? (<button
//     //         onClick={() => {
//     //           onCropDone(croppedArea, true);
//     //           setCropIsShow(false)
//     //           console.log(cropIsShow)
//     //         }}
//     //       >CROP
//     //       </button>) : null}
//     //     </div>
//     //   </div>
//     // </div> 


//     //  </div > 

//   );
// }

// export default ImageCropper;