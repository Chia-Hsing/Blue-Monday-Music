let accessToken = ''
let allData = ''
let allPagesContent = []
let currentPage = 1
let pageNum = ''
let trackId = ''

const tokenURL = 'https://accounts.spotify.com/api/token'
const baseURL = 'https://api.spotify.com/v1/'
const user = 'MjQ5ZjQ4MzZiMWMzNDYxYzhhY2UzNjk2MGQxMjY3MTc6MmFlMDhmOWY2MjA0NDAzOGJkYTdjNWI0YTEzMDQ1MjE='
const refreshToken =
    'AQD00V4SxmVjXdpeXcJEgDZPWiUkDx4EZqw69V5tfiTiozNXz-lzWeLqH5JGUZEbv0mga7CLDOooBJnMgvVrhv52yYa1660ryj6iRpn7Ez4DOqZXS5qpq-Hb3Hh-bjNJj4o'
const itemsShown = 12

$('.music-modal-content').on('click', '.heart', () => {
    $('#heart-solid').toggleClass('act')
    $(e.target)
})

/* listen to the pagination event */

$('.pagination').click((e) => {
    switch (e.target.dataset.page) {
        case 'previous':
            currentPage = parseInt(currentPage) - 1 || 1
            break
        case 'next':
            if (currentPage === pageNum) {
                currentPage = parseInt(currentPage)
            } else {
                currentPage = parseInt(currentPage) + 1
            }
            break
        default:
            currentPage = parseInt(e.target.dataset.page)
            break
    }
    getPageContent(currentPage) // determine what content to be shown on each page. The second arg doesn't pass in, but it is still the allPagesContent (allData or the search result)
    initializingPage()
})

/* ---------------------------------------- */

/* listen to the modal event */

$('.music-list').on('click', '.music', (e) => {
    let albumId = $(e.target).parent().find('input').val() // get id value while clicking
    $('.music-modal').fadeIn(1000).addClass('act') // demonstrate the modal
    $('html, body').animate({ scrollTop: 0 }, 300)
    getAlbumTrack(albumId)
})

$('.music-modal').on('click', '.text-dark-X', () => {
    $('.music-modal').fadeOut(500).toggleClass('act') // close the modal
})

/* ---------------------------------------- */

/* listen to searching submit */

$('.search').on('submit', (e) => {
    e.preventDefault()

    const searchData = $('.search-input').val()
    const regEx = new RegExp(searchData, 'i') // 'i' means the case doesn't matter. Only check the characters.
    const arr = [...allData] // [{}, {}, {} ...]
    const result = arr.filter((item) => item.artists[0].name.match(regEx))
    initializingPage()
    countPagesNum(result)
    getPageContent(1, result)
})

/* ---------------------------------------- */

/* Get data from API endpoint  */

