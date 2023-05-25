import React, { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ImgDialog from './ImgDialog'
import { getCroppedImg } from './canvasUtils'
import { styles } from './styles'

import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { addFunnyPost } from "../../redux/reducers/postsReducer";

import classNames from 'classnames'
import style from "./Crop.module.scss"



const Demo = ({ classes, addFunnyPost }) => {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [imageWasCropped, setImageWasCropped] = useState(false)

  useEffect(()=>{
    console.log(124)
    formik.setFieldValue("postFile",croppedImage)
  },[croppedImage])

  function makeid() {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz";
    
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
    
            return text;
        }


const formik = useFormik({
    initialValues: {
        "postFile": "",
        "description": ""
    },
    onSubmit: (values, {resetForm}) => {
        console.log('values : ', values)
        addFunnyPost({
            postFile: values.postFile
        })

        resetForm()
    }
})




  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
    fetch(croppedImage)
  .then(response => response.blob())
  .then(blob => {
    
    const fileName = `${makeid()}`;
    const file = new File([blob], `${fileName}.jpg`, { type: 'image/jpeg' });
    console.log('file : ',file)
    setCroppedImage(file) 
    setImageWasCropped(true)   
    
    // Вы можете использовать полученный файл (file) для отправки на сервер или выполнения других операций.
  })
  .catch(error => {
    // Обработка ошибок
    console.error(error);
  });

      console.log('donee', croppedImage)
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      setImageSrc(imageDataUrl)
    }
  }

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

<div  className={classNames(classes.controls, (imageWasCropped) && style.none )}>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={classes.sliderContainer}>
              <Typography
                variant="overline"
                classes={{ root: classes.sliderLabel }}
              >
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                classes={{ root: classes.slider }}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>

            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Show Result
            </Button>

          </div>
          <div className={(!imageWasCropped) && style.none}>
          <form onSubmit={formik.handleSubmit}>
            <input onChange={formik.handleChange} name="description" id="description" value={formik.values.description} />
            <button>SEND FINALLY</button>
          </form>
          </div>
          {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
        </React.Fragment>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const StyledDemo = withStyles(styles)(connect(null, { addFunnyPost })(Demo))


export default StyledDemo
























// import React, { useState, useCallback, useEffect } from 'react'
// import ReactDOM from 'react-dom'
// import Cropper from 'react-easy-crop'
// import Slider from '@material-ui/core/Slider'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import { withStyles } from '@material-ui/core/styles'
// import ImgDialog from './ImgDialog'
// import getCroppedImg from './cropImage'
// import { styles } from './styles'
// import FileInput from "./FileInput";
// import ImageCropper from "./ImageCropper";
// import { useFormik } from 'formik'
// import { connect } from 'react-redux'
// import { addFunnyPost } from "../../redux/reducers/postsReducer";
// import indus from "../../assets/img/indus/indian_picture.jpg"
// import slusari from "../../assets/img/slusari.jpg"
// import gop from "../../assets/img/gop.jpg"



// const ImageUpload = ({ inputText, handleModalWidth, classes, addFunnyPost }) => {

//     useEffect(() => {
//         formik.setFieldValue("description", inputText)
//     }, [inputText])

//     const formik = useFormik({
//         initialValues: {
//             "postFile": "",
//             "description": ""
//         },
//         onSubmit: values => {
//             console.log('values : ', values)
//             // addFunnyPost({
//             //     postFile: values.postFile
//             // })
//         }
//     })





//     const [image, setImage] = useState(gop);
//     const [currentPage, setCurrentPage] = useState("choose-img");
//     const [imgAfterCrop, setImgAfterCrop] = useState("");


//     // Invoked when new image file is selected
//     const onImageSelected = (selectedImg) => {
//         setImage(selectedImg);
//         setCurrentPage("crop-img")
//     };

//     useEffect(() => {
//         formik.setFieldValue("postFile", imgAfterCrop)
//     }, [imgAfterCrop])
//     // Generating Cropped Image When Done Button Clicked
//     const onCropDone = (imgCroppedArea, isTrue) => {

//         const canvasEle = document.createElement("canvas");
//         canvasEle.width = imgCroppedArea.width;
//         canvasEle.height = imgCroppedArea.height;

//         const context = canvasEle.getContext("2d");

//         let imageObj1 = new Image();
//         imageObj1.src = image;
//         imageObj1.onload = function () {
//             context.drawImage(
//                 imageObj1,
//                 imgCroppedArea.x,
//                 imgCroppedArea.y,
//                 imgCroppedArea.width,
//                 imgCroppedArea.height,
//                 0,
//                 0,
//                 imgCroppedArea.width,
//                 imgCroppedArea.height
//             );


//             const dataURL = canvasEle.toDataURL("image/jpeg");
//             const byteString = atob(dataURL.split(',')[1]);
//             const ab = new ArrayBuffer(byteString.length);
//             const ia = new Uint8Array(ab);
//             for (let i = 0; i < byteString.length; i++) {
//                 ia[i] = byteString.charCodeAt(i);
//             }
//             const blob = new Blob([ab], { type: 'image/jpeg' });
//             const fileName = `${makeid()}`;
//             const file = new File([blob], fileName, { type: 'image/jpeg' });
//             setImgAfterCrop(file);
//             handleModalWidth(true)
//             // setCurrentPage("img-cropped");
//         };
//     };

//     function makeid() {
//         var text = "";
//         var possible = "abcdefghijklmnopqrstuvwxyz";

//         for (var i = 0; i < 5; i++)
//             text += possible.charAt(Math.floor(Math.random() * possible.length));

//         return text;
//     }
//     // Handle Cancel Button Click
//     const onCropCancel = () => {
//         setCurrentPage("choose-img");
//         setImage("");
//     };

//     return (
//         <div>
//             <ImageCropper
            
//                 image={image}
//                 onCropDone={onCropDone}
//                 onCropCancel={onCropCancel}
//                 handleModalWidth={handleModalWidth}
//             />



//             <div>
//                 <form onSubmit={formik.handleSubmit}>
//                     <button style={{ position: "relative", }} type="submit">SEND</button>

//                 </form>
//             </div>
//         </div>
//     );
// };
// const StyledDemo = withStyles(styles)(connect(null, { addFunnyPost })(ImageUpload))
// export default StyledDemo








