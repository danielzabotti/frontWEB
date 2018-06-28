import React from 'react';

class HomeService {

  loging(email, password){
    return fetch('https://ine5645-bemestar-login.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then(response => response.json());
  };
}

export default HomeService = new HomeService();
