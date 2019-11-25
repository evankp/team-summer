import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadImages = (props) => {
    const { setImages, images } = props;

    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div {...getRootProps()}>
            <h3>Upload images</h3>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
            {
                images ?
                    images.map(image => (
                        <img
                            key={image.name}
                            src={URL.createObjectURL(image)}
                            alt=""
                            style={{ maxHeight: '100px', maxWidth: '100px' }}
                        />
                    )) :
                    <p>Select images to see preview here.</p>
            }
        </div>
    )
}

export default UploadImages