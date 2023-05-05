const wrapper = document.querySelector('.wrapper')
const generateButton = wrapper.querySelector('.form button')
const qrInput = wrapper.querySelector('.form input')
const qrImg = wrapper.querySelector('.qrCode img')

generateButton.addEventListener('click', () => {
	let qrValue = qrInput.value
	toastError(qrValue)
	loadButton()
	setTimeout(() => {
		generatorQrCode(qrValue)
	}, 500);
})

function toastError(qrValue) {
	if (!qrValue) {
		Toastify({
			text: "Fill the input with a text or url",
			duration: 2000,
			className: "error",
			gravity: "bottom",
			position: "center",
			stopOnFocus: true,
			style: {
				background: "linear-gradient(to right, red,red)",
			}
		}).showToast();
	}
}

function generatorQrCode(qrValue) {
	qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`
	wrapper.classList.add('active')
}

function loadButton() {
	generateButton.innerText = "Generating QR Code..."
	qrImg.addEventListener('load', () => {
		wrapper.classList.add('active')
		generateButton.innerText = "Generate New QR Code"
	})
}

qrInput.addEventListener('keyup', () => {
	wrapper.classList.remove('active')
})



