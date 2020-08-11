import React from 'react';

import Alert from 'react-bootstrap/Alert';

const AppAlert = ({ variant, content, dismissible, setShow }) => {
    return (
        <Alert
            variant={variant}
            onClose={() => setShow({ show: false })}
            dismissible={dismissible}
        >
            {content}
        </Alert>
    );
};

export default AppAlert;
