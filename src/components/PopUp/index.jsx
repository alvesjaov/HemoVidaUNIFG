import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import { IoCloseCircleSharp } from 'react-icons/io5';
import './styles.css';

function PopUp({ show, handleClose, userData, type, onClick }) {
    const [password, setPassword] = useState('');
    const [newName, setNewName] = useState(userData.name || '');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleName = (e) => {
        const newName = e.target.value;
        setNewName(newName);

        // Name validation with a minimum of 3 characters
        if (newName.length >= 3) {
            setNameError('');
        } else {
            setNameError('O nome precisa ter no mínimo 3 caracteres.');
        }
    };

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Password validation with a minimum of 8 characters
        if (newPassword.length >= 8) {
            setPasswordError('');
        } else {
            setPasswordError('A senha precisa ter no mínimo 8 caracteres.');
        }
    };


    const clearFields = () => {
        setPassword('');
        setNewName('');
    };

    useEffect(() => {
        if (userData.name) {
            setNewName(userData.name);
        }
    }, [userData]);

    useEffect(() => {
        if (!show) {
            clearFields();
        }
    }, [show]);

    const handleCloseBox = () => {
        setShowSuccessDialog(false);
        handleClose();
        clearFields();
    };

    return (
        <div className="popUp">
            <div className="ContainerBody">
                <h1>Editar Dados do funcionário</h1>
                <IoCloseCircleSharp className="IconClosePopUp" onClick={handleCloseBox} />
                {type === 'employee' ? (
                    <div className="ContainerFormEditeEmployee">
                        <h3>Código do Funcionário: {userData.employeeCode}</h3>
                        <div className="labelEditeEmployee">
                            <label htmlFor="name">Nome:</label>
                            <Input
                                id="name"
                                placeholder={'Digite um novo nome'}
                                type={'text'}
                                value={newName}
                                onChange={(e) => handleName(e)}
                            />
                        </div>
                            {nameError && <p className="textError">{nameError}</p>}
                        <div className="labelEditeEmployee">
                            <label htmlFor="password">Senha:</label>
                            <Input
                                id="password"
                                placeholder={'Digite uma nova senha'}
                                type={'text'}
                                value={password}
                                onChange={(e) => handlePassword(e)}
                            />
                        </div>
                        {passwordError && <p className="textError">{passwordError}</p>}
                        <Button
                            onClick={() => {
                                onClick(newName, password);
                                setShowSuccessDialog(true);
                            }}
                            TextButton={'Atualizar'}
                        />
                    </div>
                ) : (
                    <div className="ContainerFormEditeDonation">{/* Add content for donation editing */}</div>
                )}
            </div>
            {showSuccessDialog && (
                <div>
                    {/* Render SuccessDialog component here */}
                </div>
            )}
        </div>
    );
}

PopUp.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    userData: PropTypes.shape({
        name: PropTypes.string,
        employeeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};


export default PopUp;
