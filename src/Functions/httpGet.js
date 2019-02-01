 export default function httpGet(body=null,url='http://127.0.0.1:4001/') {

    return new Promise(function(resolve, reject) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url+body, true);

        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function(e) {

            reject(new Error(`Network Error`+e));
        };

        xhr.send();
    });
}

