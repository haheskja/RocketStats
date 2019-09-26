import axios from 'axios'
import types from './types'
import moment from 'moment'

const doApiCall = (args) => {
    return new Promise((resolve, reject) => {
        axios(args).then(
            response => {
                if(response.data.next) {
                    resolve({next: true, data: response.data})
                }
                else resolve({next: false, data: response.data})
            },
            error => reject(error)
        )
    })
}

const getNextReplays = async (url) => {
    return new Promise((resolve, reject) => {
        const newUrl = url.replace('https://ballchasing.com','')
        const newestUrl = newUrl.replace('playlist=13','playlist=ranked-standard')
        const args = {
            method: 'GET',
            url: newestUrl,
            headers: {
                Authorization: 'xcTdLyXjwsZ6oE2dvx6fBQqwJNcD0cUDHVMEZshL',
            }
        }
        axios(args).then(
            response => {
                if(response.data.next) {
                    resolve({next: true, data: response.data})
                }
                else resolve({next: false, data: response.data})
            },
            error => reject(error)
        )
    })
}

const findDateData = async (data, date) => {
    return new Promise((resolve, reject) => {
        const dateArray = []
        let counter = 0
        const today = moment.utc(date).date()
        while(data[counter]){
            data[counter].forEach(item => {
                const date = moment.utc(item.date).date()
                if (date === today) {
                    dateArray.push(item)
                }
            })
            counter++
        }
        resolve(dateArray)
    })
}

const fetchDetailedData = async (dateArray) => {
    return new Promise((resolve, reject) => {
        const promises = [],
            detailedArray = []

        dateArray.forEach(item => {
            const args = {
                method: 'GET',
                url: '/api/replays/' + item.id,
                headers: {
                    Authorization: 'xcTdLyXjwsZ6oE2dvx6fBQqwJNcD0cUDHVMEZshL',
                }
            }
            promises.push(axios(args))
        })

        axios.all(promises).then(results => {
            results.forEach(response => {
                detailedArray.push(response.data)
            })
            resolve(detailedArray)
        }).catch(err => console.log(err))
    })
}

export function getAllReplays(id, date){
    return (dispatch, getState) => {
        dispatch({ type: types.GET_REPLAYS })


        const args = {
            method: 'GET',
            url: '/api/replays',
            params: {
                'playlist': 'ranked-standard',
                'season': 12,
                'uploader': id
            },
            headers: {
                Authorization: 'xcTdLyXjwsZ6oE2dvx6fBQqwJNcD0cUDHVMEZshL',
            }
        }
        doApiCall(args)
        .then(async ({next, data}) => {
            let loop = next
            let pushed = data
            const obj = {}
            let counter = 0;
            obj[counter] = data.list
            while(loop){
                counter++
                const response = await getNextReplays(pushed.next)
                obj[counter] = response.data.list
                loop = response.next
                pushed = response.data
            }
            dispatch({ type: types.GET_REPLAYS_COMPLETE, payload: obj })
            findDateData(obj, date)
            .then(arr => fetchDetailedData(arr))
            .then(arr => createStats(arr, dispatch))
        })
    }
}

const createStats = (arr, dispatch) => {
    if(arr.length === 0 ) {
        dispatch({ type: types.GET_DETAILED_REPLAYS_COMPLETE, payload: null })
        dispatch({ type: types.GET_STATS, payload: null })
        return
    }

    var statsObj = {
        bpm: 0,
        speed: 0,
        slowSpeed: 0,
        boostSpeed: 0,
        supersonicSpeed: 0
    }

    arr.forEach((item, number) => {
        let color = ''
        let index = null
        const blue = item.blue.players
        const orange = item.orange.players
        
        for(let i = 0; i < 3; i++){
            if(blue[i].name === item.uploader.name){
                color = 'blue'
                index = i
            }
            else if (orange[i].name === item.uploader.name){
                color = 'orange'
                index = i
            }
        }
        const stats = item[color].players[index].stats

        statsObj.bpm += stats.boost.bpm 
        statsObj.speed += stats.movement.avg_speed_percentage
        statsObj.slowSpeed += stats.movement.percent_slow_speed
        statsObj.boostSpeed += stats.movement.percent_boost_speed
        statsObj.supersonicSpeed += stats.movement.percent_supersonic_speed
    })
    statsObj.bpm = (statsObj.bpm/arr.length).toFixed(0)
    statsObj.speed = (statsObj.speed/arr.length).toFixed(2)
    statsObj.slowSpeed = (statsObj.slowSpeed/arr.length).toFixed(2)
    statsObj.boostSpeed = (statsObj.boostSpeed/arr.length).toFixed(2)
    statsObj.supersonicSpeed = (statsObj.supersonicSpeed/arr.length).toFixed(2)
    statsObj.number = arr.length

    dispatch({ type: types.GET_DETAILED_REPLAYS_COMPLETE, payload: arr })
    dispatch({ type: types.GET_STATS, payload: statsObj })
}

