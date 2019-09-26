import React, { useState } from 'react'
import Searchbar from './Searchbar'
import { TabBar, Tab } from '@dhis2/ui-core'
import MatchHistory from './MatchHistory'
import Stats from './Stats'
import Loader from './Loader'

const Layout = props => {
    const [comp, setComp] = useState('history')

    return(

        <div>
            <div className="header">
                <div className='container'>
                    <header>
                        <h1>Rocket stats! <span role="img" aria-label="racing car">🏎️</span></h1>
                        <p>Use this tool to find your average stats from one day of Rocket League games. It focuses on boost and speed</p>
                    </header>
                    <Searchbar />
                    <TabBar fixed>
                <Tab selected={comp === 'history' ? true : false} onClick={() => setComp('history')}>
                    Match history
                </Tab>
                <Tab selected={comp === 'stats' ? true : false} onClick={() => setComp('stats')}>
                    Stats
                </Tab>
            </TabBar>
                </div>
            </div>
            <div className="container">
            <Loader />
            
            {comp === 'history' ? <MatchHistory /> : <Stats />}
            </div>
        </div>
    )
}

export default Layout