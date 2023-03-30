const baseURL = 'https://app.scigroupvn.com/vote/public/api';
const ipLocal = '222.252.21.7';

const idUser = document.getElementsByClassName('vote__button')[0].getAttribute('data-id');
const dataUser = [];
let countVote = 0;

const submitVote = async () => {
    const phoneElm = document.getElementById('phone');
    const errType = document.getElementsByClassName('err__type');
    const phoneN = document.getElementById('phone').value;

    const phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phoneN !== '') {
        if (phone_regex.test(phoneN) == false) {
            phoneElm.classList.add('err');
            errType[0].innerHTML = 'Số điện thoại sai định dạng'
        } else {
            const dataVotes = async () => {
                return await fetch(`${baseURL}/get-uservotes`)
                    .then(res => res.json())
                    .then(data => (data))
            }
            const dataNew = await dataVotes();
            const checkUser = dataNew.filter(item => (item.userid === idUser));
            const checkPhone = checkUser.filter(item => (item.phone === phoneN));
            const checkIp = checkUser.filter(item => (item.ip === ipLocal));
            if (checkPhone.length > 0 || checkIp.length > 0) {
                document.getElementsByClassName('vote__button')[0].classList.add('disabled');
                document.getElementsByClassName('vote__button')[0].innerHTML = 'Đã bình chọn';
                localStorage.setItem('tokenUser', idUser);
                closeForm();
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', formWarning());
                setTimeout(() => {
                    document.getElementById('modal-warning').remove()
                }, 3000)
            }
            else {
                phoneElm.classList.remove('err');
                const dataVote = {
                    phone: phoneN,
                    ip: ipLocal,
                    userid: idUser
                }
                await fetch(`${baseURL}/create-uservotes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataVote)
                })
                    .then(res => res.json())
                    .then(() => {
                        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', formSuccess());
                        document.getElementsByClassName('vote__button')[0].classList.add('disabled');
                        document.getElementsByClassName('vote__button')[0].innerHTML = 'Đã bình chọn';
                        localStorage.setItem('tokenUser', idUser)
                        setTimeout(() => {
                            document.getElementById('modal-pop').remove()
                            document.getElementById('modal-success').remove()
                        }, 3000)
                })
                countVote += 1;
                document.getElementsByClassName('vote__count')[0].innerHTML = countVote;
                const bodyVote = {
                    vote: countVote
                }
                await fetch(`${baseURL}/update-votes/${idUser}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyVote)
                })
            }
        }
    } else {
        phoneElm.classList.add('err');
        errType[0].innerHTML = 'Nhập số điện thoại để bình chọn'
    }
}

const closeForm = () => {
    document.getElementById('modal-pop').remove()
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
                        <label for="phone">Số điện thoại</label>
                        <input type="text" id="phone" />
                        <span class="err__type"></span>
                        <input type="hidden" value="${ipLocal}" id="ipLocal" />
                        <input type="hidden" value="${idUser}" id="idUser" />
                    </div>
                    <button type="button" class="btn__submitVote" onclick={submitVote()}>Bình chọn</button>
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


document.getElementsByClassName('vote__button')[0].addEventListener('click', () => {
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', formInput());
    document.getElementById('phone').addEventListener('focus', () => {
        document.getElementById('phone').classList.remove('err');
    })
})


window.onload = async () => {
    await fetch(`${baseURL}/get-votes/${idUser}`)
        .then(res => res.json())
        .then(data => (dataUser.push(data)))
    document.getElementsByClassName('vote__button')[0].classList.remove('disabled');
    countVote = Number(dataUser[0].vote);
    document.getElementsByClassName('vote__count')[0].innerHTML = countVote;
    const checkVote = localStorage.getItem('tokenUser');
    if(checkVote === dataUser[0].userid){
        document.getElementsByClassName('vote__button')[0].classList.add('disabled');
        document.getElementsByClassName('vote__button')[0].innerHTML = 'Đã bình chọn';
    }
}

