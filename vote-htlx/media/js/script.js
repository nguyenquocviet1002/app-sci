const baseURL = 'https://app.scigroupvn.com/vote/public/api';
const ipLocal = '222.252.21.4';

const idUser = document.getElementsByClassName('vote__button')[0].getAttribute('data-id');
const dataUser = [];
let countVote = 0;

const submitVote = async () => {
    const phoneElm = document.getElementById('phone');
    const errType = document.getElementsByClassName('err__type');
    const phoneN = document.getElementById('phone').value;
    const ipLocal = document.getElementById('ipLocal').value;
    const idUserKN = document.getElementById('idUser').value;

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
            const checkUser = dataNew.filter(item => (item.userid === dataUser[0].data.userid));
            const checkPhone = checkUser.filter(item => (item.phone === phoneN));
            if (checkPhone.length > 0) {
                phoneElm.classList.add('err');
                errType[0].innerHTML = 'Số điện thoại đã thực hiện lượt vote'
            }
            else {
                phoneElm.classList.remove('err');
                const dataVote = {
                    phone: phoneN,
                    ip: ipLocal,
                    userid: idUserKN
                }
                await fetch(`${baseURL}/create-uservotes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataVote)
                })
                    .then(res => res.json())
                    .then(() => (document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', formSuccess())))
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
const closeSuccess = () => {
    document.getElementById('modal-pop').remove()
    document.getElementById('modal-success').remove()
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
                        <input type="hidden" value="${dataUser[0].data.userid}" id="idUser" />
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
            <div class="modal-bg" onclick="closeSuccess()"></div>
            <div class="modal-box animate-pop">
                <div class="modal-header modal__voteHead">
                    <div class="modal-close" onclick="closeSuccess()">&times;</div>
                </div>
                <div class="modal-body">
                    <img width="320" height="320" src="media/images/icon-success.png" alt=""/>
                    <p class="notify">Vote thành công</p>
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
    countVote = Number(dataUser[0].data.vote);
    document.getElementsByClassName('vote__count')[0].innerHTML = countVote;
}

