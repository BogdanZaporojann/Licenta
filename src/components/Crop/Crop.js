import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage'
import { styles } from './styles'
import FileInput from "./FileInput";
import ImageCropper from "./ImageCropper";
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { addFunnyPost } from "../../redux/reducers/postsReducer";
import indus from "../../assets/img/indus/indian_picture.jpg"
import slusari from "../../assets/img/slusari.jpg"
import gop from "../../assets/img/gop.jpg"



const ImageUpload = ({ inputText, handleModalWidth, classes, addFunnyPost }) => {

    useEffect(() => {
        formik.setFieldValue("description", inputText)
    }, [inputText])

    const formik = useFormik({
        initialValues: {
            "postFile": "",
            "description": ""
        },
        onSubmit: values => {
            // addFunnyPost({
            //     postFile: values.postFile
            // })
        }
    })





    const [image, setImage] = useState(gop);
    const [currentPage, setCurrentPage] = useState("choose-img");
    const [imgAfterCrop, setImgAfterCrop] = useState("");


    // Invoked when new image file is selected
    const onImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setCurrentPage("crop-img")
    };

    useEffect(() => {
        formik.setFieldValue("postFile", imgAfterCrop)
    }, [imgAfterCrop])
    // Generating Cropped Image When Done Button Clicked
    const onCropDone = (imgCroppedArea, isTrue) => {

        const canvasEle = document.createElement("canvas");
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = image;
        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );


            const dataURL = canvasEle.toDataURL("image/jpeg");
            const byteString = atob(dataURL.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: 'image/jpeg' });
            const fileName = `${makeid()}`;
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            setImgAfterCrop(file);
            handleModalWidth(true)
            // setCurrentPage("img-cropped");
        };
    };

    function makeid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    // Handle Cancel Button Click
    const onCropCancel = () => {
        setCurrentPage("choose-img");
        setImage("");
    };

    return (
        <div>
            <ImageCropper
            
                image={image}
                onCropDone={onCropDone}
                onCropCancel={onCropCancel}
                handleModalWidth={handleModalWidth}
            />



            {/* <div>
                <form onSubmit={formik.handleSubmit}>
                    <button style={{ position: "relative", }} type="submit">SEND</button>

                </form>
            </div> */}
        </div>
    );
};
const StyledDemo = withStyles(styles)(connect(null, { addFunnyPost })(ImageUpload))
export default StyledDemo








