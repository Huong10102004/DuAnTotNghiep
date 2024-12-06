const token = localStorage.getItem('token'); // Lấy token từ localStorage

import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
import axios from 'axios';


function ajaxRequest(url, data = null, method = 'GET') {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Gửi token trong header
            },
            method: method,
            data: data ? data : null,
            contentType: 'application/json', // Thiết lập kiểu nội dung là JSON
            success: function(response) {
                // console.log(response);
                resolve(response);
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}

async function seedToServe(url, params = {}, method = "GET") {

    let response = null;

    try {
        response = await ajaxRequest(url, params, method);
        // return JSON.parse(response);
        console.log("seedToServe", response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }

    return null;

}


function axiosRequest(url, data = null, method = 'GET') {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Gửi token trong header
            },
            data: data ? data : null, // Nếu có data, gửi đi
        })
        .then(response => {
            resolve(response.data); // Trả về dữ liệu từ API
        })
        .catch(error => {
            reject(error); // Xử lý lỗi nếu có
        });
    });
}

async function seedToServeAxios(url, params = {}, method = "GET") {

    let response = null;

    try {
        response = await axiosRequest(url, params, method);
        // return JSON.parse(response);
        console.log("seedToServe", response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }

    return null;

}

export {
    seedToServe,
    ajaxRequest,
    axiosRequest,
    seedToServeAxios
};