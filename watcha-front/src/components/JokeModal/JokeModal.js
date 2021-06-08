import React , {useCallback} from 'react'
import { ModalBody, ModalOverlay, JokeBorder } from "./JokeModal.style";


const JokeModal = ({ close, textData }) => {
    const JokeModalClose = useCallback(() => {
        close();
    }, [close]);

    return (
        <div>
            <div>
                <ModalOverlay onClick={close} />
                <ModalBody>
                    <p className="title">
                        W<p className="ai">at</p>cha
                    </p>
                    <JokeBorder>
                        {localStorage.getItem("nickname")}{" "}{textData}
                    </JokeBorder>
                </ModalBody>
            </div>
        </div>
    );
};

export default JokeModal
