import React from 'react';
import './Header.scss';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";


const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className='header'>
            <Button onClick={onClose}>Закрыть</Button>
            <span className='header__username'>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;