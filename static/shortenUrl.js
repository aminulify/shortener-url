let myInput = document.getElementById('myInput');
let inputBtn = document.getElementById('input-btn');
let copyLinkBtn = document.getElementById('copy-link-btn');
let qrCodeBtn = document.getElementById('qr-code-btn');
let getShortener = document.getElementById('show-link');
let qrCodeShow = document.getElementById('QR-code-show');

inputBtn.addEventListener('click', function() {
    let validUrl = myInput.value;
    const loadData = () => {
        const url = `https://api.shrtco.de/v2/shorten?url=${validUrl}`;

        console.log(url);
        if (validUrl != '') {
            fetch(url)
                .then(res => res.json())
                .then(data => displayShortUrl(data.result))
                .catch((error) => {
                    console.log(error);
                    alert("Something Wrong! Please Input Valid URL. Thank You.")
                })
        } else {
            alert("Something Wrong! Please Input Valid URL. Thank You.")
        }

    }

    const displayShortUrl = (getResult) => {
        console.log(getResult.short_link3);
        getShortener.innerHTML = `
        <a target="_blank" id="show-link-js"></a>
        `;
        const getShowLinkJs = document.getElementById('show-link-js');
        getShowLinkJs.innerText = getResult.short_link3;
        getShowLinkJs.href = `https://${getResult.short_link3}`;

        copyLinkBtn.addEventListener('click', function() {
            const copyShowLink = getShowLinkJs.innerText;
            navigator.clipboard.writeText(copyShowLink);
            copyLinkBtn.innerText = "Copied";
        })

    }

    qrCodeBtn.addEventListener('click', function() {
        const loadQrCodeData = () => {
            let validQrUrl = myInput.value;
            const qrUrl = ` https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${validQrUrl}`
            console.log(qrUrl);
            qrCodeShow.innerHTML = `
            <img src=${qrUrl} alt="QR CODE" class="pt-5">
            `
        }
        loadQrCodeData();

    })
    loadData();


})