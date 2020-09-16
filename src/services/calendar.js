import axios from 'axios'

function getCalendar(date){
    const apiBaseUrl = 'http://localhost:4000'
    return axios.get(
        `${apiBaseUrl}/api/calendar?date=${date}`,
            {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdkZGFib3NzQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE5OTE0MywiZXhwIjoxNjAwMjg1NTQzfQ.jFOjZ51FoLigGjgPuDEqn5uln8Ha7n5fGyuHejI97Zg"
                }
            }
    )
        .then(response => response.data)
}

export {
    getCalendar
}