import React from 'react';

class FileUploadComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        let uploader = this.props
        return <article className='file-uploader'>
            <label htmlFor="files">{uploader.label}: </label>
            <input id="files" type="file" multiple onChange={this.previewPictures.bind(this) }/>
            <span className='btn' onClick={this.uploadImages.bind(this)}>上传</span>
            <output id="result"/>    
        </article>
    }

    uploadImages(){
        let files = document.getElementById("files").files;
        this.props.uploadImages(files);
    }

    previewPictures(event) {
        let files = event.target.files; //FileList object
        let output = document.getElementById("result");

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            //Only pics
            if (!file.type.match('image'))
                continue;
            let picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
                let picFile = event.target;
                let span = document.createElement("span");
                span.innerHTML = "<img class='image-thumbnail' src='" + picFile.result + "'" +
                    "title='" + picFile.name + "'/>";
                output.insertBefore(span, null);
            });

            //Read the image
            picReader.readAsDataURL(file);
        }

    }
}

module.exports = FileUploadComponent;