const baseURL = 'https://app.scigroupvn.com/vote/public/api';

const getVotes = async (id) => {
    const response = await fetch(`${baseURL}/get-votes/${id}`);
    const data = await response.json();
    return data;
}

const createVotes = async (info) => {
    const response = await fetch(`${baseURL}/create-votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
    });
    const data = await response.json();
    return data;
}

const updateVotes = async (id, info) => {
    const response = await fetch(`${baseURL}/update-votes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info)
    });
    const data = response.json();
    return data;
}

const getUserVotes = async () => {
    const response = await fetch(`${baseURL}/get-uservotes`);
    const data = await response.json();
    return data;
}

const createUserVotes = async (info) => {
    const response = await fetch(`${baseURL}/create-uservotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
    });
    const data = await response.json();
    return data;
}

const getIP = async () => {
    const response = await fetch(`https://api.ipify.org/?format=json`);
    const data = await response.json();
    return data;
}

const elmButtonVote = document.getElementsByClassName('vote__button');
const elmSetCount = document.getElementsByClassName('vote__count');
const elmVoted = document.getElementsByClassName('err__voted');


const idUser = document.getElementsByClassName('vote__button')[0].getAttribute('data-id');
const dataUser = [];
let checkVote = [];
let ipLocal = '';
let countVote = 0;

const disabledBtnVote = () => {
    [...elmButtonVote].forEach(element => {
        element.classList.add('disabled');
        element.innerHTML = 'Đã bình chọn';
    });
}

const showNotification = (html, type) => {
    const elmVotedBtn = document.querySelectorAll('.vote__button.voted');
    if (elmVotedBtn.length >= 1 && type) {
        alert('Bạn đã bình chọn!!!');
    }
    else {
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', html);
    }
}

const errorForm = (text) => {
    document.getElementById('name').classList.add('err');
    document.getElementsByClassName('err__type')[0].innerHTML = text;
}

const closeForm = () => {
    document.getElementById('modal-pop').remove()
}

const addLocalStorage = () => {
    let checkVoteLocal = JSON.parse(localStorage.getItem('userToken'));
    let checkVote = [];
    if (checkVoteLocal) {
        checkVote = checkVoteLocal;
        checkVote.push(idUser);
    }
    else {
        checkVote.push(idUser);
    }
    localStorage.setItem('userToken', JSON.stringify(checkVote));
}


const formInput = () => {
    return `
        <div class="modal modal__vote" id="modal-pop" style="display: flex">
            <div class="modal-bg" onclick="closeForm()"></div>
            <div class="modal-box animate-pop">
                <div class="modal-header modal__voteHead">
                    <div class="modal-close" onclick="closeForm()">&times;</div>
                </div>
                <div class="modal-body">
                    <div class="modal__voteControl">
                        <label for="name">Họ và tên</label>
                        <input type="text" id="name" />
                        <span class="err__type"></span>
                        <input type="hidden" value="${ipLocal}" id="ipLocal" />
                        <input type="hidden" value="${idUser}" id="idUser" />
                    </div>
                    <button type="button" class="btn__submitVote" onclick={submitVote()}>Xác nhận bình chọn</button>
                </div>
            </div>
        </div>
    `
};

const formSuccess = () => {
    return `
        <div class="modal modal__vote" id="modal-success" style="display: flex">
            <div class="modal-bg"></div>
            <div class="modal-box animate-pop">
                <div class="modal-header modal__voteHead">
                </div>
                <div class="modal-body">
                    <img width="105" height="105" src="media/images/icon-success.png" alt=""/>
                    <p class="notify">Vote thành công</p>
                </div>
            </div>
        </div>
    `
};

const formWarning = () => {
    return `
        <div class="modal modal__vote" id="modal-warning" style="display: flex">
            <div class="modal-bg"></div>
            <div class="modal-box animate-pop">
                <div class="modal-header modal__voteHead"></div>
                <div class="modal-body">
                    <img width="105" height="105" src="media/images/icon-warning.png" alt=""/>
                    <p class="notify">Bạn đã thực hiện vote không thể vote tiếp</p>
                </div>
            </div>
        </div>
    `
};

const submitVote = async () => {
    const nameValue = document.getElementById('name').value;
    if (nameValue !== '') {
        try {
            const dataUserVote = await getUserVotes();
            const checkUser = dataUserVote.filter(item => (item.userid === idUser));
            const checkIp = checkUser.filter(item => (item.ip === ipLocal));
            if (checkIp.length >= 1) {
                disabledBtnVote();
                closeForm();
                const elmVotedBtn = document.querySelectorAll('.vote__button');
                [...elmVotedBtn].forEach(element => {
                    element.classList.add('voted');
                })
                addLocalStorage();
                showNotification(formWarning());
                setTimeout(() => {
                    document.getElementById('modal-warning').remove()
                }, 2000)
            }
            else {
                const dataVote = {
                    phone: ipLocal,
                    ip: ipLocal,
                    userid: idUser
                }
                await createUserVotes(dataVote);
                disabledBtnVote();
                addLocalStorage();
                showNotification(formSuccess());
                [...elmVoted].forEach(element => element.setAttribute('style', 'display: block'));
                setTimeout(() => {
                    document.getElementById('modal-pop').remove();
                    document.getElementById('modal-success').remove();
                }, 2000);
                setTimeout(() => {
                    [...elmVoted].forEach(element => element.setAttribute('style', 'display: none'));
                }, 6000);
                countVote += 1;
                [...elmSetCount].forEach(element => element.innerHTML = countVote)
                const votePlus = {
                    vote: countVote
                }
                updateVotes(idUser, votePlus);

                const elmVotedBtn = document.querySelectorAll('.vote__button');
                [...elmVotedBtn].forEach(element => {
                    element.classList.add('voted');
                })
            }
        } catch (e) {
            console.log(e)
        }
    } else {
        errorForm('Nhập họ và tên để bình chọn');
    }
}

window.onload = async () => {
    try {
        const data = await getVotes(idUser);
        dataUser.push(data);
    } catch (e) {
        const info = {
            userid: idUser,
            vote: 0
        }
        const data = await createVotes(info);
        dataUser.push(data.data);
    } finally {
        const { ip } = await getIP();
        ipLocal = String(ip);
        [...elmButtonVote].forEach(element => {
            element.classList.remove('disabled');
            element.classList.remove('handle');
        });
        [...elmVoted].forEach(element => element.setAttribute('style', 'display: none'));
        countVote = Number(dataUser[0].vote);
        [...elmSetCount].forEach(element => element.innerHTML = countVote);
        checkVote = JSON.parse(localStorage.getItem('userToken'));
        if (checkVote) {
            if (checkVote.length > 1) {
                checkVote.map(item => {
                    if (item === idUser) {
                        disabledBtnVote();
                        const elmVotedBtn = document.querySelectorAll('.vote__button');
                        [...elmVotedBtn].forEach(element => {
                            element.classList.add('voted');
                        })
                    }
                })
            } else {
                if (checkVote === idUser) {
                    disabledBtnVote();
                    const elmVotedBtn = document.querySelectorAll('.vote__button');
                    [...elmVotedBtn].forEach(element => {
                        element.classList.add('voted');
                    })
                }
            }
        }
    }
}

