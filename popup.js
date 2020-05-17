const sendApiRequest = async (url, options) => {
    fetch(url, options)
        .then(function (response) {
            response.json().then(function (json) {
                console.log(json);
                responseJson = json;
            })
        })
}

const handleLoginButtonEvent = () => {
    const txtEmailValue = document.getElementById('txtEmailLogin').value;
    const txtPasswordValue = document.getElementById('txtPasswordLogin').value;

    const reqBody = {
        email: txtEmailValue,
        password: txtPasswordValue
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Allow-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    };

    const url = 'https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/login';

    fetch(url, options)
        .then(function (response) {
            response.json().then(function (json) {
                if (json.token) {
                    localStorage.setItem('webleash-token', json.token)
                    localStorage.setItem('webleash-uuid', json.uuid)
                    showAddWebsitePage();
                }
            })
        })

}

const handleRegisterButtonEvent = () => {
    const txtFirstNameValue = document.getElementById('txtFirstName').value;
    const txtLastNameValue = document.getElementById('txtLastName').value;
    const txtEmailValue = document.getElementById('txtEmailRegister').value;
    const txtPasswordValue = document.getElementById('txtPasswordRegister').value;

    const reqBody = {
        firstName: txtFirstNameValue,
        lastName: txtLastNameValue,
        email: txtEmailValue,
        password: txtPasswordValue
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Allow-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    };

    const url = 'https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/register';

    fetch(url, options)
        .then(function (response) {
            response.json().then(function (json) {
                console.log(json);
            })
        })
}

const handleAddWebsiteButtonEvent = () => {
    const eventType = document.getElementById('sltType');

    const txtTypeValue = eventType.options[eventType.selectedIndex].value;
    const txtWebsiteValue = document.getElementById('txtWebsite').value;

    console.log(txtTypeValue);

    const reqBody = {
        uuid: localStorage.getItem('webleash-uuid'),
        type: txtTypeValue,
        website: txtWebsiteValue
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Allow-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem('webleash-token')
        },
        mode: 'cors'
    };

    const url = 'https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/addBookmark';

    fetch(url, options)
        .then(function (response) {
            response.json().then(function (json) {
                console.log(json);
            })
        })
}

const showLoginPage = () => {
    document.getElementById('divLoginForm').style.display = 'block';
    document.getElementById('divRegisterForm').style.display = 'none';
    document.getElementById('divAddWebsiteForm').style.display = 'none';

    document.getElementById('spnRadioLogin').style.display = 'block';
    document.getElementById('spnRadioRegister').style.display = 'block';
}

const showRegisterPage = () => {
    document.getElementById('divLoginForm').style.display = 'none';
    document.getElementById('divRegisterForm').style.display = 'block';
    document.getElementById('divAddWebsiteForm').style.display = 'none';

    document.getElementById('spnRadioLogin').style.display = 'block';
    document.getElementById('spnRadioRegister').style.display = 'block';
}

const showAddWebsitePage = () => {
    document.getElementById('divLoginForm').style.display = 'none';
    document.getElementById('divRegisterForm').style.display = 'none';
    document.getElementById('divAddWebsiteForm').style.display = 'block';

    document.getElementById('spnRadioLogin').style.display = 'none';
    document.getElementById('spnRadioRegister').style.display = 'none';
}

const handleApiResponse = (responseResult) => {
    console.log(responseResult);
}

const handleLoginApiResponse = (responseJson) => {
}

const handleRegisterApiResponse = (responseJson) => {
    // localStorage.setItem('webleash-token', responseJson.token)
}

const handleSignOutButtonEvent = () => {
    localStorage.setItem('webleash-token', '');
    localStorage.setItem('webleash-uuid', '');
    
    document.getElementById('divAddWebsiteForm').style.display = 'none';
    init();
}

document.getElementById("btnLogin").onclick = handleLoginButtonEvent;
document.getElementById("btnSignOut").onclick = handleSignOutButtonEvent;
document.getElementById("btnRegister").onclick = handleRegisterButtonEvent;
document.getElementById("btnAddWebsite").onclick = handleAddWebsiteButtonEvent;

document.getElementById("rdoLogin").onchange = showLoginPage;
document.getElementById("rdoRegister").onchange = showRegisterPage;

const init = () => {
    if (localStorage.getItem('webleash-token') && localStorage.getItem('webleash-token') !== '') {
        console.log(localStorage.getItem('webleash-token'));
        showAddWebsitePage();
    }
    else {
        document.getElementById("rdoLogin").checked = true;
        showLoginPage();
    }
}

init();