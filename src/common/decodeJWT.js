// import jwt from 'jsonwebtoken';

// export const getUserInfo = (token) => {
//     const decodedToken = jwt.verify(token, 'KERGGYEUGWYUWEGRYU261287345762546751488136QTWGR');
//     const userRole = decodedToken.roles[0];
//     const userId = decodedToken.id;

//     return {userId, userRole};
// };

export const getUserInfo = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const data = JSON.parse(jsonPayload);

    return {userId: data.id, userRole: data.roles[0]};
}