const getData = () => {
    // Requesting a refreshed access token; Spotify will returns a new access token(JSON)
    const config = {
        method: 'post',
        url: tokenURL,
        headers: {
            Authorization: 'Basic ' + user,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    }
    axios(config)
        .then((response) => {
            return (accessToken = response.data.access_token)
        })
        .then(() => {
            // Use the access token to access the Spotify Web API; Spotify returns requested data(JSON)
            const accessConfig = {
                method: 'get',
                url: baseURL + 'browse/new-releases?limit=50&country=IS',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
            axios(accessConfig)
                .then((res) => {
                    allData = res.data.albums.items
                    countPagesNum(allData)
                    getPageContent(1, allData)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        })
}

getData()

/* ---------------------------------------- */

/* Obtain the number of total pages */

const countPagesNum = (data) => {
    const len = data.length
    pageNum = Math.ceil(len / itemsShown) || 1

    let pagination = ''
    pagination += `
        <li class="page-item">
            <a class="page-link" data-page="previous" aria-label="Previous">
                &laquo;
            </a>
        </li>
        `

    for (let i = 0; i < pageNum; i++) {
        pagination += `
            <li class="page-item">
                <a class="page-link" data-page="${i + 1}">
                    ${i + 1}
                </a>
            </li>
            `
    }

    pagination += `   
        <li class="page-item">
            <a class="page-link" data-page="next" aria-label="Next">
                &raquo;
            </a>
        </li>
        `
    $('.pagination').html(pagination)
}

/* ---------------------------------------- */

/* determine the what content shown on the every single page  */

const getPageContent = (page, data = allPagesContent) => {
    allPagesContent = data // save all the data to allPagesContent
    const start = (page - 1) * itemsShown
    const end = start + itemsShown
    let pageContent = allPagesContent.slice(start, end)
    demonstratePageContent(pageContent) // but only show the content which belong that page (12 items).
}

/* ---------------------------------------- */

/* demonstrate the data and display the content on the page*/

const demonstratePageContent = (data) => {
    let htmlContent = ''
    for (let key of data) {
        htmlContent += `
            <div class="music">
                <input name='id' type='hidden' value='${key.id}'>
                <img class="" src="${key.images[1].url}" alt="image">
                <div class="card-body">
                </div>
                <div class="card-body-name">${key.artists[0].name}</br>${key.name}</div>
            </div>
      `
    }
    $('.music-list').html(htmlContent)
}
/* ---------------------------------------- */

/* get tracks of album from API endpoint*/

const getAlbumTrack = (id) => {
    var config = {
        method: 'get',
        url: baseURL + `albums/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }

    axios(config)
        .then((res) => {
            const tracksData = res.data
            demonstrateModalContent(tracksData)
        })
        .catch((error) => {
            console.log(error)
        })
}

/* ---------------------------------------- */

/* demonstrate the album (id) you selected on the modal. */

const demonstrateModalContent = (data) => {
    let htmlContent = ''
    htmlContent += `
            <div class="detail">
                <input name='id' type='hidden' value='${data.id}'>
                <img class="image" src="${data.images[1].url}" alt="image">
                <div class="modal-body">
                    <div class="modal-body-name">
                        ${data.artists[0].name}   
                        
                        <em>
                            <a href=${data.external_urls.spotify} target="_blank">
                                Listen on Spotify
                            </a>
                        </em>             
                    </div>
                    <div class="modal-body-album">${data.name}</div>  
                    <span class="modal-body-span">${data.album_type} •</span>
                    <span class="modal-body-span">${data.release_date}</span>    
                </div>
            </div>
            <div class="tracks">
            `
    const tracks = [...data.tracks.items] // Objects in Array. [{},{},{}, ...]

    const track = tracks.map((track) => {
        return track.name
    })
    const link = tracks.map((link) => {
        return link.external_urls.spotify
    })
    const duration = tracks.map((duration) => {
        return duration.duration_ms
    })

    for (let i = 0; i < track.length; i++) {
        const time = timeConverter(duration[i])
        htmlContent += `
                <div class="track">
                    <span>${i + 1}</span>
                    <div>
                        <span>${track[i]}</span>
                        <em>${time}</em>
                    </div>
                    <a href=${link[i]} target="_blank">
                        <span class="iconify" data-icon="carbon:play-outline" data-inline="false"></span>
                    </a>
                </div>
                `
    }

    htmlContent += `</div>`

    $('.music-modal-content').html(htmlContent)
}

/* ---------------------------------------- */

/* convert time from ms to min:sec */

const timeConverter = (ms) => {
    const sec = Math.floor((ms / 1000) % 60)
    const min = Math.floor((ms / (1000 * 60)) % 60)
    return min + ':' + sec
}

/* ---------------------------------------- */

/* initializing the page while traveling between pages. */

const initializingPage = () => {
    $('.music-modal').fadeOut(10).removeClass('act') // initializing the modal
    $('html, body').animate({ scrollTop: 0 }, 10) // initializing the page position
}

/* ---------------------------------------- */

/* side drawer and backdrop controller. */

$('.side-drawer-toggle').on('click', () => {
    $('.side-drawer').toggleClass('act')
    $('.backdrop').toggleClass('act')
    $('.backdrop').on('click', () => {
        $('.backdrop').removeClass('act')
        $('.side-drawer').removeClass('act')
    })
})
