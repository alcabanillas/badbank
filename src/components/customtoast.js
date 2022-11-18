import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export function CustomToast({show, toggleShow, header, text, type}) {

  let background = 'Secondary';
  let icon = 'bi bi-info-circle';

  switch (type) {
    case 'success':
      background = 'success';
      icon = 'bi bi-check-circle';
      break;
    case 'error':
      background = 'danger';
      icon = 'bi bi-exclamation-circle';
      break
    case 'info':
      background = 'Warning';
      icon = 'bi bi-exclamation-triangle';
      break
    default:
      break;
  }

  return (
    <ToastContainer className="p-3" position="top-end">
    <Toast className="d-inline-block m-1" bg={background.toLowerCase()} show={show} role="alert" onClose={toggleShow} delay={3000} autohide>
      <Toast.Header>
        <i className={icon}></i>
        &nbsp;
        <strong className="me-auto">{header}</strong>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  </ToastContainer>
);}
