import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [cpn, setCpn] = useState(null);

    function toggle(cpn) {
        setIsShowing(!isShowing);
        setCpn(cpn);
    }

    return {
        isShowing,
        cpn,
        toggle,
    }
};

export default useModal;
