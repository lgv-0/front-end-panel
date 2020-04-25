import axios from "axios";
import queryString from "querystring";

export function APICall(data, callbackSuccess, callbackError)
{
    axios.post("https://loganv.codes/api/ree_main_api.php", queryString.stringify(data),
        { 
            "headers":{"Content-Type":"application/json", "Accept":"*"}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGet(data, callbackSuccess, callbackError)
{
    axios.get("https://66.70.190.162/panel/auth", queryString.stringify(data),
        {
            "headers":{"Content-Type":"application/json", "Accept":"*"}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetKeys(data, callbackSuccess, callbackError)
{
    axios.get("https://66.70.190.162/panel/keys",
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetCheats(data, callbackSuccess, callbackError)
{
    axios.get("https://66.70.190.162/panel/cheats",
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetUsers(data, callbackSuccess, callbackError)
{
    axios.get("https://66.70.190.162/panel/users",
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIPostKey(data, callbackSuccess, callbackError)
{
    axios.post("https://66.70.190.162/panel/keys", {"key":data.key, "cheats":data.cheats},
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIDeleteKey(data, callbackSuccess, callbackError)
{
    axios.delete(`https://66.70.190.162/panel/keys/${data.key}`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIGetLogs(data, callbackSuccess, callbackError)
{
    axios.get(`https://66.70.190.162/panel/logs`,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*", "Authorization":data.atk}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}

export function APIAuth(data, callbackSuccess, callbackError)
{
    axios.post("https://66.70.190.162/panel/auth", data,
        {
            "headers":{"Content-Type":"application/json", "Accept":"*"}
        }).then((response) =>
        {
            callbackSuccess(response.data);
        }).catch(callbackError);
}