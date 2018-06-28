class MetasService {
  insertGoals(userid, metadescription, metatitle) {
    console.log(userid, metadescription, metatitle);
    return fetch('https://metacandinho.herokuapp.com/api/insertGoals', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: userid,
        metadescription : metadescription,
        metatitle : metatitle
      })
    }).then(response => response.json());
  };

  completeGoal(metaid) {
    return fetch('https://metacandinho.herokuapp.com/api/completeGoal', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metaid: metaid
      })
    }).then(response => response.json());
  };

  getUnfinishedGoals(userid) {
    return fetch(`https://metacandinho.herokuapp.com/api/getUnfinishedGoals?userid=${userid}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  };

  getFinishedGoals(userid) {
    return fetch(`https://metacandinho.herokuapp.com/api/getFinishedGoals?userid=${userid}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  };

  deleteGoal(metaid) {
    return fetch('https://metacandinho.herokuapp.com/api/deleteGoal', {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metaid: metaid
      })
    }).then(response => response.json());
  };
};

export default MetasService = new MetasService();