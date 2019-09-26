import React from 'react'
import { CircularLoader, Modal } from '@dhis2/ui-core'
import { useSelector } from 'react-redux'

const Loader = () => {
    const open = useSelector(state => state.modal)

    return(
        <Modal
            open={open}
            small
            >
            <div className="modal">
                <CircularLoader />
                <br />
                Fetching replays and generating stats
            </div>
        </Modal>
    )
}

export default Loader