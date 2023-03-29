const baseURL = 'https://app.scigroupvn.com/vote/public/api';

const getVoteNumber = (id) => {
    return fetch(`${baseURL}/get-votes/${id}`)
    .then(res => res.json())
    .then(data => (data))
}

const formInput = () => {
    return `
        <div>
            <input type="text" />
            <button>Bình chọn</button>
        </div>
    `
};

document.getElementsByClassName('vote__button')[0].addEventListener('click', () => {
   
    
})