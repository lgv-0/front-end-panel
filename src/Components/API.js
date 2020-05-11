import axios from "axios";
import queryString from "querystring";

let APIUrl = process.env.REACT_APP_API_URL || "https://66.70.190.162";

export function APIGet(data, callbackSuccess, callbackError)
{
    axios.get(`${APIUrl}/panel/auth`, queryString.stringify(data),
        {
            "headers":{"Content-Type":"application/json", "Accept":"*"}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetKeys(data, callbackSuccess, callbackError)
{
    axios.get(`${APIUrl}/panel/keys`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetCheats(data, callbackSuccess, callbackError)
{
    axios.get(`${APIUrl}/panel/cheats`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetUsers(data, callbackSuccess, callbackError)
{
    axios.get(`${APIUrl}/panel/users`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIPostKey(data, callbackSuccess, callbackError)
{
    axios.post(`${APIUrl}/panel/keys`, {"key":data.key, "cheats":data.cheats},
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIDeleteKey(data, callbackSuccess, callbackError)
{
    axios.delete(`${APIUrl}/panel/keys/${data.key}`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetLogs(data, callbackSuccess, callbackError)
{
    axios.get(`${APIUrl}/panel/logs`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIPutStatus(data, callbackSuccess, callbackError)
{
    axios.put(`${APIUrl}/panel/users/${data.id}/SETSTATUS?status=${data.status}`,
        {
            //data.status (((should))) be here honestly, but there's another issue here..
        },
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIPutIP(data, callbackSuccess, callbackError)
{
    axios.put(`${APIUrl}/panel/users/${data.id}/RIP`,
        {

        },
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response)=>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIPutHWID(data, callbackSuccess, callbackError)
{
    axios.put(`${APIUrl}/panel/users/${data.id}/RHWID`,
        {

        },
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response)=>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIAuth(data, callbackSuccess, callbackError)
{
    axios.post(`${APIUrl}/panel/auth`, data,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*"}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}