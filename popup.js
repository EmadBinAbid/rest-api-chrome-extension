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
    document.getElementById('divLoader').hidden = false;
    document.getElementById('divMessage').innerHTML = '';

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

    // const url = 'https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/login';
    const url = 'https://us-central1-webleash-5c72c.cloudfunctions.net/api/login';

    fetch(url, options)
        .then(function (response) {
            response.json().then(function (json) {
                document.getElementById('divLoader').hidden = true;
                if (json.token) {
                    localStorage.setItem('webleash-token', json.token)
                    // localStorage.setItem('webleash-uuid', json.uuid)
                    showAddWebsitePage();
                }
                else {
                    document.getElementById('divMessage').innerHTML = json.message;
                    document.getElementById('divMessage').style.color = '#ff0000';
                }
            })
        })

}

const handleRegisterButtonEvent = () => {
    document.getElementById('divLoader').hidden = false;
    document.getElementById('divMessage').innerHTML = '';

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

    // const url = 'https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/register';
    const url = 'https://us-central1-webleash-5c72c.cloudfunctions.net/api/register'

    fetch(url, options)
        .then(function (response) {
            document.getElementById('divLoader').hidden = true;
            response.json().then(function (json) {
                if (json.message) {
                    document.getElementById('divMessage').innerHTML = json.message;
                    document.getElementById('divMessage').style.color = '#00ff00';
                }
                else {
                    document.getElementById('divMessage').innerHTML = json.message;
                    document.getElementById('divMessage').style.color = '#ff0000';
                }
            })
        })
}

const handleAddWebsiteButtonEvent = () => {
    document.getElementById('divLoader').hidden = false;
    document.getElementById('divMessage').innerHTML = '';

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        const eventType = document.getElementById('sltType');

        const txtTypeValue = eventType.options[eventType.selectedIndex].value;
        const txtWebsiteValue = tabs[0].url;

        const reqBody = {
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

        // const url = 'https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/addBookmark';
        const url = 'https://us-central1-webleash-5c72c.cloudfunctions.net/api/addBookmark';

        fetch(url, options)
            .then(function (response) {
                response.json().then(function (json) {
                    document.getElementById('divLoader').hidden = true;
                    if (json.message) {
                        document.getElementById('divMessage').innerHTML = json.message;
                        document.getElementById('divMessage').style.color = '#00ff00';
                    }
                    else {
                        document.getElementById('divMessage').innerHTML = json.message;
                        document.getElementById('divMessage').style.color = '#ff0000';
                    }
                })
            })
    });
}

const showLoginPage = () => {
    document.getElementById('divLoginForm').hidden = false;
    document.getElementById('divRegisterForm').hidden = true;
    document.getElementById('divAddWebsiteForm').hidden = true;

    document.getElementById('divMessage').innerHTML = '';
}

const showRegisterPage = () => {
    console.log('in tegister');
    document.getElementById('divLoginForm').hidden = true;
    document.getElementById('divRegisterForm').hidden = false;
    document.getElementById('divAddWebsiteForm').hidden = true;

    document.getElementById('divMessage').innerHTML = '';
}

const showAddWebsitePage = () => {
    document.getElementById('divLoginForm').hidden = true;
    document.getElementById('divRegisterForm').hidden = true;
    document.getElementById('divAddWebsiteForm').hidden = false;

    document.getElementById('divMessage').innerHTML = '';
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
    // localStorage.setItem('webleash-uuid', '');

    document.getElementById('divAddWebsiteForm').hidden = true;
    init();
}

document.getElementById("btnLogin").onclick = handleLoginButtonEvent;
document.getElementById("btnSignOut").onclick = handleSignOutButtonEvent;
document.getElementById("btnRegister").onclick = handleRegisterButtonEvent;
document.getElementById("btnAddWebsite").onclick = handleAddWebsiteButtonEvent;

document.getElementById("rdoLogin").onclick = showLoginPage;
document.getElementById("rdoRegister").onclick = showRegisterPage;

const init = () => {
    if (localStorage.getItem('webleash-token') && localStorage.getItem('webleash-token') !== '') {
        console.log(localStorage.getItem('webleash-token'));
        showAddWebsitePage();
    }
    else {
        showLoginPage();
    }
}

init();