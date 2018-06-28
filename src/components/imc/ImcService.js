class ImcService {

  insertImcData(peso, altura, userid){
    return fetch('https://historico-imc.herokuapp.com/api/v1/postData/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        peso: peso,
        altura: altura,
        userID: userid
      })
    }).then(response => response.json());
  };


  getData(userid){
    return fetch(`https://historico-imc.herokuapp.com/api/v1/getData?userid=${userid}`,{
      method : 'GET',
      headers: {
        'Content-Type': 'appplication/json'
      }
    }).then(response => response.json());
  };
}

export default ImcService = new ImcService();
