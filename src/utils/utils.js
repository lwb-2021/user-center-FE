import axios from "axios";

export function setCookie(cname,value,days) {
    const d = new Date();
    d.setTime(d.getTime()+(days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + value + "; " + expires;
}
export function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
}

export function hasCookie(cname){
    return getCookie(cname) !== ""
}

export function removeCookie(cname){
    setCookie(cname, "", -1)
}

export async function getUserInfo() {
    if(hasCookie("JWT_TOKEN")){
        const token = getCookie("JWT_TOKEN")
        const response = await axios.post("/api/user/verify", {}, {
            headers:{
                "Authorization": token,
                "Access-Control-Expose-Headers": "Authorization"
            }
        })
        return response ? response.data : null
    }
    return null;

}

export function getUserHeaders() {
    const JWT_TOKEN = getCookie("JWT_TOKEN")
    if(JWT_TOKEN){
        return {
            "Authorization": JWT_TOKEN,
            "Access-Control-Expose-Headers": "Authorization"
        }
    }else {
        return {}
    }


}


export async function isUser(userId){
    userId = parseInt(userId)
    const result = await axios.post("/api/user/verify", {}, {
        headers: getUserHeaders()
    })
    return result.data.data.id === userId

}


export async function isAdmin(){
    let isAdmin
    await axios.post("/api/user/verify", {}, {
        headers: getUserHeaders()
    }).then(
        async (result) => {
            isAdmin = result.data.data.role >=2
        })
    return isAdmin

}
export async function isAdminByID(id){
    id = parseInt(id)
    let isAdmin
    await axios.post("/api/user/get", {
        "id": id
    }).then(
        async (result) => {
            isAdmin = result.data.data.role >=2
        })
    return isAdmin

}