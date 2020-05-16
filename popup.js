function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json();
}

const sendApiRequest = async (url, options) => {
    fetch(url, options)
        .then(function (response) {
            response.text().then(function (text) {
                console.log(text);
                handleApiResponse(text);
            })
        })
}

const handleLoginRequest = () => {
    const txtEmailValue = document.getElementById('txtEmailLogin').value;
    const txtPasswordValue = document.getElementById('txtPasswordLogin').value;

    const reqBody = {
        email: txtEmailValue,
        password: txtPasswordValue
    };

    const options = {
        method: 'POST',
        body: reqBody,
        headers: {
            // 'Origin': '*',
            // 'Host': '*',
            // 'Accept-Language': 'en-US',
            // 'Connection': 'keep-alive',
            // 'User-Agent': '*',
            'Allow-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            // 'Content-Type': 'application/json',
            // 'Accept': '*/*',
        },
        mode: 'cors'
    };

    console.log(reqBody);
    sendApiRequest('https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/login', options);
}

const handleRegisterRequest = () => {
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
        body: reqBody,
        headers: {
            // 'Origin': '*',
            // 'Host': '*',
            // 'Accept-Language': 'en-US',
            // 'Connection': 'keep-alive',
            // 'User-Agent': '*',
            'Allow-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            // 'Content-Type': 'application/json',
            // 'Accept': '*/*',
        },
        mode: 'cors'
    };

    console.log(reqBody);
    sendApiRequest('https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/register', options);
}

const handleAddWebsiteRequest = () => {
    console.log('Here');
    const txtUuidValue = document.getElementById('txtUuid').value;
    const txtTypeValue = document.getElementById('txtType').value;
    const txtWebsiteValue = document.getElementById('txtWebsite').value;

    const reqBody = {
        uuid: txtUuidValue,
        type: txtTypeValue,
        website: txtWebsiteValue
    };

    const options = {
        method: 'POST',
        body: reqBody,
        headers: {
            // 'Origin': '*',
            // 'Host': '*',
            // 'Accept-Language': 'en-US',
            // 'Connection': 'keep-alive',
            // 'User-Agent': '*',
            'Allow-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            // 'Content-Type': 'application/json',
            // 'Accept': '*/*',
            'authtoken': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1YzlhZWJlMjM0ZGE2MDE2YmQ3Yjk0OTE2OGI4Y2Q1YjRlYzllZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZWJhLXJlc3RhdXJhbnQtZmluZGVyIiwiYXVkIjoiZWJhLXJlc3RhdXJhbnQtZmluZGVyIiwiYXV0aF90aW1lIjoxNTg5NTc5OTY4LCJ1c2VyX2lkIjoiTWwxZU1kZHpzcmJVa0FxWm5EZzhKaVE1cHZVMiIsInN1YiI6Ik1sMWVNZGR6c3JiVWtBcVpuRGc4SmlRNXB2VTIiLCJpYXQiOjE1ODk1Nzk5NjgsImV4cCI6MTU4OTU4MzU2OCwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZXhhbXBsZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.gNI3p6_KSH5ZzXu-WPDbUMbEQ41kW5vzcNSO9OGCjUbsd3c9lf8VkKG41s-DernNZBspyQdsBgXqOYSXBXWFUuzNQ4HkqG4IVLTB_2LT28Ey-rQaoIkyWTmzc5d_tQsvNazfAmPMGeskPbzYilR-awv1YvAKZ8MKmjerxqh0nn4I3qBw_IT1-iCogQgDl7PL4Geag_jG7OOxI8CGL22Fzrw_Drh7PUzQCc6VBadTAcoQGZDG0q6Xvj_wFhS6dwNDk-kFB0EVX3aZiL9inAXaA2hx035lWJJodKTVRMZkCl4hoCbSIkDLaAxF-e5aHgILIL2TmpnqVRJ-75jJ3L8QGg'
        },
        mode: 'cors'
    };

    console.log(reqBody);
    sendApiRequest('https://us-central1-eba-restaurant-finder.cloudfunctions.net/api/addBookmark', options);
}

const showLoginForm = () => {
    document.getElementById('divLoginForm').style.display = 'block';
    document.getElementById('divRegisterForm').style.display = 'none';
    document.getElementById('divAddWebsiteForm').style.display = 'none';
}

const showRegisterForm = () => {
    document.getElementById('divLoginForm').style.display = 'none';
    document.getElementById('divRegisterForm').style.display = 'block';
    document.getElementById('divAddWebsiteForm').style.display = 'none';
}

const showAddWebsiteForm = () => {
    document.getElementById('divLoginForm').style.display = 'none';
    document.getElementById('divRegisterForm').style.display = 'none';
    document.getElementById('divAddWebsiteForm').style.display = 'block';
}

const handleApiResponse = (responseResult) => {
    document.getElementById('divResult').innerHTML = responseResult;
}

document.getElementById("btnLoginRequest").onclick = handleLoginRequest;
document.getElementById("btnRegisterRequest").onclick = handleRegisterRequest;
document.getElementById("btnAddWebsiteRequest").onclick = handleAddWebsiteRequest;