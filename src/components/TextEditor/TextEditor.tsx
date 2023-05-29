import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './textEditor.scss';

export default function CKEditorComp(props: any) {
  const { title, displayValue, onChange, error, required } = props;

  // const [editor, setEditor] = useState();

  // const handleFileUpload = (file: File) => {
  //   return new Promise((resolve, reject) => {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     imageUpload(file)
  //       .then((data) => {
  //         resolve({
  //           default: data,
  //         });
  //       })
  //       .catch((err: any) => {
  //         console.error(err);
  //         reject(err.message);
  //       });
  //   });
  // };
  // const cloudName = import.meta.env.VITE_CLOUD_NAME_IMAGE_UPLOAD;
  // const editorConfig = {
  //   plugins: ['Image'],
  //   toolbar: ['imageUpload'],
  //   image: {
  //     toolbar: [
  //       'imageTextAlternative',
  //       '|',
  //       'imageStyle:alignLeft',
  //       'imageStyle:full',
  //       'imageStyle:alignRight',
  //     ],
  //     styles: ['full', 'alignLeft', 'alignRight'],
  //     upload: {
  //       types: ['jpeg', 'png'],
  //       adapter: handleFileUpload,
  //     },
  //   },
  // };

  // const editorConfig = {
  //   toolbar: {
  //     items: [
  //       'bold',
  //       'italic',
  //       'link',
  //       'bulletedList',
  //       'numberedList',
  //       'blockQuote',
  //     ],
  //   },
  //   language: 'en',
  // };
  return (
    <div className="editor">
      <h5>
        {title} {required && <span className="red fs-tiny">*</span>}
      </h5>

      <CKEditor
        editor={ClassicEditor}
        data={displayValue}
        onChange={onChange}
      />
      {error && <div className="red fs-tiny">{error}</div>}
    </div>
  );
}
