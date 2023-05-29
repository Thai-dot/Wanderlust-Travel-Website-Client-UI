import React from 'react';
import CKEditorComp from '../TextEditor/TextEditor';

interface EditQuotationType {
    editValue?: string;
    editError?: string;
    onChange?: (e: any, editor: any, id: string | number) => any;
}

function EditQuotation(props: EditQuotationType) {
    const { editValue, onChange, editError } = props;
    return (
        <div id="editQuotation" className="about__hotel">
            <h3>Yêu cầu chỉnh sửa</h3>
            <CKEditorComp
                displayValue={editValue}
                error={editError}
                onChange={(event: any, editor: any) => {
                    if (typeof onChange === 'function') {
                        onChange(event, editor, 'editValue');
                    }
                }}
            />
        </div>
    );
}

export default EditQuotation;
