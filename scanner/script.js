const wrapper = document.querySelector('.wrapper')
const detailsText = wrapper.querySelector('textarea')
const fileInput = wrapper.querySelector('form')
const infoText = wrapper.querySelector('p')
const qrImg = wrapper.querySelector('img')
const copy = wrapper.querySelector('.copy')
const close = wrapper.querySelector('.close')

fileInput.addEventListener('change', (e) => {
    targetFile(e)
})

close.addEventListener('click', () => wrapper.classList.remove('active'))

copy.addEventListener('click', () => {
    let text = detailsText.textContent
    navigator.clipboard.writeText(text)
    toastCopySucess(text)
})

function fetchRequest(formData, file) {
    infoText.innerText = 'Scanning QR Code...'
    fetch('http://api.qrserver.com/v1/read-qr-code/', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            result = result[0].symbol[0].data
            if(!result){
                infoText.innerText = 'Invalid file, try again with a QR code'
                return fetchError() 
            } 
            showResult(result, file)
        })
}

function showResult(result, file) {
    detailsText.innerText = result
    infoText.innerText = 'Upload QR Code to Scan'
    wrapper.classList.add('active')
    qrImg.src = URL.createObjectURL(file)
}

function targetFile(e) {
    let file = e.target.files[0]
    if(!file) return
    let formData = new FormData()
    formData.append('file', file)
    fetchRequest(formData, file)
}

function toastCopySucess(text) {
    if (text) {
        Toastify({
            text: "Successfully copied text!",
            duration: 2000,
            className: "sucess",
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, green,green)",
            }
        }).showToast();
    }
}

function fetchError(){
    Toastify({
        text: "Invalid file",
        duration: 2000,
        className: "error",
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, red,red)",
        },
        onClick: function(){
            location.reload();
        } 
    }).showToast();
}