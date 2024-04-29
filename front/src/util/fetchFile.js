const url = process.env.REACT_APP_Server_IP;
/**
 *  이미지 업로드
 */
export const fetchUploadImage = async (blob) => {
    let formData = new FormData();
    formData.append('image-file', blob);

    return fetch(url + `/image`, {
        method: 'POST',
        headers: {
            authorization: sessionStorage.getItem('access_token'),
        },
        body: formData,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            } else {
                console.log(res);
                return res.json();
            }
        })
        .then((data) => {
            console.log(2);
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error.message);
        });
};
